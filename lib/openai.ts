// ✅ 示例：lib/openai.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
});

export async function generateStructureCard(prompt: string): Promise<string> {
  const res = await openai.chat.completions.create({
    model: 'gpt-4o', // 或尝试 gpt-4 / gpt-4o
    messages: [
      { role: 'system', content: '你是结构卡生成专家。请按固定格式输出结构卡。' },
      { role: 'user', content: prompt }
    ]
  });
  return res.choices[0].message.content || '';
}

//识别关键词
export async function getChatCompletion(systemPrompt: string, userInput: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o', // 或尝试 gpt-4 / gpt-4o
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userInput },
    ],
    temperature: 0.4,
  });

  return response.choices[0].message.content || '';
}


// 意图识别：调用 GPT 判断用户是生成 or 查询
export async function classifyIntent(query: string): Promise<'生成结构卡' | '查询结构卡' | '未知'> {
  const res = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: process.env.CLASSIFY_INTENT!
      },
      { role: 'user', content: query }
    ],
  temperature: 0.2,
  })
  
  const content = res.choices[0]?.message?.content?.trim() || ''
  if (content.includes('生成')) return '生成结构卡'
  if (content.includes('查询')) return '查询结构卡'
  return '未知'
  }