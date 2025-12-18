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
