import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { OpenAI } from "openai";

const openAIApiKey = process.env.OPEN_AI_KEY
const llm = new ChatOpenAI({ openAIApiKey })

const model = new OpenAI({
    apiKey: openAIApiKey
})

export async function translateTo(content: string, lang: string) {
    const response = await model.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: `You are a helpful language translator. Please translate the following into ${lang}`
            },
            {
                role: 'user',
                content: content
            }
        ]
    })

    if (response) {
        return response.choices[0].message.content
    } else {
        return `Sorry! I am not able to translate into ${lang} language`
    }
}