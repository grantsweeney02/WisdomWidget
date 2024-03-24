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

function parseExplanation(response) {
    const parts = response.split("\n\n");
    const result = {};
    parts.forEach((part) => {
        if (part.startsWith("Title:")) {
            result["name"] = part.replace("Title:", "").trim();
        } else if (part.startsWith("Explanation:")) {
            result["explanation"] = part.replace("Explanation:", "").trim();
        } else if (part.startsWith("Summary:")) {
            result["summary"] = part.replace("Summary:", "").trim();
        } else if (part.startsWith("Key Word:")) {
            result["keyword"] = part.replace("Key Word:", "").trim();
        }
    });
    const keyValuePairs = {};
    if (result.keyword && result.explanation) {
        keyValuePairs[result.keyword] = result.explanation;
    }
    result.keyValuePairs = keyValuePairs;
    delete result.keyword;
    return result;
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
                content: `Given the following text: "${query}"\n\nPlease respond with 4 parts. 1. Write a detailed explanation.\n2. Provide a suitable title.\n3. Summarize the text.\n4. Create a "Key Word"\nThe title should be a few words the summary should be about 20 words and the explanation can be 40 words. The key Word should be 2-3 words. I need "Title", "Summary", "Explanation", and "Key Word"`,
            },
            {
                role: "user",
                content: query,
            },
        ],
    });
    const response = completion.choices[0].message.content;
    console.log(response);
    return parseExplanation(response);
}

module.exports = { fetchResources, fetchExplanation };
