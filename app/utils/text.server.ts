import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
// import * from '../assets/dummy.txt'
import { createClient } from '@supabase/supabase-js'
import { SupabaseVectorStore } from 'langchain/vectorstores/supabase'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { TextLoader } from "langchain/document_loaders/fs/text";
import { loadpdf } from './rag.server.ts';


export async function textEmbedding() {
    try {
        // const res = await fetch('dummy.txt')
        // const text = await res.text()
    //     const loader = new TextLoader('app/assets/dummy.txt')
    //    const text = await loader.load();
        const docs = await loadpdf()
        // console.log('text',docs);
        
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            separators: ['\n\n', '\n', ' ', '', '##'],
            chunkOverlap: 50
        })
        // Modify the code below to use the 'text' variable instead of directly passing the text
        const output = await splitter.splitDocuments(docs)
        console.log('output--',output);
        const sbApiKey = process.env.SUPERBASE_API_KEY
        const sbUrl = process.env.SUPERBASE_URL
        const openAIApiKey = process.env.OPEN_AI_KEY
        
        const client = createClient(sbUrl || '', sbApiKey || '')
        
        await SupabaseVectorStore.fromDocuments(output,
            new OpenAIEmbeddings({
                openAIApiKey,
            }),
            {
                client,
                tableName:'documents'
            }
            )

    } catch (error) {
        console.log(error);
    }
}

