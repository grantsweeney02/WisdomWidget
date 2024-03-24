const { Configuration, OpenAIApi } = require("openai");

const openAiApiKey = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
    apiKey: openAiApiKey,
});
const openai = new OpenAIApi(configuration);

async function searchWebResources(query) {
    const prompt = `List 5 trustworthy web URLs that can be resources related to the following block of code or text: ${query}
    The response should simply be 5 links`;

    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 100,
            temperature: 0.5,
        });
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error("Error in calling OpenAI API:", error);
        throw error;
    }
}

module.exports = { searchWebResources };
