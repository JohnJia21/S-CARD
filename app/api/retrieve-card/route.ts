import { NextRequest, NextResponse } from 'next/server'
import { notion, getRelevantCardsFromNotion } from '@/lib/notion'
import { getChatCompletion } from '@/lib/openai';

const databaseId = process.env.NOTION_DATABASE_ID!

export async function POST(req: NextRequest) {
  try {

    const body = await req.json();
    // 兼容两种入参：query 或 keyword

    const { userInput } = body
    
    console.log('Searching for cards with userInput:', userInput)

    // 步骤1：用GPT解析用户意图 → 得到结构卡检索关键词或主题 
    const systemPrompt = '你是一个结构卡检索助手。请根据用户输入，提炼出最合适的结构卡关键词或主题，用于在结构卡数据库中进行匹配检索。只输出关键词或主题，不要额外说明。'; 
    const keyword = userInput;
    //const keyword = await getChatCompletion(systemPrompt,userInput)

    
    console.log('Searching for cards with keyword:', keyword)

    // 使用已经修复的函数进行查询
    let results: any[] = []
    
    if (keyword) {
      results = await getRelevantCardsFromNotion(keyword)
    } else {
      // 如果没有关键词，获取所有卡片
      results = await getRelevantCardsFromNotion('')
    }
    
    console.log('Found results count:', results.length)
    console.log('Found results count:', results[0].properties.名称.title[0].text.content)
    // 转换为前端需要的格式
    const cards = results.map((page: any) => {
      const props = page.properties
      console.log('名称:', props.名称?.title?.[0]?.text?.content ?? '')
      console.log('类型:', props.类型?.select?.name ?? '')
      console.log('原文:', props.原文?.rich_text?.[0]?.text?.content ?? '')
      return {
        id: page.id,
        名称: props.名称?.title?.[0]?.text?.content ?? '',
        类型: props.类型?.select?.name ?? '',
        原文: props.原文?.rich_text?.[0]?.text?.content ?? '',
      }
    })

    console.log('Returning cards:', cards.length)
    return NextResponse.json({ cards })
    
  } catch (error) {
    console.error('Database query error:', error)
    return NextResponse.json({ error: 'Failed to query database', details: error.message }, { status: 500 })
  }
}
