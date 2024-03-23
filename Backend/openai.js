const OpenAI = require("openai")

async function model() {
	const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY })
    const today = new Date()

	const completion = await openai.chat.completions.create({
		messages: [
			{
				role: "system",
				content: "",
			},
			{
				role: "user",
				content: "",
			},
		],
		model: "gpt-3.5-turbo",
	})

    let message = completion.choices[0].message.content
	return message
}


module.exports = { model }