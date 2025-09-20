console.log('🧨🧨【notion.ts 被加载了】🧨🧨');

import { Client } from '@notionhq/client'
import { isFullDatabase } from "@notionhq/client";


// lib/notion.ts
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const databaseId = process.env.NOTION_DATABASE_ID!

//生成结构卡
export async function saveToNotion(title: string, content: string, type: string, original: string) {
  // console.log('✅ 参数：','original=' + original+'type=' + type+'title=' + title);
  await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      标题: {
        title: [{ text: { content: title } }]
      },
      卡片类型: {
        select: { name: type }  // ⚠️ Notion中对应字段必须是"select"卡片类型
      },
      一句话主张: {
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
// export async function getRelevantCardsFromNotion(keyword: string): Promise<any[]> {
//   try {
//     const response = await notion.databases.query({
//       database_id: databaseId,
//       filter: {
//         property: '标题',
//         rich_text: {
//           contains: keyword,
//         },
//       },
//     });

//     return response.results;
//   } catch (error) {
//     console.error('❌ 查询结构卡失败：', error);
//     return [];
//   }
// }

export async function getRelevantCardsFromNotion(query: string, filters?: { domain?: string | null, topics?: string[] }) {
  const conditions: any[] = [];

  // 标题模糊
  if (query) {
    conditions.push({
      property: "标题",
      title: { contains: query }
    });
  }

  // 领域维度（单选）
  if (filters?.domain) {
    conditions.push({
      property: "领域维度",
      select: { equals: filters.domain }
    });
  }

  // 主题/产品标签（多选）
  if (filters?.topics && filters.topics.length > 0) {
    filters.topics.forEach(topic => {
      conditions.push({
        property: "主题/产品标签",
        multi_select: { contains: topic }
      });
    });
  }

  // console.log("✅查询条件:", conditions);

  const resp = await notion.databases.query({
    database_id: databaseId,
    filter: { and: conditions },
    // sorts: [
    //   {
    //     property: "更新时间", // 如果有更新时间字段
    //     direction: "descending"
    //   }
    // ]
  });

  // console.log("✅ Notion 连接成功, 返回条数:", resp.results.length);
  // console.log("返回的第一条记录:", JSON.stringify(resp.results[0], null, 2));
  // resp.results.forEach((page: any, idx: number) => {
  //   const title = page.properties["标题"]?.title?.[0]?.plain_text ?? "(无标题)";
  //   console.log(`第 ${idx + 1} 条: ${title}`);
  // });
  

  return resp.results;
}



// lib/notion.ts - 测试连接函数
export async function testConnection() {
  try {
    // 使用 v5.0.0 兼容的方式获取数据库信息
    const database = await notion.databases.retrieve({
      database_id: databaseId
    });

    if (isFullDatabase(database)) {
      const title = database.title[0]?.plain_text || "未命名数据库";
      console.log("✅ Notion 连接成功，数据库标题：", title);
      return title;
    } else {
      console.warn("⚠️ 获取到的是部分数据库对象（PartialDatabaseObjectResponse）");
      return "连接成功（未完整返回数据库信息）";
    }

    // console.log('✅ Notion 连接成功，数据库标题：', database.title[0]?.plain_text || '未命名数据库');
    // return database.title[0]?.plain_text || '连接成功';
  } catch (error) {
    console.error('❌ Notion 连接失败：', error);
    throw error;
  }
}