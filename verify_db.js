const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://ssxynhoamfjwfrhbmvea.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzeHluaG9hbWZqd2ZyaGJtdmVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNjUzMTksImV4cCI6MjA4OTk0MTMxOX0.GYDQzeWaJ8f8l6Umybc5o_CEflADY3RhtpNL0K01058";

async function test() {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase
    .from("ru_cache")
    .select("caption, url, timestamp")
    .eq("id", 1)
    .single();

  if (error) {
    console.error("Error:", JSON.stringify(error));
  } else {
    console.log("Data:", data);
  }
}

test();
