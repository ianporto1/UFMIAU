import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Pegar a última mensagem do usuário para buscar o contexto no banco
    const lastMessage = messages[messages.length - 1];
    
    // Conectar no supabase
    const supabase = await createClient();

    // Exemplo: Buscar embedding contextualizado usando Edge Function/RPC no Supabase
    // Isso requer gerar o embedding da `lastMessage.content` primeiro.
    // Como simplificação da estrutura (setup inicial), passaremos um texto padrão de sistema:
    
    const systemPrompt = `Você é o UFMIAU, o assistente virtual super inteligente da Universidade Federal de Catalão (UFCAT).
Você deve ser prestativo, ágil, e responder usando sempre as informações da faculdade.
Sempre seja amigável, pois você é a "mascote" digital da universidade.`;

    // Gerar stream de texto usando o modelo GPT-4o-mini (rápido e barato para M.V.P)
    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages,
      temperature: 0.5,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Erro no chat", error);
    return new Response("Ocorreu um erro no servidor.", { status: 500 });
  }
}
