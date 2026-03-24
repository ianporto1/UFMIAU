export default function Home() {
  return (
    <div className="flex flex-col flex-1 pt-4 sm:pt-8 pb-20 sm:pb-0 w-full">
      <header className="mb-8 hidden sm:block">
        <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          Dashboard
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">
          Bem-vindo de volta! Aqui está um resumo do que acontece na universidade hoje.
        </p>
      </header>
      {/* Fallback apenas para mobile */}
      <header className="mb-8 sm:hidden px-4">
        <h1 className="text-3xl font-extrabold text-blue-700 dark:text-blue-400 flex items-center gap-2">
          UFMIAU 🐾
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">
          Hub de Informações da UFCAT
        </p>
      </header>

      <section className="mb-8 px-4 sm:px-0">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-lg">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Pergunte para a I.A</h2>
            <p className="text-sm sm:text-base text-blue-100 mb-6 opacity-90">
              O assistente virtual sabe os cardápios, editais e regras da faculdade.
            </p>
            <a href="/chat" className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-xl shadow-sm text-sm sm:text-base active:scale-95 transition-transform">
              <span>Abrir Chat AI</span>
              <span className="text-lg">🤖</span>
            </a>
          </div>
          {/* Abstract decoration */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute top-10 right-20 w-32 h-32 bg-white opacity-5 rounded-full blur-xl pointer-events-none hidden sm:block"></div>
        </div>
      </section>

      <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-4 px-4 sm:px-0 text-lg sm:text-xl">Acesso Rápido</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-4 sm:px-0">
        <a href="/editais" className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-sm hover:shadow-md flex flex-col items-start active:bg-zinc-50 dark:active:bg-zinc-800 transition-all hover:-translate-y-1">
          <span className="text-3xl sm:text-4xl mb-3 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl">📄</span>
          <span className="font-bold text-zinc-800 dark:text-zinc-100 text-lg">Editais</span>
          <span className="text-sm text-zinc-500 mt-1">Bolsas e regras</span>
        </a>
        
        <a href="/ru" className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-sm hover:shadow-md flex flex-col items-start active:bg-zinc-50 dark:active:bg-zinc-800 transition-all hover:-translate-y-1">
          <span className="text-3xl sm:text-4xl mb-3 bg-orange-50 dark:bg-orange-900/20 p-3 rounded-xl">🍽️</span>
          <span className="font-bold text-zinc-800 dark:text-zinc-100 text-lg">R.U.</span>
          <span className="text-sm text-zinc-500 mt-1">Cardápio do dia</span>
        </a>
      </div>
    </div>
  );
}
