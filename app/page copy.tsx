// app/page.tsx
import Image from "next/image";
import Link from "next/link";

/**
 * WiseGrow · 字节式大图滚动版首页
 * 放图位置：
 *  - public/visuals/hero.png        （第1屏：大楼+Logo 主视觉）
 *  - public/visuals/team.jpg        （第2屏：团队协作）
 *  - public/visuals/principles.jpg  （第3屏：大楼+Logo/制度感）
 */

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* 顶部导航：克制、稳重 */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
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
            <a href="#culture" className="hover:text-slate-900">企业文化</a>
            <a href="#principles" className="hover:text-slate-900">行为准则</a>
            <a href="#company" className="hover:text-slate-900">公司信息</a>
          </nav>

          <a
            href="https://wisegrow.cn"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:border-slate-300 hover:text-slate-900"
          >
            访问主站
          </a>
        </div>
      </header>


      {/* 第1屏：字节式大图 + 左上圆角白卡（提升明度与通透感） */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[calc(100vh-72px)] min-h-[640px]">

          {/* 全屏背景图 */}
          <img
            src="/visuals/hero.jpg"
            alt="WiseGrow Hero"
            className="absolute inset-0 h-full w-full object-cover object-[90%_20%]"
          />

          {/* 轻遮罩，只负责提升左侧可读性 */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/25 to-transparent" />

          {/* 内容层 */}
          <div className="relative z-10 mx-auto max-w-7xl h-full px-10 flex items-center">
            
            {/* 左侧安全区：锁死宽度 */}
            <div className="w-[38%] min-w-[360px]">
              <div className="rounded-3xl bg-white/80 backdrop-blur-sm p-8 shadow-sm">
                
                <div className="text-xs text-gray-500 tracking-wide">
                  使命
                </div>

                <h1 className="mt-3 text-4xl font-bold leading-tight text-gray-900">
                  更聪明的成长<br />
                  更稳定的长期判断
                </h1>

                <p className="mt-5 text-sm text-gray-600 leading-relaxed">
                  WiseGrow 是面向不确定时代的个人成长操作系统。
                  我们提供判断结构与长期稳定性，帮助你在复杂世界中持续做出不太差的选择。
                </p>

                <div className="mt-7 flex gap-3">
                  <a
                    href="/about"
                    className="rounded-lg bg-gray-900 px-5 py-2.5 text-white hover:bg-gray-800 transition text-sm"
                  >
                    了解我们
                  </a>
                  <a
                    href="/rules"
                    className="rounded-lg border border-gray-300 px-5 py-2.5 text-gray-700 hover:bg-gray-50 transition text-sm"
                  >
                    查看准则
                  </a>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>







      {/* 第2屏：企业文化（左文右图：团队欣欣向荣） }
      <section id="culture" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
                企业文化
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600">
                我们相信：当世界不再提供默认答案，个体必须拥有可持续的判断能力。
                WiseGrow 以结构化思考、路径引导与反馈机制，让成长不依赖情绪波动，
                而成为可重复、可复盘、可进化的过程。
              </p>

              <div className="mt-8 space-y-3 text-sm text-slate-600">
                <Bullet title="结构先于情绪" desc="先建立可解释结构，再谈策略与行动。" />
                <Bullet title="长期一致性" desc="不追短期热闹，更在意 10 年后是否仍正确。" />
                <Bullet title="共建与内化" desc="系统最终应被用户内化，而不是形成工具依赖。" />
              </div>
            </div>

            <div className="overflow-hidden rounded-[28px] border border-slate-200/70 bg-white shadow-sm">
              <div className="relative h-[360px] w-full md:h-[440px]">
                <Image
                  src="/visuals/team.jpg"
                  alt="WiseGrow Team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 第3屏：行为准则（左图右文：大楼+Logo / 制度感） */}
      <section id="principles" className="border-t border-slate-200/70 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="overflow-hidden rounded-[28px] border border-slate-200/70 bg-white shadow-sm">
              <div className="relative h-[360px] w-full md:h-[460px]">
                <Image
                  src="/visuals/principles.jpg"
                  alt="WiseGrow Principles"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
                行为准则
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600">
                我们相信，在长期建设中，诚信与结构严肃性发挥着关键作用。
                因此，我们制定了对内与对外一致的行为准则：
                不为了增长牺牲结构，不因融资改变本质，不把判断系统做成情绪产品。
              </p>

              <div className="mt-8 grid gap-4">
                <Principle
                  title="不为增长牺牲结构严肃性"
                  desc="结构是信任的来源。短期热闹不能透支长期可信。"
                />
                <Principle
                  title="不因融资改变产品本质"
                  desc="融资是工具，不是方向裁决权。"
                />
                <Principle
                  title="人必须退后，系统必须站前"
                  desc="把成长从意志力，迁移到结构、机制与反馈闭环。"
                />
              </div>

              <a
                href="#company"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900"
              >
                了解更多 <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 公司信息（Footer 前一屏，稳住） */}
      <section id="company" className="border-t border-slate-200/70 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                公司信息
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-slate-600">
                这是一个长期项目。我们不急于被理解。
              </p>
              <div className="mt-6 rounded-2xl border border-slate-200/70 bg-slate-50 p-4 text-sm text-slate-700">
                目的：给未来画一张饼，激励当下。
                <span className="text-slate-400">（但我们会用系统与纪律去兑现它。）</span>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-sm">
              <dl className="grid grid-cols-1 gap-4 text-sm">
                <Info label="品牌" value="WiseGrow" />
                <Info label="工商登记名" value="上海深长科技有限公司" />
                <Info label="域名" value="wisegrow.cn（主站）" />
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
            <a href="#culture" className="hover:text-slate-900">
              企业文化
            </a>
            <a href="#principles" className="hover:text-slate-900">
              行为准则
            </a>
            <a href="#company" className="hover:text-slate-900">
              公司信息
            </a>
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

function Bullet({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
      <div>
        <div className="font-medium text-slate-900">{title}</div>
        <div className="mt-1 text-slate-600">{desc}</div>
      </div>
    </div>
  );
}

function Principle({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-[22px] border border-slate-200/70 bg-white p-5 shadow-sm">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</div>
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
