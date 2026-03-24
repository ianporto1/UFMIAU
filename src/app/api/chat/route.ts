import { embed, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Pegar a última mensagem do usuário para buscar o contexto no banco
    const lastMessage = messages[messages.length - 1];
    
    // Gerar o embedding da pergunta para buscar similaridade
    const { embedding } = await embed({
      model: openai.embedding("text-embedding-3-small"),
      value: lastMessage.content,
    });

    // Conectar no supabase
    const supabase = await createClient();

    // Executa a função match_documents criada nas migrations via Supabase RPC
    const { data: documents } = await supabase.rpc("match_documents", {
      query_embedding: embedding,
      match_threshold: 0.75, // Limite mínimo de similaridade (cosine similarity)
      match_count: 5 // Traz os top 5 resultados mais relevantes
    });

    // Construir o contexto em formato de string
    let contextText = "";
    if (documents && documents.length > 0) {
      contextText = documents.map((doc: any) => doc.conteudo).join("\n\n---\n\n");
    }

    const systemPrompt = `Você é o UFMIAU, o assistente virtual super inteligente da Universidade Federal de Catalão (UFCAT).
Você deve ser prestativo, ágil, e responder usando SEMPRE as informações da faculdade.
Sempre seja amigável, pois você é a "mascote" digital da universidade.
Use preferencialmente as informações de contexto abaixo para responder:

### INFORMAÇÕES DE CONTEXTO DO BANCO DE DADOS (MEMÓRIA): 
${contextText || "[A memória da I.A está vazia sobre este assunto, responda com cuidado ou diga que não possui a informação.]"}`;

    // Gerar stream de texto
    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages,
      temperature: 0.3,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Erro no chat", error);
    return new Response("Ocorreu um erro no servidor.", { status: 500 });
  }
}
