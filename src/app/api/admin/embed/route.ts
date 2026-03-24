import { openai } from "@ai-sdk/openai";
import { embed } from "ai";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      return new Response("Texto é obrigatório", { status: 400 });
    }

    // Usamos o text-embedding-3-small (rápido e barato) de 1536 dimensões
    const { embedding } = await embed({
      model: openai.embedding("text-embedding-3-small"),
      value: text,
    });

    const supabase = await createClient();

    // Insere no banco na tabela documentos_vetores (pgvector)
    const { error } = await supabase
      .from("documentos_vetores")
      .insert({
        conteudo: text,
        embedding: embedding,
        metadados: { source: "admin_manual_insert", created_at: new Date() },
      });

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro na vetorização", error);
    return new Response("Erro interno no servidor.", { status: 500 });
  }
}
