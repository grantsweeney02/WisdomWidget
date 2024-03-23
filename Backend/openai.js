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

//SAMPLE RETURN
// {
// 	"title": "Scaling up Software",
// 	"summary": "This article discusses the challenges of building larger, more complex software systems collaboratively. It emphasizes the difference between writing code for small assignments and developing enterprise systems that need to be maintained over time. The article also covers the importance of incremental development, avoiding ad hoc solutions, and preparing for the realities of industry software development.",
// 	"key-points": [
// 	  "Building large-scale software systems requires a different approach than smaller assignments typically encountered in introductory programming classes.",
// 	  "Enterprise software projects involve teams of programmers working over a long period to meet changing requirements.",
// 	  "Ad hoc solutions, common in small assignments, are not suitable for sustainable software development.",
// 	  "Preparing for industry software development involves mastering incremental development, testing, refactoring, design patterns, GUI development, and data management."
// 	]
// }

module.exports = { summarize }
