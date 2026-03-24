"use client";

import { useState } from "react";

export default function AdminPage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmbed = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/embed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (res.ok) {
        setMessage("✅ Conhecimento inserido na I.A com sucesso!");
        setText("");
      } else {
        setMessage("❌ Erro ao adicionar conhecimento.");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 pt-4 sm:pt-8 pb-24 sm:pb-8 w-full h-full px-4 sm:px-0">
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Painel de Administração ⚙️
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base mt-1">
          Gerencie os serviços e a memória do assistente UFMIAU.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Section */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm p-5">
          <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-4 flex items-center gap-2">
            <span>📡</span> Status de Serviços
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div>
                <p className="font-semibold text-zinc-800 dark:text-zinc-100">Biblioteca Virtual</p>
                <p className="text-xs text-zinc-500">Módulo de empréstimo (Em breve)</p>
              </div>
              <div className="w-10 h-5 bg-zinc-200 dark:bg-zinc-700 rounded-full cursor-not-allowed"></div>
            </div>
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div>
                <p className="font-semibold text-zinc-800 dark:text-zinc-100">Notificações Push</p>
                <p className="text-xs text-zinc-500">Avisos urgentes aos alunos (Em breve)</p>
              </div>
              <div className="w-10 h-5 bg-zinc-200 dark:bg-zinc-700 rounded-full cursor-not-allowed"></div>
            </div>
          </div>
        </section>

        {/* Bot Memory Manager */}
        <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 dark:from-indigo-900 dark:to-zinc-900 border border-indigo-200 dark:border-indigo-800 rounded-2xl overflow-hidden shadow-sm p-5 text-white">
          <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
            <span>🧠</span> Memória do BOT (Vetores)
          </h2>
          <p className="text-sm text-indigo-100 mb-4 opacity-90">
            Cole regras, informativos ou editais aqui. O texto será transformado em vetores (embeddings) para que o assistente responda corretamente no chat.
          </p>

          <form onSubmit={handleEmbed} className="space-y-3">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Cole o conhecimento aqui..."
              className="w-full h-32 bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white transition text-sm resize-none"
              disabled={loading}
            />
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold h-4">
                {message}
              </span>
              <button
                type="submit"
                disabled={loading || !text.trim()}
                className="bg-white text-indigo-700 font-bold px-4 py-2 rounded-xl text-sm active:scale-95 disabled:opacity-50 transition-transform"
              >
                {loading ? "Processando..." : "Inserir na I.A"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
