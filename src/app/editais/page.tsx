export default function EditaisPage() {
  // Dados mockados para exibição inicial
  const editais = [
    {
      id: 1,
      titulo: "Bolsa Permanência 2026",
      status: "Aberto",
      prazo: "30/04/2026",
      tipo: "Assistência",
    },
    {
      id: 2,
      titulo: "PIBIC - Iniciação Científica",
      status: "Em Análise",
      prazo: "Encerrado",
      tipo: "Pesquisa",
    },
    {
      id: 3,
      titulo: "Monitoria de Cálculo I",
      status: "Aberto",
      prazo: "15/05/2026",
      tipo: "Ensino",
    },
  ];

  return (
    <div className="flex flex-col flex-1 px-4 pt-8 pb-24 w-full h-full">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Editais 📄
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
          Acompanhe bolsas e oportunidades da UFCAT.
        </p>
      </header>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <button className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm font-medium whitespace-nowrap shadow-sm">
          Todos
        </button>
        <button className="px-4 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-full text-sm font-medium whitespace-nowrap">
          Assistência
        </button>
        <button className="px-4 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-full text-sm font-medium whitespace-nowrap">
          Pesquisa
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {editais.map((edital) => (
          <div
            key={edital.id}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-md">
                {edital.tipo}
              </span>
              <span
                className={`text-xs font-semibold ${
                  edital.status === "Aberto"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-amber-600 dark:text-amber-400"
                }`}
              >
                {edital.status}
              </span>
            </div>
            <h3 className="font-bold text-zinc-800 dark:text-zinc-100 mb-1">
              {edital.titulo}
            </h3>
            <p className="text-sm text-zinc-500 flex items-center gap-1">
              <span>⏳</span> Prazo: {edital.prazo}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
