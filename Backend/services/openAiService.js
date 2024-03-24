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
    const urls = parseResources(message);
    return urls;
}

async function fetchExplanation(query) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: `Given the following text, summarize it for me and give me a title. Additionally, create a list of key terms within the text along with their definitions.
                The title(name) should be around 5 words. The summary has around 20 words. The key term definitions should be around 20-40 words.
                keyValuePairs will only contains one entry which is the key word mapped to the explanation.
                keyValuePairs will can only have one extry.
                Output the data in a JSON file with the following format:
                {
                    name: "",
                    explanation: "",
                    summary: "",
                    keyValuePairs: [
                      Key Word: "",  // this can be name : explanation
                    ]
                }
                `,
            },
            {
                role: "user",
                content: query,
            },
        ],
    });
    const response = completion.choices[0].message.content;
    console.log(response);
    return JSON.parse(response);
}

async function fetchScan(query) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: `Given the following text, summarize it for me and give me a title. Additionally, create a list of key terms within the text along with their definitions.
                The title(name) should be around 5 words. The summary has around 20 words. The key term definitions should be around 20-40 words.
                Output the data in a JSON file with the following format:
                
                {
                  name: "",
                  summary: "",
                  keyValuePairs: [
                    "keyTerm": "",
                    "keyTerm": "",
                    ....
                  ]
                }`,
            },
            {
                role: "user",
                content: query,
            },
        ],
    });

    const response = completion.choices[0].message.content;
    const startIdx = response.indexOf("{");
    const endIdx = response.lastIndexOf("}");
    response2 = response.slice(startIdx, endIdx + 1);
    messageJSON = await JSON.parse(response2);
    return messageJSON;
}

module.exports = { fetchResources, fetchExplanation, fetchScan };
