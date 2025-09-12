console.log('🧨🧨【notion.ts 被加载了】🧨🧨');

import { Client } from '@notionhq/client'

// lib/notion.ts
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const databaseId = process.env.NOTION_DATABASE_ID!

//生成结构卡
export async function saveToNotion(title: string, content: string, type: string, original: string) {
  console.log('✅ 参数：','original=' + original+'type=' + type+'title=' + title);
  await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      名称: {
        title: [{ text: { content: title } }]
      },
      类型: {
        select: { name: type }  // ⚠️ Notion中对应字段必须是"select"类型
      },
      原文: {
        rich_text: [{ text: { content: original } }]
      }
    },
    children: [
      {
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [{ type: 'text', text: { content } }]
        }
      }
    ]
  });
}

//查询结构卡：补充函数：模糊匹配结构卡
// 使用 v5.0.0 标准 API 方法
export async function getRelevantCardsFromNotion(keyword: string): Promise<any[]> {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: '名称',
        rich_text: {
          contains: keyword,
        },
      },
    });

    return response.results;
  } catch (error) {
    console.error('❌ 查询结构卡失败：', error);
    return [];
  }
}




// lib/notion.ts - 测试连接函数
export async function testConnection() {
  try {
    // 使用 v5.0.0 兼容的方式获取数据库信息
    const database = await notion.databases.retrieve({
      database_id: databaseId
    });

    console.log('✅ Notion 连接成功，数据库标题：', database.title[0]?.plain_text || '未命名数据库');
    return database.title[0]?.plain_text || '连接成功';
  } catch (error) {
    console.error('❌ Notion 连接失败：', error);
    throw error;
  }
}