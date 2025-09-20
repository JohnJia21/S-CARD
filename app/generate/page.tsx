// 结构卡系统 MVP 项目起始骨架

// 技术栈：Next.js 14 App Router + TypeScript + Tailwind CSS + shadcn/ui + OpenAI SDK + Notion SDK

// 📁 项目结构（关键文件清单）

/**
 * app/
 * ├── layout.tsx         // 页面布局
 * ├── page.tsx           // 首页
 * ├── generate/page.tsx // 结构卡生成页 ✅【已实现】
 * ├── retrieve/page.tsx // 结构卡调用页（下一步）
 *
 * lib/
 * ├── openai.ts          // GPT 调用封装
 * ├── notion.ts          // Notion API 封装
 * ├── prompt.ts          // Prompt 模板管理（待添加）
 *
 * app/api/
 * ├── generate-card/route.ts // POST: 生成结构卡
 * ├── retrieve-card/route.ts // POST: 调用结构卡（待实现）
 */

// ✅ 示例：app/generate/page.tsx
'use client';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';

export default function GeneratePage() {
  const [rawText, setRawText] = useState('');
  const [cardType, setCardType] = useState('模型卡');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    const res = await fetch('/api/generate-card', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rawText, cardType,customPrompt: '' })
    });
    const data = await res.json();
    setResult(data.card);
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto py-10 space-y-4">
      <h1 className="text-2xl font-bold">生成结构卡</h1>

      <Select value={cardType} onValueChange={setCardType}>
        <SelectTrigger className="w-full">选择卡片卡片类型：{cardType}</SelectTrigger>
        <SelectContent>
          <SelectItem value="模型卡">模型卡</SelectItem>
          <SelectItem value="方法卡">方法卡</SelectItem>
          <SelectItem value="判断卡">判断卡</SelectItem>
          <SelectItem value="流程卡">流程卡</SelectItem>
        </SelectContent>
      </Select>

      <Textarea
        rows={8}
        value={rawText}
        onChange={e => setRawText(e.target.value)}
        placeholder="请输入一句话主张原文摘录"
      />

      <Button onClick={handleGenerate} disabled={loading} className="w-full">
        {loading ? '生成中...' : '生成结构卡'}
      </Button>

      {result && (
        <div className="mt-6 border p-4 rounded bg-muted text-sm whitespace-pre-wrap">
          <h2 className="font-semibold mb-2">✅ 生成结果：</h2>
          {result}
        </div>
      )}
    </div>
  );
}