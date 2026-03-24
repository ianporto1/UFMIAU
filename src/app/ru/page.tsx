export default function RUPage() {
  const menu = {
    data: "24 de Março, Terça-feira",
    almoco: {
      principal: "Iscas de Frango Aceboladas",
      vegetariano: "Grão de bico ao molho escuro",
      guarnicao: "Farofa de cenoura e bacon",
      salada: "Alface, tomate e pepino",
      sobremesa: "Doce de leite",
    },
    jantar: {
      principal: "Carne Moída com Batatas",
      vegetariano: "Escondidinho de PTS",
      guarnicao: "Purê de abóbora",
      salada: "Acelga e beterraba ralada",
      sobremesa: "Laranja",
    },
  };

  return (
    <div className="flex flex-col flex-1 px-4 pt-8 pb-24 w-full h-full">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          R.U UFCAT 🍽️
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
          Cardápio do dia: <span className="font-semibold">{menu.data}</span>
        </p>
      </header>

      <div className="flex flex-col gap-6">
        {/* Almoço */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-orange-50 dark:bg-orange-900/20 px-4 py-3 border-b border-orange-100 dark:border-orange-900/30 flex justify-between items-center">
            <h2 className="font-bold text-orange-800 dark:text-orange-400 flex items-center gap-2">
              <span>☀️</span> Almoço (11:00 às 13:30)
            </h2>
          </div>
          <div className="p-4 space-y-3">
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-0.5">Principal</p>
              <p className="text-zinc-800 dark:text-zinc-200 font-medium">{menu.almoco.principal}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-0.5">Opção Vegetariana 🥬</p>
              <p className="text-zinc-800 dark:text-zinc-200 font-medium">{menu.almoco.vegetariano}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-0.5">Guarnição</p>
              <p className="text-zinc-800 dark:text-zinc-200 font-medium">{menu.almoco.guarnicao}</p>
            </div>
          </div>
        </section>

        {/* Jantar */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 px-4 py-3 border-b border-indigo-100 dark:border-indigo-900/30 flex justify-between items-center">
            <h2 className="font-bold text-indigo-800 dark:text-indigo-400 flex items-center gap-2">
              <span>🌙</span> Jantar (17:30 às 19:30)
            </h2>
          </div>
          <div className="p-4 space-y-3">
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-0.5">Principal</p>
              <p className="text-zinc-800 dark:text-zinc-200 font-medium">{menu.jantar.principal}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-0.5">Opção Vegetariana 🥬</p>
              <p className="text-zinc-800 dark:text-zinc-200 font-medium">{menu.jantar.vegetariano}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-0.5">Guarnição</p>
              <p className="text-zinc-800 dark:text-zinc-200 font-medium">{menu.jantar.guarnicao}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
