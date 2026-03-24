"use client";

import { useState, useEffect } from "react";

type Documento = {
  id: string;
  conteudo: string;
  metadados: {
    titulo?: string;
    source?: string;
    created_at?: string;
  };
};

export default function AdminPage() {
  const [docs, setDocs] = useState<Documento[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // States do Formulário
  const [titulo, setTitulo] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchDocuments = async () => {
    try {
      const res = await fetch("/api/admin/documents");
      if (res.ok) {
        const data = await res.json();
        setDocs(data.documents || []);
      }
    } catch (error) {
      console.error("Erro ao buscar documentos", error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleEmbed = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !titulo.trim()) {
      setMessage("⚠️ Título e Conteúdo são obrigatórios.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/embed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, text }),
      });

      if (res.ok) {
        setMessage("✅ Conhecimento inserido na I.A com sucesso!");
        setTitulo("");
        setText("");
        fetchDocuments(); // Atualiza a lista
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

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este documento da Memória da I.A?")) return;

    try {
      const res = await fetch(`/api/admin/documents?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchDocuments();
      } else {
        alert("Erro ao deletar documento.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão ao deletar.");
    }
  };

  // Filtragem local dos documentos
  const filteredDocs = docs.filter(doc => {
    const term = searchTerm.toLowerCase();
    const docTitulo = (doc.metadados?.titulo || "").toLowerCase();
    const docConteudo = (doc.conteudo || "").toLowerCase();
    return docTitulo.includes(term) || docConteudo.includes(term);
  });

  return (
    <div className="flex flex-col flex-1 pt-4 sm:pt-8 pb-24 sm:pb-8 w-full h-full px-4 sm:px-0">
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Painel de Administração ⚙️
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base mt-1">
          Gerencie os serviços e a Biblioteca de Memória do assistente UFMIAU.
        </p>
      </header>

      <div className="flex flex-col gap-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Status Section */}
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm p-5 h-fit">
            <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <span>📡</span> Status de Serviços
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <div>
                  <p className="font-semibold text-zinc-800 dark:text-zinc-100">Biblioteca Virtual</p>
                  <p className="text-xs text-zinc-500">Módulo de empréstimo</p>
                </div>
                <div className="w-10 h-5 bg-zinc-200 dark:bg-zinc-700 rounded-full cursor-not-allowed hidden sm:block"></div>
                <span className="text-xs font-bold text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">Em Breve</span>
              </div>
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <div>
                  <p className="font-semibold text-zinc-800 dark:text-zinc-100">Notificações Push</p>
                  <p className="text-xs text-zinc-500">Avisos urgentes aos alunos</p>
                </div>
                <div className="w-10 h-5 bg-zinc-200 dark:bg-zinc-700 rounded-full cursor-not-allowed hidden sm:block"></div>
                <span className="text-xs font-bold text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">Em Breve</span>
              </div>
            </div>
          </section>

          {/* Form de Inserção na Memória */}
          <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 dark:from-indigo-900 dark:to-zinc-900 border border-indigo-200 dark:border-indigo-800 rounded-2xl overflow-hidden shadow-sm p-5 text-white lg:col-span-2 h-fit">
            <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
              <span>➕</span> Ensinar novo Conhecimento
            </h2>
            <p className="text-sm text-indigo-100 mb-4 opacity-90">
              Transforma o texto em vetores para o assistente responder perfeitamente no chat.
            </p>

            <form onSubmit={handleEmbed} className="space-y-3">
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Edital PIBIC 2026 - Regras Gerais"
                className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white transition text-sm"
                disabled={loading}
              />
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Cole o regimento, texto do edital ou informativos aqui..."
                className="w-full h-32 bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white transition text-sm resize-none"
                disabled={loading}
              />
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold h-4">
                  {message}
                </span>
                <button
                  type="submit"
                  disabled={loading || !text.trim() || !titulo.trim()}
                  className="bg-white text-indigo-700 font-bold px-4 py-2 rounded-xl text-sm active:scale-95 disabled:opacity-50 transition-transform"
                >
                  {loading ? "Vetorizando..." : "Inserir na Base"}
                </button>
              </div>
            </form>
          </section>
        </div>

        {/* Listagem da Biblioteca */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
              <span>📚</span> Biblioteca da Memória
            </h2>
            <input
              type="text"
              placeholder="Pesquisar conhecimentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:max-w-xs"
            />
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
            {filteredDocs.length === 0 ? (
              <p className="text-zinc-500 text-sm text-center py-8">
                {searchTerm ? "Nenhum documento encontrado." : "A biblioteca da Inteligência Artificial está vazia."}
              </p>
            ) : (
              filteredDocs.map((doc) => (
                <div key={doc.id} className="p-4 border border-zinc-100 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-zinc-800 dark:text-zinc-100 text-base mb-1">
                      {doc.metadados?.titulo || "Documento sem título"}
                    </h3>
                    <p className="text-xs text-zinc-500 mb-2">
                      Adicionado em: {doc.metadados?.created_at ? new Date(doc.metadados.created_at).toLocaleDateString("pt-BR") : "Data desconhecida"}
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                      {doc.conteudo}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="self-end sm:self-center px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900 rounded-lg text-xs font-bold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                  >
                    Excluir
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
