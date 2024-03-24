const cheerio = require("cheerio")
const { summarize } = require("../openai");

exports.openai = async (req, res) => {
    const { pageContent, url } = req.body

    const parsedHTML = parseHTML(pageContent)
    const summary = await summarize(parsedHTML)

    res.status(200).send(summary)
};