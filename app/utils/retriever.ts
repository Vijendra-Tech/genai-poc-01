import { OpenAIEmbeddings } from "@langchain/openai"
import { createClient } from "@supabase/supabase-js"
// import { SupabaseVectorStore } from "langchain/vectorstores/supabase"
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase'

const sbApiKey = process.env.SUPERBASE_API_KEY
const sbUrl = process.env.SUPERBASE_URL
const openAIApiKey = process.env.OPEN_AI_KEY

const embeddings = new OpenAIEmbeddings({ openAIApiKey })

const client = createClient(sbUrl || '', sbApiKey || '')

const vectorstore = new SupabaseVectorStore(embeddings, {
    client,
    tableName: "documents",
    queryName: "match_documents"
})
const retriever = vectorstore.asRetriever()

export {retriever}