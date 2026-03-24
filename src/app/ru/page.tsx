import Link from "next/link";

export const revalidate = 3600; // Recarrega a cada 1 hora em background (ISR)

async function getRuMenu() {
  try {
    const token = process.env.APIFY_TOKEN;
    
    // 1. Busca os detalhes da última execução para pegar o dataset ID
    const runRes = await fetch(`https://api.apify.com/v2/actor-runs/QXMUAfiXXnfvcH9Ng?token=${token}`);
    
    if (!runRes.ok) throw new Error("Falha ao acessar ator da Apify");
    const runData = await runRes.json();
    const datasetId = runData.data.defaultDatasetId;

    if (!datasetId) throw new Error("Dataset não encontrado");

    // 2. Busca os itens no dataset
    const datasetRes = await fetch(`https://api.apify.com/v2/datasets/${datasetId}/items?token=${token}`);
    if (!datasetRes.ok) throw new Error("Falha ao buscar itens do dataset");
    const items = await datasetRes.json();

    // 3. Filtra pelo primeiro post de Cardápio do RU
    const menuPost = items.find((item: any) => {
      if (!item.caption) return false;
      const cap = item.caption.toLowerCase();
      // Remove acentos para facilitar
      const normalizedCap = cap.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return normalizedCap.includes("cardapio") && normalizedCap.includes("ru");
    });

    if (!menuPost) {
      return null;
    }

    return {
      caption: menuPost.caption,
      url: menuPost.url,
      timestamp: menuPost.timestamp,
      images: menuPost.images || [], // sidecar (carrossel)
      displayUrl: menuPost.displayUrl, // fallback (imagem única)
    };

  } catch (error) {
    console.error("Erro no scraping do R.U:", error);
    return null;
  }
}

export default async function RuPage() {
  const menu = await getRuMenu();

  return (
    <div className="flex flex-col flex-1 pt-4 sm:pt-8 pb-24 sm:pb-8 w-full h-full px-4 sm:px-0">
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          R.U UFCAT 🍽️
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base mt-2 leading-relaxed">
          {menu 
            ? "O cardápio da semana foi sincronizado diretamente do Instagram oficial do Restaurante Universitário." 
            : "No momento, o aplicativo não conseguiu sincronizar o cardápio da semana."}
        </p>
      </header>

      {!menu ? (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-6 rounded-2xl flex flex-col items-center justify-center border border-red-200 dark:border-red-900/50">
          <span className="text-4xl mb-4">⚠️</span>
          <p className="font-semibold text-center mb-2">Cardápio não encontrado</p>
          <p className="text-sm text-center mb-4 text-red-600 dark:text-red-300">
            Pode ser que o post da semana não tenha sido rastreado ainda ou houve falha na conexão.
          </p>
          <a href="/chat" className="px-4 py-2 bg-white dark:bg-black rounded-xl font-bold border border-red-200 shadow-sm text-sm">
            Perguntar à Inteligência Artificial 🤖
          </a>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold w-fit">
              Semana Atual
            </span>
            <a href={menu.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 font-semibold flex items-center gap-1 hover:underline">
              Ver no Instagram <span className="text-sm">↗</span>
            </a>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 line-clamp-3">
            "{menu.caption}"
          </p>

          <h3 className="font-bold text-lg mt-2 text-zinc-800 dark:text-zinc-100">Deslize para ver as fotos:</h3>
          
          {/* Carrossel Nativo */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar cursor-grab active:cursor-grabbing">
            {menu.images && menu.images.length > 0 ? (
              menu.images.map((imgUrl: string, index: number) => (
                <div key={index} className="flex-none w-[85%] sm:w-[400px] snap-center first:pl-0">
                  <div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-md border border-zinc-200 dark:border-zinc-800 aspect-[4/5] relative">
                    <img 
                      src={imgUrl} 
                      alt={`Foto do cardápio ${index + 1}`}
                      className="object-cover w-full h-full"
                      loading={index === 0 ? "eager" : "lazy"}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold">
                      {index + 1} / {menu.images.length}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Fallback se não for carrossel, usar a displayUrl
              <div className="flex-none w-[85%] sm:w-[400px] snap-center">
                 <div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-md border border-zinc-200 dark:border-zinc-800 aspect-[4/5] relative">
                    <img 
                      src={menu.displayUrl} 
                      alt="Foto do cardápio"
                      className="object-cover w-full h-full"
                      referrerPolicy="no-referrer"
                    />
                 </div>
              </div>
            )}
            
            {/* Spacer extra no mobile para scroll parar alinhado */}
            <div className="flex-none w-4 sm:hidden"></div>
          </div>
          
        </div>
      )}
    </div>
  );
}
