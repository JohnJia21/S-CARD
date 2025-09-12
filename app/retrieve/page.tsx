"use client";
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function RetrieveSmartPage() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleRetrieve = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/retrieve-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput: query})
      })
      const data = await res.json()
      setResult(data)
    } catch (err) {
      console.error('检索失败：', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🔍 智能检索结构卡</h1>
      <Input
        placeholder="请输入问题，如“如何判断卡片是否拆分？”"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-4"
      />
      <Button onClick={handleRetrieve} disabled={loading}>
        {loading ? '正在检索…' : '开始检索'}
      </Button>

      {result && (
        <div className="mt-6 space-y-4">
          <Card>
            <CardContent className="p-4">
              <p className="font-semibold">🧠 GPT解析意图：</p>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{result.intent}</p>
            </CardContent>
          </Card>

          {result.cards?.length > 0 ? (
            result.cards.map((card: any, index: number) => (
              <Card key={index}>
                <CardContent className="p-4 space-y-2">
                  <p className="font-semibold">📌 {card.名称}</p>
                  <p className="text-muted-foreground text-sm whitespace-pre-line">{card.类型}</p>
                  <div className="text-sm whitespace-pre-line">{card.原文}</div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-4">
                <p className="text-muted-foreground text-sm">未匹配到结构卡，请尝试其他表达方式。</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
