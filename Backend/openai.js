const OpenAI = require("openai")

async function summarize(html) {
	const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY })
    const today = new Date()

	const completion = await openai.chat.completions.create({
		messages: [
			{
				role: "system",
				content: `
				Tell me the title of this article. Summarize it and give me some key points.

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

    let message = await JSON.parse(completion.choices[0].message.content)
	return message
}


module.exports = { summarize }