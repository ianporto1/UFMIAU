export default function Home() {
  return (
    <div className="flex flex-col flex-1 px-4 pt-8 pb-20 max-w-md mx-auto w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-700 dark:text-blue-400 flex items-center gap-2">
          UFMIAU 🐾
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">
          Hub de Informações da UFCAT
        </p>
      </header>

      <section className="mb-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-2">Pergunte para a I.A</h2>
            <p className="text-sm text-blue-100 mb-4 opacity-90">
              O assistente virtual sabe os cardápios, editais e regras da faculdade.
            </p>
            <a href="/chat" className="inline-block bg-white text-blue-700 font-semibold py-2 px-4 rounded-xl shadow-sm text-sm active:scale-95 transition-transform">
              Abrir Chat 🤖
            </a>
          </div>
          {/* Abstract decoration */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl pointer-events-none"></div>
        </div>
      </section>

      <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-3 ml-1">Acesso Rápido</h3>
      <div className="grid grid-cols-2 gap-4">
        <a href="/editais" className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-4 rounded-2xl shadow-sm flex flex-col items-start active:bg-zinc-50 dark:active:bg-zinc-800 transition-colors">
          <span className="text-3xl mb-2">📄</span>
          <span className="font-semibold text-zinc-800 dark:text-zinc-100">Editais</span>
          <span className="text-xs text-zinc-500 mt-1">Bolsas e regras</span>
        </a>
        
        <a href="/ru" className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-4 rounded-2xl shadow-sm flex flex-col items-start active:bg-zinc-50 dark:active:bg-zinc-800 transition-colors">
          <span className="text-3xl mb-2">🍽️</span>
          <span className="font-semibold text-zinc-800 dark:text-zinc-100">R.U.</span>
          <span className="text-xs text-zinc-500 mt-1">Cardápio do dia</span>
        </a>
      </div>
    </div>
  );
}
