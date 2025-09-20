"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function RetrieveSmartPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 🔽 新增：下拉数据与选择状态
  const [optionsLoading, setOptionsLoading] = useState(false);
  const [domainOptions, setDomainOptions] = useState<string[]>([]);
  const [topicOptions, setTopicOptions] = useState<string[]>([]);
  const [domain, setDomain] = useState<string>("");         // 领域维度（单选）
  const [topics, setTopics] = useState<string[]>([]);       // 主题/产品标签（多选）

  // 🔽 第一步：从后端拉取 Notion 的选项（后端稍后实现 /api/structure-card/options）
  useEffect(() => {
    (async () => {
      try {
        setOptionsLoading(true);
        const res = await fetch("/api/structure-card/options", { method: "GET" });
        const data = await res.json();
        setDomainOptions(data.domainOptions || []);   // 来自 Notion 的「领域维度」（Select）
        setTopicOptions(data.topicOptions || []);     // 来自 Notion 的「主题/产品标签」（Multi-select）
      } catch (e) {
        console.error("获取下拉选项失败：", e);
      } finally {
        setOptionsLoading(false);
      }
    })();
  }, []);

  // 🔽 多选开关
  const toggleTopic = (value: string) => {
    setTopics((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleRetrieve = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/retrieve-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // ✅ 统一改为传 query，并带上筛选条件（后端下一步支持）
        body: JSON.stringify({
          query,
          filters: {
            domain: domain || null,    // Notion 对应属性：『领域维度』（Select）
            topics,                    // Notion 对应属性：『主题/产品标签』（Multi-select）
          },
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("检索失败：", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">🔍 智能检索结构卡</h1>

      {/* 原有检索输入 + 按钮 */}
      <Input
        placeholder='请输入问题，如“如何判断卡片是否拆分？”'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* 🔽 新增：领域维度（单选） */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="block text-sm mb-1">领域维度（单选）</label>
          <Select
            value={domain}
            onValueChange={setDomain}
            disabled={optionsLoading || domainOptions.length === 0}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={optionsLoading ? "载入中…" : "请选择领域维度"} />
            </SelectTrigger>
            <SelectContent>
              {domainOptions.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 🔽 新增：主题/产品标签（多选） */}
        <div className="flex-1">
          <label className="block text-sm mb-1">主题标签（多选）</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between"
                disabled={optionsLoading || topicOptions.length === 0}
              >
                {topics.length > 0 ? `已选 ${topics.length} 项` : (optionsLoading ? "载入中…" : "请选择标签")}
                <span className="text-muted-foreground">▼</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 max-h-72 overflow-auto">
              {topicOptions.map((opt) => (
                <DropdownMenuCheckboxItem
                  key={opt}
                  checked={topics.includes(opt)}
                  onCheckedChange={() => toggleTopic(opt)}
                >
                  {opt}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* 选择结果可视化 */}
          <div className="mt-2 flex flex-wrap gap-2">
            {topics.map((t) => (
              <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
            ))}
            {topics.length > 0 && (
              <Button variant="ghost" size="sm" onClick={() => setTopics([])}>
                清空
              </Button>
            )}
          </div>
        </div>
      </div>

      <Button onClick={handleRetrieve} disabled={loading}>
        {loading ? "正在检索…" : "开始检索"}
      </Button>

      {result && (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <p className="font-semibold">🧠 GPT解析意图：</p>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {result.intent}
              </p>
            </CardContent>
          </Card>

          {result.cards?.length > 0 ? (
              <ResultsView cards={result.cards} query={query} />
            ) : (
              <Card>
                <CardContent className="p-4">
                  <p className="text-muted-foreground text-sm">
                    未匹配到结构卡，请尝试其他表达方式。
                  </p>
                </CardContent>
              </Card>
            )}
     </div>
      )}
    </div>
  );
}

function ResultsView({ cards, query }: { cards: any[]; query: string }) {
  const [activeTag, setActiveTag] = React.useState<string | null>(null);

  // 🔽 收集所有标签
  const allTags = Array.from(new Set(cards.flatMap((c) => c.主题标签 || [])));

  // 🔽 点击标签切换
  const toggleTag = (tag: string) => {
    setActiveTag(activeTag === tag ? null : tag);
  };

  // 🔽 当前展示的卡片
  const filteredCards = activeTag
    ? cards.filter((c) => c.主题标签?.includes(activeTag))
    : cards;

  return (
    <div className="space-y-6">
      {/* 标签墙 */}
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <span
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`cursor-pointer text-xs px-2 py-1 rounded ${
              activeTag === tag
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground"
            }`}
            style={{ flex: "0 0 calc(25% - 0.5rem)" }} // 每行 4 个
          >
            {tag}
          </span>
        ))}
      </div>

      {/* 展示结果 */}
      {filteredCards.length > 0 ? (
        filteredCards.map((card) => (
      <Card key={card.id} className="rounded-xl shadow-sm border border-gray-200">
        <CardContent className="p-5 space-y-3">
          {/* 标题 */}
          <div className="flex items-center gap-2">
            <span className="text-lg">📌</span>
            <h2 className="font-bold text-lg">{card.标题}</h2>
          </div>

          {/* 适用场景 */}
          {card.适用场景 && (
            <div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                🧩 <span>适用场景</span>
              </p>
              <p className="text-sm leading-relaxed">{card.适用场景}</p>
            </div>
          )}

          {/* 一句话主张 */}
          {card.一句话主张 && (
            <div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                💬 <span>一句话主张</span>
              </p>
              <p className="text-sm leading-relaxed">{card.一句话主张}</p>
            </div>
          )}

          {/* 标签 */}
          {card.主题标签?.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                🏷️ <span>标签</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {card.主题标签.map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 正文 */}
          {card._expanded && (
            <div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                📖 <span>正文</span>
              </p>
              <p className="text-sm whitespace-pre-line leading-relaxed">{card.正文}</p>
            </div>
          )}

              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => alert(card.正文)} // 这里可以改成展开/收起正文
              >
                查看详情
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-muted-foreground text-sm">未匹配到结构卡</p>
      )}
    </div>
  );
}

