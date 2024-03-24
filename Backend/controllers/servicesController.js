const {
    fetchResources,
    fetchExplanation,
} = require("../services/openAIService");

exports.searchResources = async (req, res) => {
    const { selectedText } = req.body;

    try {
        const resources = await fetchResources(selectedText);
        res.json({ resources });
    } catch (error) {
        res.status(500).send("Failed to fetch resources");
    }
};

exports.explain = async (req, res) => {
    const { text } = req.body;
    try {
        const explanation = await fetchExplanation(text);
        res.json({ explanation });
    } catch (error) {
        res.status(500).send("Failed to fetch resources");
    }
};
