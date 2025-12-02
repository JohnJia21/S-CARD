"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

type Role = "assistant" | "user";

type MessageClass = "system" | "action" | "mechanism" | "identity" | "summary";

interface Message {
  id: number;
  role: Role;
  text: string;
  typeLabel?: string;
  typeClass?: MessageClass;
  caption?: string;
}

type Mode = "green" | "yellow" | "red";
type Mainline = "relationship" | "startup" | "emotion";

export default function WiseGrowMvpPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [mode, setMode] = useState<Mode>("green");
  const [mainline, setMainline] = useState<Mainline>("relationship");
  const [cycleStep, setCycleStep] = useState(0); // 0 状态 → 1 承接/中继 → 2 动作 → 3 反馈
  const [todayCycles, setTodayCycles] = useState(0);
  const [weekCycles, setWeekCycles] = useState(0);
  const [totalCycles, setTotalCycles] = useState(0);
  const [cardCount, setCardCount] = useState(1);
  const [inputValue, setInputValue] = useState("");

  const nextIdRef = useRef(1);
  const chatMessagesRef = useRef<HTMLDivElement | null>(null);

  const appendMessage = useCallback(
    (role: Role, text: string, meta?: Omit<Message, "id" | "role" | "text">) => {
      setMessages((prev) => [
        ...prev,
        {
          id: nextIdRef.current++,
          role,
          text,
          ...meta,
        },
      ]);
    },
    []
  );

  // 滚动到底部
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  // 初始欢迎消息
  useEffect(() => {
    appendMessage(
      "assistant",
      "欢迎来到 WiseGrow MVP Demo 🌱\n\n左侧是对话主视角，右侧是「飞轮控制室」。\n\n你可以随便说点现在的状态，比如：\n- 最近总是想逃避社交\n- 有点累，但不想完全躺平\n- 今天心情糟透了\n\n我会先识别你的状态，再决定是走：\n🟢 成长主路 / 🟡 节奏修复 / 🔴 承接模式。",
      {
        typeLabel: "SYSTEM",
        typeClass: "system",
        caption: "行为改变飞轮 · 入口",
      }
    );
  }, [appendMessage]);

  // 简单关键词识别模式
  function detectModeFromText(text: string): Mode {
    if (/崩|难受|很糟|讨厌|绝望|想放弃|羞耻/.test(text)) return "red";
    if (/累|疲惫|不想动|拖延|懒得|没劲/.test(text)) return "yellow";
    return "green";
  }

  function getMainlineLabel(m: Mainline) {
    if (m === "relationship") return "人际磁场主线";
    if (m === "startup") return "创业主线";
    return "情绪中继线";
  }

  function handleAssistantReply(userText: string) {
    const detected = detectModeFromText(userText);
    setMode(detected);

    // step 0：状态识别 → 承接/中继说明
    if (cycleStep === 0) {
      if (detected === "green") {
        appendMessage(
          "assistant",
          `收到，我听到了你现在的状态：有精力，也愿意动一点点。\n\n我们先用「${getMainlineLabel(
            mainline
          )}」，来一轮很轻的循环。下一步，我会给你一个非常小、不会有压力的小动作。`,
          {
            typeLabel: "STATE",
            typeClass: "system",
            caption: "状态识别 & 反馈",
          }
        );
      } else if (detected === "yellow") {
        appendMessage(
          "assistant",
          "听起来你有点累、又不太想完全躺平。这是特别正常的人性反应。\n\n在 WiseGrow 里，这叫「节奏修复模式🟡」。\n我们不讲任务，只做一件事：先把你从「想逃」拉回「能动一点点」。\n\n下一步，我会先给你一个「只需要 30 秒」的小动作。",
          {
            typeLabel: "承接",
            typeClass: "system",
            caption: "节奏修复模式",
          }
        );
      } else {
        appendMessage(
          "assistant",
          "我收到了：你现在的状态更接近「🔴 承接模式」。\n\n在 WiseGrow 里，这意味着：\n- 你的情绪比任务更重要；\n- 我会先接住你，而不是催你行动。\n\n下一步，我们先用一句话帮你把此刻的感受说清楚，不需要很标准，只要「对自己诚实」就好。",
          {
            typeLabel: "承接",
            typeClass: "system",
            caption: "情绪优先 · 永不抛弃",
          }
        );
      }
      setCycleStep(1);
      return;
    }

    // step 1：承接 / 中继 → 小动作
    if (cycleStep === 1) {
      appendMessage(
        "assistant",
        "好，我们来一个「不会超过 1 分钟」的小动作：\n\n👉 请你做一件事：\n在心里或者小声说一句：\n「我现在就是这样的状态，也没关系。」\n\n说完之后，在这里回一句「好了」。",
        {
          typeLabel: "ACTION",
          typeClass: "action",
          caption: "一步小动作 · 不求完美",
        }
      );
      setCycleStep(2);
      return;
    }

    // step 2：动作 → 反馈
    if (cycleStep === 2) {
      if (/好了|ok|完成|done/i.test(userText)) {
        appendMessage(
          "assistant",
          "收到，这一步已经完成 ✅\n\n现在，请用 1 句话描述一下：\n「做完刚刚那个小动作后，你的感觉有哪怕 1% 的变化？」\n\n哪怕只是：\n- 没有更糟\n- 或者「好像也就这样」\n都可以。",
          {
            typeLabel: "反馈引导",
            typeClass: "mechanism",
            caption: "从动作到感受",
          }
        );
        setCycleStep(3);
      } else {
        appendMessage(
          "assistant",
          "这一步我们只需要你确认「有做」，不用描述得多好。\n\n如果已经做了，可以直接回一句「好了」。",
          {
            typeLabel: "提示",
            typeClass: "system",
            caption: "等待完成信号",
          }
        );
      }
      return;
    }

    // step 3：反馈 → 完成一轮 & 记录
    if (cycleStep === 3) {
      appendMessage(
        "assistant",
        `很好，这就是一轮完整的「${getMainlineLabel(mainline)} × 行为改变飞轮」。\n\n你刚刚完成了：\n1）说出状态\n2）被温和承接\n3）做了一个极小的动作\n4）觉察了动作之后的感受\n\n我会把这一轮记录进成长日志，并生成一张结构卡，等你有空可以再回看。\n\n如果你愿意，我们可以：\n- 来第 2 轮（很轻）\n- 或者换一条主线继续。`,
        {
          typeLabel: "SUMMARY",
          typeClass: "summary",
          caption: "一轮完成 · 成长已记录",
        }
      );

      setTodayCycles((prev) => prev + 1);
      setWeekCycles((prev) => prev + 1);
      setTotalCycles((prev) => prev + 1);
      setCardCount((prev) => prev + 1);
      setCycleStep(0);
      return;
    }
  }

  function handleUserSubmit(text: string) {
    if (!text.trim()) return;
    appendMessage("user", text);
    handleAssistantReply(text);
  }

  const handleQuickClick = (text: string) => {
    handleUserSubmit(text);
  };

  const handleMainlineChange = (value: Mainline) => {
    setMainline(value);
    appendMessage(
      "assistant",
      `已切换到「${getMainlineLabel(value)}」。我会用这条主线来设计你接下来的循环。`,
      {
        typeLabel: "SYSTEM",
        typeClass: "system",
        caption: "主线切换提示",
      }
    );
  };

  return (
    <>
      <div className="wg-app">
        {/* 左侧：聊天主视角 */}
        <main className="wg-chat-panel">
          <header className="wg-chat-header">
            <div className="wg-chat-header-title">
              <span>Chat</span>
            </div>
            <div className="wg-badge">MVP · 行为改变飞轮</div>
          </header>

          <div className="wg-chat-messages" ref={chatMessagesRef}>
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  "wg-message-row " + (m.role === "user" ? "wg-user" : "wg-assistant")
                }
              >
                <div
                  className={
                    "wg-avatar " + (m.role === "user" ? "wg-avatar-user" : "wg-avatar-assistant")
                  }
                >
                  {m.role === "user" ? "J" : "W"}
                </div>
                <div className="wg-message-bubble">
                  {m.typeLabel && (
                    <div className="wg-message-meta">
                      <span
                        className={
                          "wg-message-type-pill " +
                          (m.typeClass ? `wg-type-${m.typeClass}` : "")
                        }
                      >
                        {m.typeLabel}
                      </span>
                      {m.caption && <span>{m.caption}</span>}
                    </div>
                  )}
                  <div>{m.text}</div>
                </div>
              </div>
            ))}
          </div>

          <footer className="wg-chat-input">

          <div className="wg-input-row">
            {/* 左侧 + 号按钮（暂时不做动作） */}
            <button
              type="button"
              className="wg-input-icon-btn wg-input-plus"
              aria-label="Add"
            >
              +
            </button>

            {/* 中间输入框 */}
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleUserSubmit(inputValue);
                  setInputValue("");
                }
              }}
              placeholder="询问任何问题"
            />

            {/* 麦克风图标（先占位） */}
            <button
              type="button"
              className="wg-input-icon-btn wg-input-mic"
              aria-label="Voice input"
            >
              🎤
            </button>

            {/* 发送按钮：黑色圆形 + 箭头 */}
            <button
              type="button"
              className="wg-input-send"
              aria-label="Send"
              onClick={() => {
                handleUserSubmit(inputValue);
                setInputValue("");
              }}
            >
              ↑
            </button>
          </div>

          </footer>
        </main>

        {/* 右侧：结构面板 */}
        <aside className="wg-side-panel">
          <div className="wg-side-scroll">
            <div className="wg-brand">
              <div className="wg-brand-logo">W</div>
              <div className="wg-brand-text">
                <div className="wg-brand-title">WiseGrow · MVP</div>
                <div className="wg-brand-subtitle">行为改变飞轮 · 控制室</div>
              </div>
            </div>

            {/* 当前状态 & 模式 */}
            <section className="wg-panel-section">
              <h3>🧠 当前状态 & 模式</h3>
              <div
                className={
                  "wg-pill " +
                  (mode === "green"
                    ? "wg-pill-green"
                    : mode === "yellow"
                    ? "wg-pill-yellow"
                    : "wg-pill-red")
                }
              >
                <span className="wg-pill-emoji">
                  {mode === "green" ? "🟢" : mode === "yellow" ? "🟡" : "🔴"}
                </span>
                <span>
                  {mode === "green"
                    ? "成长主路径模式"
                    : mode === "yellow"
                    ? "节奏修复模式"
                    : "承接模式"}
                </span>
              </div>
              <div className="wg-state-line">
                {mode === "green" &&
                  "当前状态：轻度专注 · 可以走机制主线。"}
                {mode === "yellow" &&
                  "当前状态：轻度疲劳 / 想逃避 · 适合来一轮温和修复。"}
                {mode === "red" &&
                  "当前状态：情绪在低谷 · 先被接住，再谈任务。"}
              </div>
            </section>

            {/* 今日循环进度 */}
            <section className="wg-panel-section">
              <h3>
                🔄 今日循环进度
                <span className="wg-inline-label">（第 {todayCycles} 轮）</span>
              </h3>
              <div className="wg-progress-steps">
                <div
                  className={
                    "wg-step-pill " +
                    (cycleStep > 0 ? "wg-step-done" : "wg-step-active")
                  }
                >
                  <span>🧠</span>
                  <span>状态识别</span>
                </div>
                <div
                  className={
                    "wg-step-pill " +
                    (cycleStep > 1
                      ? "wg-step-done"
                      : cycleStep === 1
                      ? "wg-step-active"
                      : "")
                  }
                >
                  <span>🌙</span>
                  <span>承接 / 中继</span>
                </div>
                <div
                  className={
                    "wg-step-pill " +
                    (cycleStep > 2
                      ? "wg-step-done"
                      : cycleStep === 2
                      ? "wg-step-active"
                      : "")
                  }
                >
                  <span>🔧</span>
                  <span>一步小动作</span>
                </div>
                <div
                  className={
                    "wg-step-pill " +
                    (cycleStep === 3 ? "wg-step-active" : "")
                  }
                >
                  <span>📌</span>
                  <span>反馈 & 记录</span>
                </div>
              </div>
            </section>

            {/* 今日成长记录 */}
            <section className="wg-panel-section">
              <h3>📘 今日成长记录</h3>
              <div className="wg-growth-stats">
                <div>
                  今日循环：<strong>{todayCycles}</strong> 次
                </div>
                <div>
                  本周累计：<strong>{weekCycles}</strong> 次
                </div>
                <div>
                  历史累计：<strong>{totalCycles}</strong> 次
                </div>
              </div>
              <div className="wg-link-inline">👉 查看完整记录（Demo）</div>
            </section>

            {/* 结构卡 */}
            <section className="wg-panel-section">
              <h3>📚 今日结构卡</h3>
              <div className="wg-card-list">
                <div className="wg-card-item">
                  <div className="wg-card-dot" />
                  <div>人际磁场 · 轻松表达卡</div>
                </div>
              </div>
              <div className="wg-card-count">
                📁 历史卡库（共 {cardCount} 张 · Demo）
              </div>
            </section>

            {/* 主线切换 */}
            <section className="wg-panel-section">
              <h3>🔀 主线切换</h3>
              <div className="wg-mainline-buttons">
                <button
                  className={
                    "wg-mainline-btn " +
                    (mainline === "relationship" ? "wg-mainline-active" : "")
                  }
                  onClick={() => handleMainlineChange("relationship")}
                >
                  <span className="wg-mainline-emoji">🟢</span>
                  <span>人际磁场（当前）</span>
                </button>
                <button
                  className={
                    "wg-mainline-btn " +
                    (mainline === "startup" ? "wg-mainline-active" : "")
                  }
                  onClick={() => handleMainlineChange("startup")}
                >
                  <span className="wg-mainline-emoji">💼</span>
                  <span>创业主线</span>
                </button>
                <button
                  className={
                    "wg-mainline-btn " +
                    (mainline === "emotion" ? "wg-mainline-active" : "")
                  }
                  onClick={() => handleMainlineChange("emotion")}
                >
                  <span className="wg-mainline-emoji">💗</span>
                  <span>情绪中继线</span>
                </button>
              </div>
            </section>
          </div>
        </aside>
      </div>

      {/* 样式：模仿 ChatGPT，右侧结构面板铺满并可滚动 */}
      <style jsx global>{`
  html,
  body {
    height: 100%;
  }

  body {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text",
      "Segoe UI", sans-serif;
    background: #f5f5f7; /* Apple 式窗口背景 */
    color: #111827;
  }

  .wg-app {
    display: flex;
    height: 100vh;
    max-width: 1200px;
    margin: 0 auto;
    background: radial-gradient(circle at top, #ffffff 0, #f5f5f7 55%);
    border-left: 1px solid #d2d2d7;
    border-right: 1px solid #d2d2d7;
  }

  /* 聊天主区域（左侧） */
  .wg-chat-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: radial-gradient(circle at top left, #ffffff 0, #f5f5f7 55%);
  }

  .wg-chat-header {
    padding: 10px 16px;
    border-bottom: 1px solid #d2d2d7;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    background: #f5f5f7;
  }

  .wg-chat-header-title {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .wg-chat-header-title span:nth-child(1) {
    font-size: 14px;
    font-weight: 600;
  }

  .wg-chat-header-title span:nth-child(2) {
    font-size: 11px;
    color: #6b7280;
  }

  .wg-badge {
    font-size: 11px;
    padding: 3px 7px;
    border-radius: 999px;
    border: 1px solid rgba(209, 213, 219, 0.8);
    color: #6b7280;
    background: #f9fafb;
  }

  .wg-chat-messages {
    flex: 1;
    padding: 14px 16px 16px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .wg-message-row {
    display: flex;
    gap: 8px;
    max-width: 720px;
  }

  .wg-message-row.wg-user {
    margin-left: auto;
    flex-direction: row-reverse;
  }

  .wg-avatar {
    width: 26px;
    height: 26px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    flex-shrink: 0;
  }

  .wg-avatar-assistant {
    background: radial-gradient(
      circle at 30% 20%,
      #d7f1ff,
      #7fb8ff 60%,
      #eef3ff 100%
    );
    color: #0369a1;
    box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.35);
  }

  .wg-avatar-user {
    background: radial-gradient(
      circle at 30% 20%,
      #ffe3c4,
      #f97316 70%
    );
    color: #7c2d12;
    box-shadow: 0 0 0 1px rgba(249, 115, 22, 0.35);
  }

  .wg-message-bubble {
    padding: 9px 11px;
    border-radius: 12px;
    font-size: 13px;
    line-height: 1.5;
    white-space: pre-wrap;
    word-wrap: break-word;
    background: #f2f2f7; /* Apple 气泡灰 */
    border: 1px solid #d2d2d7;
    box-shadow: 0 4px 8px rgba(15, 23, 42, 0.08);
    color: #111827;
  }

  .wg-message-row.wg-user .wg-message-bubble {
    border-color: #93c5fd;
    box-shadow: 0 4px 10px rgba(30, 64, 175, 0.18);
    background: #e0ebff;
  }

  .wg-message-meta {
    margin-bottom: 4px;
    font-size: 11px;
    color: #6b7280;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .wg-message-type-pill {
    padding: 2px 6px;
    border-radius: 999px;
    border: 1px solid rgba(209, 213, 219, 0.9);
    font-size: 10px;
    color: #6b7280;
    background: #ffffff;
  }

  .wg-type-system {
    border-color: rgba(56, 189, 248, 0.8);
    color: #0284c7;
  }

  .wg-type-action {
    border-color: rgba(34, 197, 94, 0.8);
    color: #16a34a;
  }

  .wg-type-mechanism {
    border-color: rgba(129, 140, 248, 0.9);
    color: #4f46e5;
  }

  .wg-type-identity {
    border-color: rgba(249, 115, 22, 0.8);
    color: #ea580c;
  }

  .wg-type-summary {
    border-color: rgba(148, 163, 184, 0.9);
    color: #4b5563;
  }

  .wg-chat-input {
    border-top: 1px solid #d2d2d7;
    padding: 8px 14px 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: linear-gradient(to top, #f5f5f7, #ffffff);
  }

  .wg-quick-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .wg-quick-btn {
    font-size: 11px;
    padding: 4px 8px;
    border-radius: 999px;
    border: 1px solid rgba(209, 213, 219, 0.9);
    background: #f2f2f7;
    color: #374151;
    cursor: pointer;
  }

  .wg-quick-btn:hover {
    border-color: rgba(56, 189, 248, 0.9);
  }

  /* 整条输入条：模仿 ChatGPT 的白色 pill */
.wg-input-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 2px;
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.06);
}

/* 中间输入框：透明、无边框，占满中间 */
.wg-input-row input {
  flex: 1;
  padding: 8px 0;
  border: none;
  border-radius: 0;
  background: transparent;
  color: #111827;
  font-size: 13px;
  outline: none;
}

.wg-input-row input::placeholder {
  color: #9ca3af;
}

/* 左侧 + 号 & 中间麦克风：小图标按钮 */
.wg-input-icon-btn {
  border: none;
  background: transparent;
  padding: 4px 6px;
  font-size: 14px;
  color: #111827;
  opacity: 0.6;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wg-input-icon-btn:hover {
  opacity: 1;
}

/* 发送按钮：黑色圆形 + 白色箭头 */
.wg-input-send {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: #111827;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  flex-shrink: 0;
}

.wg-input-send:active {
  transform: translateY(1px);
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.3);
}


  .wg-input-row button:active {
    transform: translateY(1px);
    box-shadow: 0 2px 6px rgba(22, 163, 74, 0.28);
  }

  /* 右侧结构面板 */
  .wg-side-panel {
    width: 320px;
    border-left: 1px solid #d2d2d7;
    background: #f5f5f7;
    display: flex;
    flex-direction: column;
  }

  .wg-side-scroll {
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
    height: 100%;
  }

  .wg-brand {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .wg-brand-logo {
    width: 26px;
    height: 26px;
    border-radius: 999px;
    background: radial-gradient(
      circle at 30% 20%,
      #34c759,
      #30b456 60%,
      #a5d8ff 100%
    );
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: 700;
    color: #ffffff;
    box-shadow: 0 0 0 2px rgba(52, 199, 89, 0.25);
  }

  .wg-brand-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .wg-brand-title {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .wg-brand-subtitle {
    font-size: 11px;
    color: #6b7280;
  }

  .wg-panel-section {
    border-radius: 12px;
    padding: 10px 10px;
    background: #ffffff;
    border: 1px solid rgba(210, 210, 215, 0.9);
  }

  .wg-panel-section h3 {
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .wg-inline-label {
    font-size: 11px;
    color: #6b7280;
  }

  .wg-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 8px;
    border-radius: 999px;
    font-size: 11px;
    border: 1px solid rgba(210, 210, 215, 0.9);
    background: #f5f5f7;
  }

  .wg-pill-emoji {
    font-size: 13px;
  }

  .wg-pill-green {
    border-color: rgba(52, 199, 89, 0.7);
    background: #e9fbeff5;
    color: #14532d;
  }

  .wg-pill-yellow {
    border-color: rgba(250, 204, 21, 0.8);
    background: #fefce8;
    color: #854d0e;
  }

  .wg-pill-red {
    border-color: rgba(239, 68, 68, 0.8);
    background: #fee2e2;
    color: #991b1b;
  }

  .wg-state-line {
    margin-top: 5px;
    font-size: 11px;
    color: #6b7280;
    line-height: 1.5;
  }

  .wg-progress-steps {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 4px;
  }

  .wg-step-pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 7px;
    border-radius: 999px;
    font-size: 10px;
    border: 1px solid rgba(210, 210, 215, 0.9);
    background: #f5f5f7;
    color: #6b7280;
    opacity: 0.9;
  }

  .wg-step-active {
    border-color: rgba(59, 130, 246, 0.9);
    background: #e0ebff;
    color: #1d4ed8;
    opacity: 1;
  }

  .wg-step-done {
    border-color: rgba(52, 199, 89, 0.8);
    background: #e4f9ec;
    color: #14532d;
    opacity: 1;
  }

  .wg-growth-stats {
    font-size: 11px;
    color: #4b5563;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .wg-growth-stats strong {
    color: #111827;
    font-weight: 600;
  }

  .wg-link-inline {
    margin-top: 4px;
    font-size: 11px;
    color: #2563eb;
    cursor: pointer;
  }

  .wg-link-inline:hover {
    text-decoration: underline;
  }

  .wg-card-list {
    font-size: 11px;
    color: #4b5563;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .wg-card-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .wg-card-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #38bdf8;
  }

  .wg-card-count {
    margin-top: 4px;
    font-size: 11px;
    color: #9ca3af;
  }

  .wg-mainline-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 4px;
  }

  .wg-mainline-btn {
    font-size: 11px;
    padding: 4px 8px;
    border-radius: 999px;
    border: 1px solid rgba(210, 210, 215, 0.9);
    background: #f5f5f7;
    color: #374151;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }

  .wg-mainline-emoji {
    font-size: 13px;
  }

  .wg-mainline-active {
    border-color: rgba(59, 130, 246, 0.9);
    background: #e0ebff;
    box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.3);
  }

  /* 滚动条 */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #f5f5f7;
  }
  ::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 999px;
  }

  @media (max-width: 900px) {
    .wg-app {
      max-width: 100%;
    }
    .wg-side-panel {
      display: none; /* 小屏只看聊天区 */
    }
  }
`}</style>

    </>
  );
}
