const {
    fetchResources,
    fetchExplanation,
    fetchScan,
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
        const explanation_response = await fetchExplanation(text);
        console.log(explanation_response);
        const { name, summary, explanation, keyValuePairs } = explanation_response;
        console.log(name);
        res.json({ name, summary, explanation, keyValuePairs });
    } catch (error) {
        res.status(500).send("Failed to fetch resources");
    }
};

exports.scan = async (req, res) => {
    const { text } = req.body;
    try {
        const scan_response = await fetchScan(text);
        console.log(scan_response);
        const { name, summary, keyValuePairs } = scan_response;
        res.json({ name, summary, keyValuePairs });
    } catch (error) {
        res.status(500).send("Failed to fetch resources");
    }
};
