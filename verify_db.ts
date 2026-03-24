import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function test() {
  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing env vars");
    return;
  }
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase
    .from("ru_cache")
    .select("caption, url, timestamp")
    .eq("id", 1)
    .single();

  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Data:", data);
  }
}

test();
