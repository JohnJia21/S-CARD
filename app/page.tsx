"use client";

import { useEffect, useMemo, useRef, useState,ReactNode } from "react";

/** 痛点与对应“真实抱怨”素材 */
const PAINS: { key: string; title: string; desc: string; icon: string; lines: string[] }[] = [
  {
    key: "rhythm",
    title: "节奏被打断",
    desc: "计划总被打乱，难以保持长期节奏。",
    icon: "⏳",
    lines: [
      "💬 明明订了计划，工作一忙就全乱套。",
      "💬 三天打卡两天断档，节奏接不起来。",
      "💬 周末一躺就停工，周一又从零开始。",
      "💬 一换项目，之前的节奏直接崩盘。"
    ],
  },
  {
    key: "fragments",
    title: "方法很碎片",
    desc: "技巧很多，却拼不成体系。",
    icon: "🧩",
    lines: [
      "💬 收藏夹全是技巧，要用时一个都想不起来。",
      "💬 今天试A明天换B，越搞越乱。",
      "💬 看了十篇效率秘籍，还是不知道先做啥。",
      "💬 没有一套能贯穿到底的结构。"
    ],
  },
  {
    key: "nofeedback",
    title: "没有反馈回路",
    desc: "努力了，却看不见成长轨迹。",
    icon: "📉",
    lines: [
      "💬 做完任务没成就感，像在黑屋里走路。",
      "💬 复盘写了，但感觉没变化。",
      "💬 不知道自己是不是在原地打转。",
      "💬 投入不少时间，却没有形成可复用成果。"
    ],
  },
  {
    key: "overload",
    title: "信息过载",
    desc: "信息噪音太多，越看越乱。",
    icon: "📚",
    lines: [
      "💬 课程/文章太多，真正需要的总找不到。",
      "💬 被通知淹没，注意力像被撕裂。",
      "💬 一刷就停不下来，但没有更清晰。",
      "💬 资料堆成山，越整理越焦虑。"
    ],
  },
  {
    key: "direction",
    title: "方向不确定",
    desc: "目标摇摆不定，优先级反复横跳。",
    icon: "🧭",
    lines: [
      "💬 做着做着发现不是这条路，又要重来。",
      "💬 想做的太多，手头没一个能落地。",
      "💬 总感觉差一个‘对的方法’。",
      "💬 路线改来改去，推进效率很低。"
    ],
  },
  {
    key: "shortterm",
    title: "短期主义陷阱",
    desc: "被速成诱惑，难以沉淀长期能力资产。",
    icon: "🔥",
    lines: [
      "💬 被七天速成‘骗’了无数次。",
      "💬 每次都想走捷径，最后还得从基础补起。",
      "💬 结果导向太强，过程完全坚持不下去。",
      "💬 学到了，但没有变成自己的东西。"
    ],
  },
];

type FeedItem = { id: number; painKey: string; text: string };

/** 高亮词典（关键词 → 表情） */
const HIGHLIGHT_MAP: Record<string, string> = {
  "断档": "🧨",
  "乱套": "🥴",
  "碎片": "🧩",
  "没有反馈|没反馈|反馈": "🔁",
  "成就感": "🏆",
  "信息过载|过载": "📚",
  "焦虑": "😣",
  "摇摆": "⚖️",
  "捷径": "⏩",
  "速成": "⚡",
  "拖延": "🐌",
  "动力": "🔋",
  "没变化|没有变化": "🪫",
};

export default function Home() {
  const [mode, setMode] = useState<"grid" | "split">("grid");
  const [activeIndex, setActiveIndex] = useState(0);
  const activePain = PAINS[activeIndex]?.key ?? null;

  const [feed, setFeed] = useState<FeedItem[]>([]);
  const indexRef = useRef<Record<string, number>>({});
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 进入分屏（悬浮卡片），先展示 3 条
  const enterSplit = (idx: number) => {
    const p = PAINS[idx];
    const first = Math.min(5, p.lines.length);
    const batch: FeedItem[] = p.lines.slice(0, first).map((text) => ({
      id: Date.now() + Math.random(),
      painKey: p.key,
      text,
    }));
    setFeed(batch);
    indexRef.current[p.key] = first % p.lines.length;

    setActiveIndex(idx);
    setMode("split");
  };

  // 分屏左栏悬浮切换：清屏 + 先 3 条
  const onHoverSelect = (idx: number) => {
    if (idx === activeIndex && mode === "split") return;
    const p = PAINS[idx];
    const first = Math.min(3, p.lines.length);
    const batch: FeedItem[] = p.lines.slice(0, first).map((text) => ({
      id: Date.now() + Math.random(),
      painKey: p.key,
      text,
    }));
    setFeed(batch);
    indexRef.current[p.key] = first % p.lines.length;
    setActiveIndex(idx);
  };

  // 离开分屏 → 回到平铺
  const backToGrid = () => {
    setMode("grid");
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  // 追加节奏：更“多一些” → 1.4s/条（以前 1.7s）
  useEffect(() => {
    if (mode !== "split" || !activePain) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      return;
    }
    if (timerRef.current) clearInterval(timerRef.current);

    const pain = PAINS[activeIndex];
    timerRef.current = setInterval(() => {
      const arr = pain.lines;
      const cur = indexRef.current[pain.key] ?? 0;
      const text = arr[cur];
      indexRef.current[pain.key] = (cur + 1) % arr.length;

      setFeed((prev) => [...prev, { id: Date.now() + Math.random(), painKey: pain.key, text }]);

      const list = document.querySelector<HTMLElement>("#complaint-list");
      if (list) list.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
    }, 1200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [mode, activeIndex, activePain]);

  // —— 关键词高亮渲染 —— //
  const highlighters = useMemo(() => {
    // 生成正则数组，按词典顺序应用
    return Object.entries(HIGHLIGHT_MAP).map(([pattern, emoji]) => ({
      re: new RegExp(pattern, "g"),
      emoji,
    }));
  }, []);

  const renderHighlighted = (text: string) => {
    let nodes: ReactNode[] = [text];        // ✅ 用 ReactNode
    highlighters.forEach(({ re, emoji }) => {
      const next: ReactNode[] = [];         // ✅ 用 ReactNode
      nodes.forEach((chunk, i) => {
        if (typeof chunk !== "string") return next.push(chunk);
        const parts = chunk.split(re);
        const matches = chunk.match(re);
        if (!matches) return next.push(chunk);
        parts.forEach((p, idx) => {
          next.push(p);
          if (idx < parts.length - 1) {
            const m = matches[idx];
            next.push(
              <mark
                key={`${i}-${idx}-${m}-${Math.random()}`}
                className="bg-amber-100 text-amber-900 rounded-sm px-1 py-0.5 inline-flex items-center gap-1"
              >
                <span className="opacity-90">{emoji}</span>
                <span className="font-medium">{m}</span>
              </mark>
            );
          }
        });
      });
      nodes = next;
    });
    return <>{nodes}</>;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-green-50">
      {/* Hero */}
      <section className="px-6 pt-16 pb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">🌱 让成长自然发生</h1>
        <p className="mt-3 text-gray-600 text-lg md:text-xl">以结构为根，让每一步成长都顺势而为。</p>
      </section>

      {mode === "grid" ? (
        /* 初始：平铺（悬浮进入分屏并立即展示 3 条） */
        <section className="px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">你是否也遇到这些痛点？</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PAINS.map((p, idx) => (
                <div
                  key={p.key}
                  className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 hover:shadow-md transition cursor-pointer"
                  onMouseEnter={() => enterSplit(idx)}
                  title="悬浮以查看该痛点的真实抱怨流"
                >
                  <div className="text-2xl">{p.icon}</div>
                  <h3 className="mt-2 text-lg font-semibold text-gray-900">{p.title}</h3>
                  <p className="mt-1 text-gray-600">{p.desc}</p>
                  <div className="mt-4 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition">
                    悬浮进入分屏，先展示 3 条真实抱怨 →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* 分屏：外包络容器；离开其上下左右任意方向即回平铺 */
        <section className="px-4 pb-16">
          <div
            className="
              max-w-7xl mx-auto grid gap-6
              grid-cols-1 md:[grid-template-columns:360px_1fr] lg:[grid-template-columns:380px_1fr]
            "
            onMouseLeave={backToGrid}
          >
            {/* 左：更窄的纵向卡片列表（≈300px） */}
            <div className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-black/5 p-4 md:p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900">痛点列表</h2>
                <span className="text-xs text-gray-500">悬浮切换 · 自动追加</span>
              </div>
              <div className="max-h-[520px] overflow-y-auto pr-2 space-y-3">
                {PAINS.map((p, idx) => {
                  const active = idx === activeIndex;
                  return (
                    <div
                      key={p.key}
                      id={`pain-item-${idx}`}
                      onMouseEnter={() => onHoverSelect(idx)}
                      className={`rounded-2xl p-4 shadow-sm ring-1 transition cursor-pointer ${
                        active
                          ? "bg-green-50 ring-green-500/60"
                          : "bg-white ring-gray-200 hover:bg-gray-50"
                      }`}
                      title="悬浮以切换到该痛点"
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{p.icon}</div>
                        <div>
                          <div className="text-base font-semibold text-gray-900">{p.title}</div>
                          <div className="mt-1 text-sm text-gray-600">{p.desc}</div>
                        </div>
                      </div>
                      {active && (
                        <div className="mt-2 text-xs text-green-700">
                          正在向右侧追加“{p.title}”的真实抱怨…
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 右：更丰富的抱怨实时流（关键词高亮 + 表情） */}
            <div className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-black/5 p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900">真实抱怨 · 实时流</h2>
                <div className="text-xs text-gray-500">
                  {activePain ? `正在追加：${PAINS[activeIndex].title}` : "悬浮左侧痛点开始"}
                </div>
              </div>

              {/* 容器更高，行距更紧凑，展示更多内容 */}
              <div id="complaint-list" className="max-h-[600px] overflow-y-auto pr-1">
                {feed.length === 0 ? (
                  <div className="text-gray-500 text-sm py-10 text-center">
                    暂无内容。悬浮左侧某个痛点，右侧将先展示 3 条真实抱怨，随后继续追加。
                  </div>
                ) : (
                  <ul className="columns-1 md:columns-2 gap-4 [column-fill:balance]">
                    {feed.map((f) => {
                      const pain = PAINS.find(x => x.key === f.painKey); // ← 定义 pain
                      return (
                        <li
                          key={f.id}
                          className="mb-4 break-inside-avoid rounded-xl bg-white p-3 shadow-sm ring-1 ring-gray-200/70"
                        >
                          <div className="text-[11px] text-gray-400 mb-1">
                            #{pain?.title}
                          </div>
                          <div className="text-gray-800 leading-relaxed text-[15px]">
                            {renderHighlighted(f.text)}
                          </div>
                        </li>
                      );
                    })}
                  </ul>


                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 页脚 */}
      <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-500">
        © 2025 WiseGrow · 让成长自然发生
      </footer>
    </main>
  );
}
