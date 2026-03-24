import { createClient } from "@/utils/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // Busca apenas id e metadados (onde está o título e a data) e conteúdo
    // Sem buscar o vetor para ser leve
    const { data, error } = await supabase
      .from("documentos_vetores")
      .select("id, conteudo, metadados")
      .order("id", { ascending: false });

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify({ documents: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao listar documentos", error);
    return new Response(JSON.stringify({ error: "Erro interno no servidor." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response("ID é obrigatório", { status: 400 });
    }

    const supabase = await createClient();

    const { error } = await supabase
      .from("documentos_vetores")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao deletar documento", error);
    return new Response(JSON.stringify({ error: "Erro interno no servidor." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
