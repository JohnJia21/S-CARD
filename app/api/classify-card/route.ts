import { NextRequest, NextResponse } from 'next/server'
import { notion, getRelevantCardsFromNotion } from '@/lib/notion'
import { classifyIntent, getChatCompletion } from '@/lib/openai';

const databaseId = process.env.NOTION_DATABASE_ID!

export async function POST(req: NextRequest) {
    const body = await req.json()
    const query = body.query ?? ''
    console.log('Searching for cards with query:', query)

    
    if (!query) {
        return NextResponse.json({ intent: '未知', message: '请输入问题描述' }, { status: 400 })
    }
    
    
    const intent = await classifyIntent(query)
    
    if (intent === '生成结构卡') {
    const result = await callG
    return NextResponse.json({ intent, ...result })
    }
    
    
    if (intent === '查询结构卡') {
    const pages = await getRelevantCardsFromNotion(query)
    const cards = pages.map((page: any) => {
    const props = page.properties
    return {
    名称: props.名称?.title?.[0]?.text?.content ?? '',
    类型: props.类型?.select?.name ?? '',
    原文: props.原文?.rich_text?.[0]?.text?.content ?? '',
    内容: props.内容?.rich_text?.[0]?.text?.content ?? ''
    }
    })
    return NextResponse.json({ intent, cards })
    }
    
    
    return NextResponse.json({
    intent: '未知',
    message: '当前仅支持生成结构卡或查询结构卡，其他意图暂不支持'
    })
    }
