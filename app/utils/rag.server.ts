
import { HumanMessage } from "@langchain/core/messages";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
//@ts-ignore
import * as parse from "pdf-parse";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RunnableSequence } from "@langchain/core/runnables";
import { Document } from "@langchain/core/documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableMap } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";

// const embeddings = new OpenAIEmbeddings({
//     openAIApiKey: process.env.OPEN_AI_KEY
// });

// const model = new ChatOpenAI({
//     modelName: "gpt-3.5-turbo-1106",
//     openAIApiKey: process.env.OPEN_AI_KEY
// });

// const vectorstore = new MemoryVectorStore(embeddings);

// export async function ragInit() {
//     const docs = await loadpdf();
//     const splitter = splilitter();
//     let solittedDocs;
//     if (docs) {
//         solittedDocs = await splitter.splitDocuments(docs);
//         await vectorstore.addDocuments(solittedDocs);
//         // const retrievedDocs = await vectorstore.similaritySearch(
//         //     "What is Online Banking?",
//         //     4
//         // );  
//         const retriever = vectorstore.asRetriever();
//         // const res = await retriever.invoke("Who can use Online Banking?")
//         // console.log(res);
//         // return res
//         const convertDocsToString = (documents: Document[]): string => {
//             return documents.map((document) => {
//                 return `<li>\n${document.pageContent}\n</li>`
//             }).join("\n");
//         };
//         const documentRetrievalChain = RunnableSequence.from([
//             (input) => input.question,
//             retriever,
//             convertDocsToString
//         ]);
//         const results = await documentRetrievalChain.invoke({
//             question: "Who can use Online Banking?"
//         });
//         // console.log(results);
//         const TEMPLATE_STRING = `You are an experienced researcher, 
//         expert at interpreting and answering questions based on provided sources.
//         Using the provided context, answer the user's question 
//         to the best of your ability using only the resources provided. 
//         Be verbose!

//         <context>

//         {context}

//         </context>

//         Now, answer this question using the above context:

//         {question}`;

//         const answerGenerationPrompt = ChatPromptTemplate.fromTemplate(
//             TEMPLATE_STRING
//         );
//         const runnableMap = RunnableMap.from({
//             context: documentRetrievalChain,
//             question: (input: any) => input.question,
//         });

//         await runnableMap.invoke({
//             question: "Who can use Online Banking?"
//         })
//         const retrievalChain = RunnableSequence.from([
//             {
//                 context: documentRetrievalChain,
//                 question: (input) => input.question,
//             },
//             answerGenerationPrompt,
//             model,
//             new StringOutputParser(),
//         ]);
//         // const answer = await retrievalChain.invoke({
//         //     question: "What are the prerequisites for this course?"
//         // });

//         // console.log(answer);
//         const docsRes = await documentRetrievalChain.invoke({
//             question: "Can you list them in bullet point form?"
//         });

//         console.log(docsRes);
//         return docsRes
//     }
// }

export async function loadpdf() {
    const loader = new PDFLoader('app/assets/faq.pdf')
    const docs = await loader.load();
    return docs
}


//  function splilitter() {
//     const splitter = new RecursiveCharacterTextSplitter({
//         chunkSize: 1536,
//         chunkOverlap: 128,
//     });
//     return splitter
// }
