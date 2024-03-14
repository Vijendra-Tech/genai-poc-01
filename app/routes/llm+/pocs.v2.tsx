import WrappedComponent from '#app/components/wrapped-component.tsx'
import { textEmbedding } from '#app/utils/text.server.ts'
import React, { useState } from 'react'
import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, useActionData, useSubmit } from '@remix-run/react'
import { Input } from '#@/components/ui/input.tsx';
import { Button } from '#@/components/ui/button.tsx';
import { FaqQA } from '#app/utils/faqv1.server.ts';
import ChatSection from '#app/components/chats/chat-section.tsx';
import { Mic } from 'lucide-react';
import { getNonNull } from '#app/utils/misc.tsx';

// export async function loader() {
//     //  await textEmbedding()
//     return json({
//         ok: true
//     })
// }

export async function action({ request }: ActionFunctionArgs) {
    // const formData = await request.formData()
    // const question = formData.get('question')
    // console.log();
     const requestText = await request.text();

    const form = new URLSearchParams(requestText);
     const formData = {
    //   audio: form.get("audio"),
    //   language: form.get("language"),
    //   audioUrl: form.get("audioUrl"),
     question:form.get('question')
    };
       const { question } = getNonNull(formData);
    try {
        const response = await FaqQA(question?.toString())
        console.log('response--', response);
        return json({
           response
        })
    } catch (error) {
        console.log(error);
        return `llm/pocs/v2`
    }
    // 
    // return json({
    //     response
    // })
    // return `llm/pocs/v2`
}

function BankingPOCVersionTwo() {
    const [msg, setMsg] = useState<any>()
    const submit = useSubmit()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        // const question = form.get('question')
        // try {
        //     const response = await FaqQA(question?.toString())
        //     setMsg(response)

        // } catch (error) {
        //     console.log(error);
        // }
        submit(form,{
            method:'POST'
        })
    }
    const actionData = useActionData<typeof action>()
    return (
        <WrappedComponent heading='POC V2'>
            {/* {actionData && 'response' in actionData && (
                <div>{actionData.response}</div>
            )} */}
            <ChatSection userInput={"I am asking question..."} botOuput={actionData?.response}>
                <div className='relative w-full'>
                    <Form onSubmit={handleSubmit}>
                        <Input placeholder='Ask Queries' name='question' />
                        <Button className="absolute text-white font-bold top-0 right-0 ">
                            <Mic />
                        </Button>
                    </Form>
                </div>
            </ChatSection>
        </WrappedComponent>
    )

}

export default BankingPOCVersionTwo