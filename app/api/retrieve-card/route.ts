import { NextRequest, NextResponse } from 'next/server'
import { notion, getRelevantCardsFromNotion } from '@/lib/notion'
import { getChatCompletion } from '@/lib/openai';

const databaseId = process.env.NOTION_DATABASE_ID!

  // 工具函数：拼接正文纯文本
async function getPageContent(pageId: string) {
    const blocks = await notion.blocks.children.list({ block_id: pageId });
    return blocks.results
      .map((block: any) =>
        block[block.type]?.rich_text?.map((t: any) => t.plain_text).join("") || ""
      )
      .join("\n");
  }

export async function POST(req: NextRequest) {
  try {
    
    const body = await req.json();
    const query = body.query ?? "";
    const filters = body.filters ?? {};

    // 步骤1：用GPT解析用户意图 → 得到结构卡检索关键词或主题 
    const systemPrompt = '你是一个结构卡检索助手。请根据用户输入，提炼出最合适的结构卡关键词或主题，用于在结构卡数据库中进行匹配检索。只输出关键词或主题，不要额外说明。'; 
    //const keyword = userInput;
    //const keyword = await getChatCompletion(systemPrompt,userInput)

    //console.log('Searching for cards with keyword:', keyword)

    // 使用已经修复的函数进行查询

    //let results: any[] = []
    
    // if (keyword) {
    //   results = await getRelevantCardsFromNotion(keyword)
    // } else {
    //   // 如果没有关键词，获取所有卡片
    //   results = await getRelevantCardsFromNotion('')

    const results = await getRelevantCardsFromNotion(query, filters);

    // }
    
    // console.log('Found results count:', results.length)
    // console.log('Found results count:', results[0].properties.标题.title[0].text.content)
    // 转换为前端需要的格式
    const cards = await Promise.all(
      results.map(async (page: any) => {
      const props = page.properties

      // ✅ 拉正文
      const content = await getPageContent(page.id);


      // console.log('标题:', props.标题?.title?.[0]?.text?.content ?? '')
      // console.log('卡片类型:', props.卡片类型?.select?.name ?? '')
      // console.log('领域维度:', props["领域维度"]?.multi_select ?? '')
      // console.log('一句话主张:', props.一句话主张?.rich_text?.[0]?.text?.content ?? '')
      return {
        id: page.id,
        标题: props.标题?.title?.[0]?.text?.content ?? '',
        卡片类型: props.卡片类型?.select?.name ?? '',
        领域维度: props["领域维度"]?.multi_select?.map((opt: any) => opt.name) ?? [],
        主题标签: props["主题/产品标签"]?.multi_select?.map((t: any) => t.name) ?? [],
        一句话主张: props.一句话主张?.rich_text?.[0]?.text?.content ?? '',
        正文: content, // ✅ 新增字段
      };
    })
  );

    return NextResponse.json({ intent: query, cards });
    
  } catch (error) {
    console.error('Database query error:', error)
    return NextResponse.json({ error: 'Failed to query database', details: error.message }, { status: 500 })
  }

}
