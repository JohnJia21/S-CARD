import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

// ✅ 使用环境变量连接 Notion
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DATABASE_ID = process.env.NOTION_DATABASE_ID || "";

// 🔽 获取 Notion 数据库的属性选项
export async function GET() {
  try {
    if (!DATABASE_ID) {
      return NextResponse.json(
        { error: "缺少 NOTION_DB_ID" },
        { status: 500 }
      );
    }
    const db = await notion.databases.retrieve({ database_id: DATABASE_ID });

    // 取出两个字段
    // const domainOptions =
    //   (db.properties["领域维度"] as any)?.select?.options?.map(
    //     (opt: any) => opt.name
    //   ) || [];
    //   console.log("useEffect 执行了3 ✅" + domainOptions);

    const domainProp: any = db.properties["领域维度"];
    let domainOptions: string[] = [];
    
    if (domainProp?.select?.options) {
      // 单选
      domainOptions = domainProp.select.options.map((opt: any) => opt.name);
    } else if (domainProp?.multi_select?.options) {
      // 多选
      domainOptions = domainProp.multi_select.options.map((opt: any) => opt.name);
    }
    
    const topicOptions =
      (db.properties["主题/产品标签"] as any)?.multi_select?.options?.map(
        (opt: any) => opt.name
      ) || [];
    return NextResponse.json({ domainOptions, topicOptions });
  } catch (error: any) {
    console.error("❌ 获取 Notion 选项失败:", error);
    return NextResponse.json(
      { error: "Failed to fetch options", details: error.message },
      { status: 500 }
    );
  }
}



// export async function GET() {
//   return NextResponse.json({
//     domainOptions: ["维度A", "维度B"],
//     topicOptions: ["标签1", "标签2", "标签3"],
//   });
// }

