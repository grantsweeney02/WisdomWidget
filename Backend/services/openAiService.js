const OpenAI = require("openai");

function parseResources(string) {
    const lines = string.split("\n");
    const stockMarketData = [];
    let currentObject = {};

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (/^\d+\.\s+Title:/.test(line)) {
            if (currentObject.title && currentObject.url) {
                stockMarketData.push(currentObject);
                currentObject = {};
            }
            currentObject.title = line.replace(/^\d+\.\s+Title:\s*/, "").trim();
        } else if (/^\s*URL:/.test(line)) {
            currentObject.url = line.replace("URL:", "").trim();
        }
    }
    // Push the last object if it exists
    if (currentObject.title && currentObject.url) {
        stockMarketData.push(currentObject);
    }

    return stockMarketData;
}

async function fetchResources(query) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: `List 5 trustworthy web resources related to the following text: "${query}". For each resource, provide a title and its corresponding URL`,
            },
            {
                role: "user",
                content: query,
            },
        ],
    });
    let message = completion.choices[0].message.content;
    console.log(message);
    const urls = parseResources(message);
    return urls;
}

module.exports = { fetchResources };
