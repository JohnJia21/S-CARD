// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Top Nav (ByteDance-like, clean & steady) */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/75 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            {/* Minimal mark */}
            <div className="relative h-8 w-8 rounded-xl bg-slate-900">
              <div className="absolute left-2 top-2 h-2 w-2 rounded-sm bg-white" />
              <div className="absolute left-2 top-5 h-1 w-4 rounded-sm bg-white/90" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">WiseGrow</div>
              <div className="text-xs text-slate-500">更聪明的成长</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
            <a href="#about" className="hover:text-slate-900">关于我们</a>
            <a href="#product" className="hover:text-slate-900">我们的产品</a>
            <a href="#insight" className="hover:text-slate-900">洞察</a>
            <a href="#principles" className="hover:text-slate-900">原则</a>
            <a href="#company" className="hover:text-slate-900">公司信息</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://wisegrow.cn"
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:border-slate-300 hover:text-slate-900"
              target="_blank"
              rel="noreferrer"
            >
              访问主站
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Soft gradients */}
        <div className="pointer-events-none absolute -left-48 -top-48 h-[520px] w-[520px] rounded-full bg-sky-100 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 -top-24 h-[520px] w-[520px] rounded-full bg-amber-100 blur-3xl" />

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
              面向不确定时代的个人成长操作系统
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              WiseGrow
              <span className="block text-slate-900/90">更聪明的长期成长系统</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
              为个体提供判断结构、成长路径与长期稳定性。
              不替你做决定，只帮你在复杂世界中持续做出不太差的选择。
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#product"
                className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
              >
                了解 WiseGrow
              </a>
              <a
                href="#insight"
                className="rounded-2xl border border-slate-200 bg-white/70 px-5 py-3 text-sm font-medium text-slate-700 hover:border-slate-300 hover:text-slate-900"
              >
                查看洞察
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 text-xs text-slate-500">
              <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4">
                <div className="text-slate-900">判断结构</div>
                <div className="mt-1">可解释、可复用</div>
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4">
                <div className="text-slate-900">路径设计</div>
                <div className="mt-1">跨阶段、可持续</div>
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4">
                <div className="text-slate-900">节奏复盘</div>
                <div className="mt-1">稳定输出与进化</div>
              </div>
            </div>
          </div>

          {/* Right visual (abstract system card) */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-lg rounded-[28px] border border-slate-200/70 bg-white/70 p-6 shadow-sm backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-900">系统视图</div>
                  <div className="mt-1 text-xs text-slate-500">宏观不确定性 × 个人稳定性</div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-slate-300" />
                  <span className="h-2 w-2 rounded-full bg-slate-300" />
                  <span className="h-2 w-2 rounded-full bg-slate-900" />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200/70 bg-white p-4">
                  <div className="text-xs text-slate-500">输入</div>
                  <div className="mt-2 text-sm font-medium text-slate-900">现实变化</div>
                  <div className="mt-1 text-xs text-slate-500">旧路径松动 / 新路径未立</div>
                </div>
                <div className="rounded-2xl border border-slate-200/70 bg-white p-4">
                  <div className="text-xs text-slate-500">输出</div>
                  <div className="mt-2 text-sm font-medium text-slate-900">稳定行动</div>
                  <div className="mt-1 text-xs text-slate-500">结构判断 / 节奏推进 / 复盘迭代</div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200/70 bg-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500">系统级原则</div>
                    <div className="mt-2 text-sm font-medium text-slate-900">人必须退后，系统必须站前</div>
                  </div>
                  <div className="h-10 w-10 rounded-2xl border border-slate-200 bg-white" />
                </div>
                <div className="mt-3 text-xs leading-relaxed text-slate-500">
                  不是靠意志力硬扛，而是靠结构与机制把成长变成可重复的过程。
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white p-4">
                <div>
                  <div className="text-xs text-slate-500">对外承诺</div>
                  <div className="mt-1 text-sm font-medium text-slate-900">不承诺结果，只承诺方法论的严谨性</div>
                </div>
                <div className="text-xs text-slate-400">v0.1</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: About / Insight */}
      <section id="about" className="border-t border-slate-200/70 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                我们看到的变化
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-slate-600">
                我们不是在追逐短期风口，而是在回应一个结构性事实：个人默认的人生路径正在消失。
                当不确定性成为常态，人真正缺的不是信息，而是一套可以长期依赖的判断与成长机制。
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-200/70 bg-slate-50 p-6">
              <div className="grid gap-4">
                <Card title="旧路径失效" desc="稳定职业 ≠ 长期安全；单一能力 ≠ 持续价值。" />
                <Card title="新路径未固化" desc="机会很多，但规则不透明、失败成本更高。" />
                <Card title="责任前置" desc="个体必须承担更长期的人生判断责任。" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Product */}
      <section id="product" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">WiseGrow 在做什么</h2>
            <p className="max-w-2xl leading-relaxed text-slate-600">
              我们做三件事（不多，也不扩）：判断结构、路径设计、节奏复盘。并且刻意划清边界：不替用户做决定，不提供确定答案，不承诺结果。
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">我们做的事</div>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                  <div>
                    <div className="font-medium text-slate-900">可解释的判断结构</div>
                    <div className="text-slate-600">让复杂问题可被拆解、校验与复用。</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                  <div>
                    <div className="font-medium text-slate-900">跨阶段的成长路径</div>
                    <div className="text-slate-600">让成长成为可持续的过程，而非短期冲动。</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                  <div>
                    <div className="font-medium text-slate-900">节奏与复盘机制</div>
                    <div className="text-slate-600">把稳定性与迭代能力装进日常动作里。</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">我们刻意不做的事</div>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                  <div>
                    <div className="font-medium text-slate-900">不替用户做决定</div>
                    <div className="text-slate-600">系统负责校验结构，人生由你自己负责。</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                  <div>
                    <div className="font-medium text-slate-900">不提供确定答案</div>
                    <div className="text-slate-600">我们提供参照系，而不是正确答案。</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                  <div>
                    <div className="font-medium text-slate-900">不承诺结果</div>
                    <div className="text-slate-600">只承诺方法论的严谨与长期一致性。</div>
                  </div>
                </li>
              </ul>
              <div className="mt-6 rounded-2xl border border-slate-200/70 bg-slate-50 p-4 text-sm text-slate-700">
                我们关注的不是“如何成功”，而是“如何在复杂世界中持续做出不太差的选择”。
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Insight (Macro curve, simplified) */}
      <section id="insight" className="border-t border-slate-200/70 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                不确定性响应
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-slate-600">
                WiseGrow 的需求强度与经济增长关系不大，而与社会不确定性强度相关。爆发可能出现，但我们不依赖持续爆发生存——更接近基础设施型产品的生命周期。
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs">
                <Pill>交叉混沌期：需求快速增强</Pill>
                <Pill>行为断裂期：承接爆发并守结构</Pill>
                <Pill>路径固化期：增速回落进入平台</Pill>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">宏观不确定性 × 系统需求（示意）</div>
              <div className="mt-4 rounded-2xl border border-slate-200/70 bg-slate-50 p-4">
                <div className="grid grid-cols-5 gap-2 text-[11px] text-slate-500">
                  {[
                    { k: "Ⅰ", t: "稳定期", d: "打基础" },
                    { k: "Ⅱ", t: "裂缝期", d: "验系统" },
                    { k: "Ⅲ", t: "交叉期", d: "立参照" },
                    { k: "Ⅳ", t: "断裂期", d: "承爆发" },
                    { k: "Ⅴ", t: "固化期", d: "守稳态" },
                  ].map((s) => (
                    <div key={s.k} className="rounded-xl border border-slate-200 bg-white p-3">
                      <div className="font-semibold text-slate-900">{s.k}</div>
                      <div className="mt-1 text-slate-600">{s.t}</div>
                      <div className="mt-1 text-slate-400">{s.d}</div>
                    </div>
                  ))}
                </div>

                {/* tiny curve */}
                <div className="mt-5">
                  <div className="h-28 rounded-2xl border border-slate-200 bg-white p-3">
                    <div className="relative h-full">
                      <div className="absolute inset-x-0 top-1/2 h-px bg-slate-100" />
                      <div className="absolute inset-y-0 left-0 w-px bg-slate-100" />
                      <svg viewBox="0 0 100 40" className="h-full w-full">
                        <path
                          d="M2 30 C 20 28, 35 26, 45 24 C 55 22, 62 16, 72 10 C 80 6, 86 8, 98 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-slate-900"
                        />
                      </svg>
                      <div className="absolute bottom-1 right-2 text-[11px] text-slate-400">示意曲线</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-xs leading-relaxed text-slate-500">
                  注：这是用于战略判断的结构图，而非对具体年份的预测。我们用结构触发条件决定节奏，而不是用日历。
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Principles */}
      <section id="principles" className="border-t border-slate-200/70 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                我们的原则
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-slate-600">
                我们选择一条更慢、但更稳的路。更在意 10 年后是否仍然正确，而不是 1 年内是否足够热闹。
              </p>
            </div>

            <div className="grid gap-4">
              <Principle
                title="不为增长牺牲结构严肃性"
                desc="结构是信任的来源。短期热闹不能透支长期可信。"
              />
              <Principle
                title="不因融资改变产品本质"
                desc="融资是工具，不是方向裁决权。"
              />
              <Principle
                title="不把判断系统做成情绪产品"
                desc="我们提供参照系与机制，而不是情绪依赖。"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section: Company */}
      <section id="company" className="border-t border-slate-200/70 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">公司信息</h2>
              <p className="mt-4 max-w-xl leading-relaxed text-slate-600">
                这是一个长期项目。我们不急于被理解。
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-sm">
              <dl className="grid grid-cols-1 gap-4 text-sm">
                <Info label="品牌" value="WiseGrow" />
                <Info label="工商登记名" value="上海深长科技有限公司" />
                <Info label="域名" value="wisegrow.cn（主站）" />
                <div className="rounded-2xl border border-slate-200/70 bg-slate-50 p-4 text-xs text-slate-600">
                  目的：给未来画一张饼，激励当下。
                  <span className="text-slate-400">（但我们会用系统与纪律去兑现它。）</span>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/70 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-slate-600">
            <span className="font-semibold text-slate-900">WiseGrow</span>
            <span className="mx-2 text-slate-300">/</span>
            上海深长科技有限公司
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <a href="#product" className="hover:text-slate-900">产品</a>
            <a href="#insight" className="hover:text-slate-900">洞察</a>
            <a href="#company" className="hover:text-slate-900">公司信息</a>
            <a
              href="https://wisegrow.cn"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm hover:border-slate-300"
            >
              wisegrow.cn
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white p-4">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</div>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-600">
      {children}
    </span>
  );
}

function Principle({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-sm">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-3 text-sm leading-relaxed text-slate-600">{desc}</div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white p-4">
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-medium text-slate-900">{value}</dd>
    </div>
  );
}
