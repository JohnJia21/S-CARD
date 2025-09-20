结构卡系统/
├── app/                        // Next.js App Router 页面目录
│   ├── layout.tsx             // 全局布局（导航栏、主题）
│   ├── page.tsx               // 首页（可保留默认）
│   ├── generate/              // 结构卡生成页
│   │   └── page.tsx           // 生成结构卡的表单界面 ✅ 已完成
│   ├── retrieve/              // 结构卡调用页（检索）
│   │   └── page.tsx           // 检索结构卡并调用 GPT（下一步）
│
├── app/api/                   // Next.js 后端 API 路由
│   ├── generate-card/         // API: 生成结构卡
│   │   └── route.ts           // POST：生成结构卡并写入 Notion ✅ 已完成
│   ├── retrieve-card/         // API: 调用结构卡
│       └── route.ts           // POST：检索并聚合结构卡（下一步）
│
├── components/                // shadcn/ui 的组件封装（执行 `npx shadcn@latest add` 后生成）
│   ├── ui/                    // 按需自动生成，如：
│   │   ├── button.tsx
│   │   ├── textarea.tsx
│   │   ├── select.tsx
│   │   └── ...更多组件
│
├── lib/                       // 封装工具函数/API 接口
│   ├── openai.ts              // GPT API 调用封装 ✅
│   ├── notion.ts              // Notion API 封装 ✅
│   └── prompt.ts              // Prompt 模板管理（下一步）
│
├── .env.local                 // 本地环境变量配置
│
├── tailwind.config.ts        // Tailwind 配置
├── postcss.config.js         // PostCSS 配置
├── tsconfig.json             // TypeScript 配置
├── package.json              // 项目依赖声明
└── README.md                 // 项目说明

| 文件                               | 贴入原文摘录                                     |
| -------------------------------- | ---------------------------------------- |
| `app/generate/page.tsx`          | 刚刚我们生成的结构卡生成页页面组件                        |
| `app/api/generate-card/route.ts` | 对应结构卡生成接口，调用 GPT + 写入 Notion             |
| `lib/openai.ts`                  | GPT 封装函数 `generateStructureCard(prompt)` |
| `lib/notion.ts`                  | 封装 `saveToNotion()` 写入结构卡原文摘录              |

✅ 启动前的准备
1. 安装依赖
npm install openai @notionhq/client

2. 配置 .env.local
OPENAI_API_KEY=sk-...
NOTION_TOKEN=secret_...
NOTION_DATABASE_ID=你的 Notion 数据库 ID

3. 启动项目
npm run dev


是否继续我来生成 /retrieve 页面 + 对应 API？你贴入上面的结构中就能直接跑通 🔥


● 根据我的分析，我发现了几个可能导致
  notion.databases.query 失效的问题：

● 问题分析和解决方案

  通过分析你的项目结构，我发现了以下几个可能导致
  notion.databases.query 失效的问题：

  🔍 主要问题定位

  1. 重复的 Notion 实例化
    - app/api/retrieve-card/route.ts:4 中直接实例化了    
   Notion Client
    - lib/notion.ts:6 中也实例化了 Notion Client
    - 两个不同的实例可能导致状态不一致
  2. API版本不匹配
    - 你的 @notionhq/client 版本是 5.0.0
    - 不同版本的API调用方式可能有变化，特别是
  databases.query 方法
  3. @notionhq/client版本缺失
    - Notion API v5.0.0 可能不包含 databases.query       
  方法
    - 需要确认当前版本是否支持该方法

  🛠️ 具体解决方案

  方案1: 统一使用一个Notion实例

  将 retrieve-card/route.ts 改为使用 lib/notion.ts       
  中的实例：

  // app/api/retrieve-card/route.ts
  import { NextRequest, NextResponse } from
  'next/server'
  import { notion } from '@/lib/notion'  //
  使用统一的实例

  const databaseId = process.env.NOTION_DATABASE_ID!     

  export async function POST(req: NextRequest) {
    // ... 其他代码保持不变

    const query = await notion.databases.query({
      database_id: databaseId,
      filter: filters.length > 1 ? { and: filters } :    
   filters[0]
    })

    // ... 其他代码
  }

  方案2: 检查并更新API调用方式

  如果v5.0.0不支持 databases.query，改用
  notion.request 方法：

  const query = await notion.request({
    path: `databases/${databaseId}/query`,
    method: 'post',
    body: {
      filter: filters.length > 1 ? { and: filters } :    
   filters[0]
    }
  }) as { results: any[] };

  方案3: 清理缓存和重建

  # 清理 Next.js 缓存
  rm -rf .next
  # rd /s /q .next
  # 清理 node_modules 和重新安装
  rm -rf node_modules package-lock.json
  npm install

  方案4: 降级到稳定版本

  如果问题持续，考虑降级到更稳定的版本：
  npm install @notionhq/client@4.21.1

  💡 建议调试步骤

  1. 先尝试方案1（统一实例）
  2. 如果还有问题，检查控制台错误信息
  3. 然后尝试方案2（使用request方法）
  4. 最后考虑方案3和方案4


  你想要我帮你实施哪个解决方案？

  rd /s /q node_modules
del package-lock.json
npm install --legacy-peer-deps

--

● 太好了！让我总结一下解决问题的思路和方案：

● 问题解决思路和方案总结

  🔍 问题诊断过程

  1. 识别根本问题：你点击功能后，日志显示 TypeError: 
  notion.databases.query is not a function
  2. 定位错误位置：错误发生在
  app/api/retrieve-card/route.ts:42:42
  3. 分析可能原因：Notion客户端初始化或包损坏问题

  💡 解决思路

  我采用了渐进式排查和修复的策略：

  第1步：重新安装Framer Motion（成功解决第一个问题）     

  - 问题：应用启动时出现依赖错误
  - 方案：npm uninstall framer-motion --force → npm      
  install framer-motion --force
  - 结果：✅ 应用成功启动，可访问页面

  第2步：修复Notion API调用错误

  - 问题：notion.databases.query is not a function       
  - 诊断方法：
    - 查看Notion SDK官方文档，确认API调用语法正确        
    - 添加调试代码查看客户端初始化状态
    - 分析包版本和依赖关系
  - 解决方案：
  npm uninstall @notionhq/client --force
  npm install @notionhq/client --force

  🔧 关键修复动作

  1. 强制重装损坏包：使用 --force 参数绕过依赖冲突       
  2. 完全重启服务器：确保新安装的包正确加载
  3. 代码结构优化：改进错误处理和调试信息

  🎯 成功因素

  - 系统性方法：按照预设的4个方案逐步尝试
  - 彻底重装：不仅卸载重装，还重启了服务器
  - 强制处理：使用 --force 解决依赖冲突
  - 实时监控：持续监控日志确认修复效果

  📋 最终解决方案

  方案1（Framer Motion）+ 
  强化版方案1（Notion客户端）：
  - 重新安装有问题的包
  - 强制绕过依赖冲突
  - 重启开发环境确保生效

  这种逐步诊断、针对性修复的方法确保了问题得到彻底解     
  决！