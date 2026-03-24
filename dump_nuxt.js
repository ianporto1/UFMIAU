const https = require("https");

const url = "https://ufcat.edu.br/editais";

https.get(url, (res) => {
  let data = "";
  res.on("data", (chunk) => {
    data += chunk;
  });
  res.on("end", () => {
    const match = data.match(/window\.__NUXT__=(.*?);<\/script>/);
    if (match) {
        let body = match[1];
        console.log("Found NUXT state. Parsing objects...");
        
        // Find all JSON-like objects in the string
        // Nuxt state is often a complex object literal
        // We can try to extract strings that look like "titulo", "slug", "data"
        const titles = body.match(/"titulo":"(.*?)"/g) || [];
        const slugs = body.match(/"slug":"(.*?)"/g) || [];
        const dates = body.match(/"data_publicacao":"(.*?)"/g) || body.match(/"criado_em":"(.*?)"/g) || [];
        
        console.log(`Summary: ${titles.length} titles, ${slugs.length} slugs, ${dates.length} dates.`);
        
        for (let i = 0; i < Math.max(titles.length, slugs.length, dates.length); i++) {
            console.log(`Item ${i}: T=${titles[i]} S=${slugs[i]} D=${dates[i]}`);
        }
    } else {
        console.log("NUXT state not found.");
    }
  });
}).on("error", (err) => {
  console.error("Error:", err.message);
});
