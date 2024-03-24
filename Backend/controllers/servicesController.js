const cheerio = require("cheerio");
const { summarize } = require("../openai");
const { searchWebResources } = require("../services/openAiService");

exports.openai = async (req, res) => {
    const { pageContent, url } = req.body;

    const parsedHTML = parseHTML(pageContent);
    const summary = await summarize(parsedHTML);

    res.status(200).send(summary);
};

exports.searchResources = async (req, res) => {
    const { selectedText } = req.body;

    try {
        const resources = await searchWebResources(selectedText);
        res.json({ resources });
    } catch (error) {
        res.status(500).send("Failed to fetch resources");
    }
};
