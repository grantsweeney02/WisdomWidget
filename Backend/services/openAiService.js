const OpenAI = require("openai");

function parseResponseToTitledUrls(responseText) {
    // Split the response by newline to separate each resource listing
    const lines = responseText.split("\n");

    // Extract and structure titles and URLs from each line
    const titledUrls = lines
        .map((line) => {
            // Attempt to split the line at the first occurrence of ": "
            const splitIndex = line.indexOf(": ");
            if (splitIndex !== -1) {
                const title = line.substring(0, splitIndex).trim();
                const url = line.substring(splitIndex + 2).trim(); // Start after ": "
                return { title, url };
            }
            return null;
        })
        .filter((resource) => resource !== null); // Remove any lines that couldn't be parsed

    return titledUrls;
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
    const urls = parseResponseToTitledUrls(message);
    return urls;
}

module.exports = { fetchResources };
