export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-green-50 px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
        🌱 让成长自然发生
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
        以结构为根，让每一步成长都顺势而为。
      </p>

      <a
        href="/intro"
        className="rounded-full bg-green-600 text-white px-8 py-3 text-lg font-semibold hover:bg-green-700 transition"
      >
        开始探索
      </a>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl w-full">
        {[
          {
            title: "🌿 自然节奏",
            text: "成长不靠焦虑，而是顺势演进的节奏。",
          },
          {
            title: "🧱 结构系统",
            text: "用结构卡方法，让抽象能力具象化、系统化。",
          },
          {
            title: "💡 持续进化",
            text: "让系统陪你迭代，不断成为更聪明的自己。",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-2xl bg-white shadow-md p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{card.title}</h3>
            <p className="text-gray-600">{card.text}</p>
          </div>
        ))}
      </div>

      <footer className="mt-20 text-sm text-gray-400">
        © 2025 WiseGrow · 让成长自然发生
      </footer>
    </main>
  );
}
