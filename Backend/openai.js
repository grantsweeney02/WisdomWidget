const OpenAI = require("openai")

async function summarize(html) {
	const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY })

	const completion = await openai.chat.completions.create({
		messages: [
			{
				role: "system",
				content: `
					Tell me the title of this article from the body of the HTML. Summarize the article and give me some detailed key points for studying.
	
					Output your message in the following JSON format:
					
					{
					  title: "",
					  summary: "",
					  key-points: [
						point: "",
						point: "",
						...
					  ]
					}`,
			},
			{
				role: "user",
				content: html,
			},
		],
		model: "gpt-3.5-turbo",
	})

	let message = completion.choices[0].message.content
	const startIdx = message.indexOf("{")
	const endIdx = message.lastIndexOf("}")
	message = message.slice(startIdx, endIdx + 1)
	messageJSON = await JSON.parse(message)
	return messageJSON
}

module.exports = { summarize }
