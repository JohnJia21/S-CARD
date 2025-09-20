import { NextRequest, NextResponse } from 'next/server'
import { notion, getRelevantCardsFromNotion } from '@/lib/notion'
import { classifyIntent, getChatCompletion } from '@/lib/openai';

const databaseId = process.env.NOTION_DATABASE_ID!

export async function POST(req: NextRequest) {
    const body = await req.json()
    const query = body.query ?? ''

    
    if (!query) {
        return NextResponse.json({ intent: '未知', message: '请输入问题描述' }, { status: 400 })
    }
    
    
    const intent = await classifyIntent(query)
    
    // if (intent === '生成结构卡') {
    // const result = await callG
    // return NextResponse.json({ intent, ...result })
    // }
    
    
    if (intent === '查询结构卡') {
    const pages = await getRelevantCardsFromNotion(query)
    const cards = pages.map((page: any) => {
    const props = page.properties
    return {
    标题: props.标题?.title?.[0]?.text?.content ?? '',
    卡片类型: props.卡片类型?.select?.name ?? '',
    一句话主张: props.一句话主张?.rich_text?.[0]?.text?.content ?? '',
    原文摘录: props.原文摘录?.rich_text?.[0]?.text?.content ?? ''
    }
    })
    return NextResponse.json({ intent, cards })
    }
    
    
    return NextResponse.json({
    intent: '未知',
    message: '当前仅支持生成结构卡或查询结构卡，其他意图暂不支持'
    })
    }
