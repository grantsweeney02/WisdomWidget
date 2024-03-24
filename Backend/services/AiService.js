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
                content: `Given the following text, generate a name (which represents a title of the text and is 0-5 words long),
                generate a summary (which represents a brief overview of the text and is 10-20 words long), generate an explanation (which explans the text and is 20-40 words long), finally generate a key word for this text (2-4 words long).
                Then output to the format of the JSON below. The keyValuePair map will have one entry and it will be the Key Word mapped to the explanation.
                
                Output the data in a JSON file with the following format:
                {
                    name: "",
                    explanation: "",
                    summary: "",
                    keyValuePairs: [
                      Key Word: ""
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
    return await JSON.parse(response);
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
