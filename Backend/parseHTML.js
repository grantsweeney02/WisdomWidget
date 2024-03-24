const cheerio = require("cheerio")

function scrapeHTML(htmlDocumentString) {
	const $ = cheerio.load(htmlDocumentString)
	$("script").remove()

	return $.text().replace(/\s\s+/g, " ").trim()
}

module.exports = { scrapeHTML }