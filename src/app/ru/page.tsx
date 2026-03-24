import { createClient } from "@supabase/supabase-js";
import InstagramEmbed from "./InstagramEmbed";

export const revalidate = 0; // Sempre buscar dados frescos

async function getRuMenu() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("[RU] Error: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing.");
    return { error: "Ambiente não configurado. Verifique o seu arquivo .env.local e reinicie o servidor (npm run dev)." };
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from("ru_cache")
      .select("caption, url, timestamp")
      .eq("id", 1)
      .single();

    if (error) {
      console.error("[RU] Supabase error:", JSON.stringify(error));
      return { error: `Erro na conexão com o banco de dados: ${error.message}` };
    }
    
    if (!data) {
      console.error("[RU] No data found in ru_cache with id 1");
      return { error: "Cardápio não encontrado no banco de dados." };
    }
    
    return { data };
  } catch (err: any) {
    console.error("[RU] Unexpected error:", err);
    return { error: `Erro inesperado: ${err.message || "Erro desconhecido"}` };
  }
}

export default async function RuPage() {
  const { data: menu, error } = await getRuMenu();

  return (
    <div className="flex flex-col flex-1 pt-4 sm:pt-8 pb-24 sm:pb-8 w-full h-full px-4 sm:px-0">
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          R.U UFCAT 🍽️
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base mt-2 leading-relaxed">
          {menu
            ? "Cardápio da semana sincronizado do Instagram oficial do Restaurante Universitário."
            : error || "No momento não foi possível sincronizar o cardápio da semana."}
        </p>
      </header>

      {!menu ? (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-6 rounded-2xl flex flex-col items-center justify-center border border-red-200 dark:border-red-900/50">
          <span className="text-4xl mb-4">⚠️</span>
          <p className="font-semibold text-center mb-2">{error || "Cardápio não encontrado"}</p>
          <p className="text-sm text-center mb-4 text-red-600 dark:text-red-300">
            {error ? "Houve um problema técnico ao buscar os dados." : "O post da semana pode não ter sido rastreado ainda."}
          </p>
          <a
            href="/chat"
            className="px-4 py-2 bg-white dark:bg-black rounded-xl font-bold border border-red-200 shadow-sm text-sm"
          >
            Perguntar à IA 🤖
          </a>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <div className="flex items-center justify-between w-full max-w-[540px]">
            <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold">
              Semana Atual
            </span>
            <a
              href={menu.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 font-semibold flex items-center gap-1 hover:underline"
            >
              Ver no Instagram <span className="text-sm">↗</span>
            </a>
          </div>

          <InstagramEmbed postUrl={menu.url} />
        </div>
      )}
    </div>
  );
}
