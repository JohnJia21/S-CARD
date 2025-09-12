// ✅ 示例：app/api/generate-card/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateStructureCard } from '@/lib/openai';
import { saveToNotion } from '@/lib/notion';

export async function POST(req: NextRequest) {

  const { rawText, cardType, customPrompt } = await req.json();

  const fullPrompt = customPrompt || `${cardType}：请根据以下原文生成结构卡——${rawText}`;

  const card = await generateStructureCard(fullPrompt);

  console.log('✅ 参数：','rawText=' + rawText+'cardType=' + cardType+'customPrompt=' + customPrompt);
  
  await saveToNotion(`${cardType}结构卡`, card,cardType,rawText);
  return NextResponse.json({ card });
}