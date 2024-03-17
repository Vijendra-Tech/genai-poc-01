import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '#@/components/ui/card.tsx'
import { Input } from '#@/components/ui/input.tsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#@/components/ui/tabs.tsx'
import React from 'react'
import { H4 } from './typography.tsx'
import { Button } from '#@/components/ui/button.tsx'
import FaqSheet from './faq-sheet.tsx'
import { Link, useLoaderData } from '@remix-run/react'
import { GitBranchPlus, Github, GithubIcon } from 'lucide-react'
import 'react-link-previewer/src/style.css'
import { LinkPreview } from 'react-link-previewer'
import { loadgithubFiles } from '#app/utils/code.server.ts'
import { json } from '@remix-run/node'

const technologies = [
    'Remix',
    'React',
    'Tailwind CSS',
    'Node',
    'Express',
    'Open AI',
    'Langchain',
    'Superbase',
    'Shadcn/ui',
    'lucide icon',
    'react-pdf',
]

// export async function loader() {
//     const codes = await loadgithubFiles()
//     console.log('=========',codes);

//     if(codes){

//       return json({
//          codes
//       })
//     }else{
//         return json({
//            codes:[]
//         })
//     }
// }

function TabSection({ codes }: any) {
    // const data =  useLoaderData<typeof loader>()
    return (
        <Tabs defaultValue="poc" className="w-[700px] mt-16">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="poc">POC</TabsTrigger>
                <TabsTrigger value="tech">Tech Stack</TabsTrigger>
                <TabsTrigger value="source">Source</TabsTrigger>
            </TabsList>
            <TabsContent value="poc">
                <Card>
                    <CardContent className="space-y-2">
                        <H4>POC 1</H4>
                        <ol>
                            <li>
                                Speech to Speech chat interface
                            </li>
                            <li>
                                user will speak/ask question
                            </li>
                            <li>
                                RAG approach to get information from HSBC faq
                            </li>
                            <li>
                                Text to Voice to answer user
                            </li>
                            <li>
                                Translation also needs to be supported e.g. a user can ask question in English, Hindi, Telugu, Tamil, Kannada, Malayalam, Bengali your chatbot should answer in the same language
                            </li>
                            <li>
                                User can select a language from Dropdown on UI
                            </li>
                        </ol>
                        <div>
                            {/* <Button type='button' variant={'default'}>Hsbc FAQ</Button> */}
                            <FaqSheet />
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="tech">
                <Card>
                    <CardHeader>
                        <CardTitle>Tech Stack</CardTitle>
                        <CardDescription>
                            It is not complete list.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <ol>
                            {
                                technologies.map((el, index) => (
                                        <li key={index} className='w-full bg-white rounded-md h-11 mx-2 my-2 px-2 py-2'>{el}</li>
                                ))
                            }
                        </ol>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="source">
                <Card>
                    <CardHeader>
                        <CardTitle>GitHub</CardTitle>
                        <CardDescription>
                            Source codes Link
                            <Link to={'https://github.com/Vijendra-Tech/genai-poc-01'} target='_blank'>
                                <Github className='float-end' />
                            </Link>
                            {/* <LinkPreview
                                external={true} // open external resource in the new tab. default: false    
                                href="https://github.com/Vijendra-Tech/genai-poc-01" // link you want to preview
                                // host="https://og-service.herokuapp.com" // optional custom link data fetching endpoint
                                
                            /> */}
                            {/* <p className='text-black'>{codes?.length}</p> */}
                            {
                                <ul>
                                    {codes?.map((document:any, index:number) => (
                                        <li key={index}>
                                            <h2>Source: {document.metadata.source}</h2>
                                            <p>Page Content: {document.pageContent}</p>
                                        </li>
                                    ))}
                                </ul>
                            }
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}

export default TabSection