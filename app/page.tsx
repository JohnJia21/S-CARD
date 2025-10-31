export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-green-50">
      {/* 顶部 Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-24 pb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          🌱 让成长自然发生
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
          以结构为根，让每一步成长都顺势而为。
        </p>
        <a
          href="/intro"
          className="mt-8 inline-block rounded-full bg-green-600 text-white px-8 py-3 text-lg font-semibold hover:bg-green-700 transition"
        >
          开始探索
        </a>
      </section>

      {/* 痛点共鸣区 */}
      <section className="px-6 pb-6">
        <div className="max-w-5xl mx-auto rounded-3xl bg-white/70 shadow-sm ring-1 ring-black/5 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            你是否也有这些困扰？
          </h2>
          <p className="text-gray-600 mb-8">
            想成长，却总感觉用力过猛或方向不明——焦虑升高、效率下降、反馈稀薄。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "⏳",
                title: "节奏被打断",
                text: "工作与生活一搅和，计划三天打鱼两天晒网，难以持续。",
              },
              {
                icon: "🧩",
                title: "方法很碎片",
                text: "收藏很多“技巧”，却拼不成体系，越学越乱。",
              },
              {
                icon: "📉",
                title: "没有反馈回路",
                text: "做了不少事，但成效难以衡量，动力逐步流失。",
              },
              {
                icon: "📚",
                title: "信息过载",
                text: "教程/课程/文章塞满屏，真正需要的那一条总是找不到。",
              },
              {
                icon: "🧭",
                title: "方向不确定",
                text: "目标模糊、优先级反复横跳，时间投入不成线。",
              },
              {
                icon: "🔥",
                title: "短期主义陷阱",
                text: "被“速成”诱惑，难以沉淀长期可复用的能力资产。",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-2xl bg-white p-5 shadow hover:shadow-md transition"
              >
                <div className="text-2xl mb-2">{c.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800">{c.title}</h3>
                <p className="text-gray-600 mt-1">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 对位解决方案 */}
      <section className="px-6 pt-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            WiseGrow 给出的答案
          </h2>
          <p className="text-gray-600 mb-8">
            我们用「结构卡系统」把成长变成可视、可复用、可反馈的流程——顺势而为，而不是硬抗焦虑。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🌿",
                title: "自然节奏引擎",
                text: "以小步闭环为单位，帮你建立可持续的成长呼吸。",
              },
              {
                icon: "🧱",
                title: "结构卡方法论",
                text: "把模型/方法/判断/流程沉淀成卡，形成个人知识工厂。",
              },
              {
                icon: "🔁",
                title: "反馈仪表盘",
                text: "每张卡都有“应用→复盘→迭代”的闭环，成果可见。",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
              >
                <div className="text-2xl">{c.icon}</div>
                <h3 className="mt-3 text-lg font-semibold text-gray-800">{c.title}</h3>
                <p className="mt-1 text-gray-600">{c.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a
              href="/intro"
              className="inline-flex justify-center rounded-full bg-green-600 text-white px-6 py-3 font-semibold hover:bg-green-700 transition"
            >
              立即开始 · 让成长自然发生
            </a>
            <a
              href="/cases"
              className="inline-flex justify-center rounded-full bg-white text-gray-700 px-6 py-3 font-semibold shadow-sm ring-1 ring-black/5 hover:bg-gray-50 transition"
            >
              看看是如何做到的
            </a>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-500">
        © 2025 WiseGrow · 让成长自然发生
      </footer>
    </main>
  );
}
