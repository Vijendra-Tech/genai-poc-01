import WrappedComponent from '#app/components/wrapped-component.tsx'
import { textEmbedding } from '#app/utils/text.server.ts'
import React, { useState } from 'react'
import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, Link, useActionData, useRouteError, useSubmit } from '@remix-run/react'
import { Input } from '#@/components/ui/input.tsx';
import { Button } from '#@/components/ui/button.tsx';
import { FaqQA } from '#app/utils/faqv1.server.ts';
import ChatSection from '#app/components/chats/chat-section.tsx';
import { Angry, Mic } from 'lucide-react';
import { getNonNull } from '#app/utils/misc.tsx';
import { Textarea } from '#app/components/ui/textarea.tsx';
import { H4 } from '#app/components/typography.tsx';
import WrappedAnimation from '#app/components/wrapped-animation.tsx';
import { CallRecorder } from '#app/components/records/recorder.tsx';
import { AudioSubmitForm } from '#app/components/records/record-form.tsx';

// export async function loader() {
//     //  await textEmbedding()
//     return json({
//         ok: true
//     })
// }

export async function action({ request }: ActionFunctionArgs) {
    const requestText = await request.text();

    const form = new URLSearchParams(requestText);
    const formData = {
        //   audio: form.get("audio"),
        //   language: form.get("language"),
        //   audioUrl: form.get("audioUrl"),
        question: form.get('question')
    };
    const { question } = getNonNull(formData);
    try {
        const response = await FaqQA(question?.toString())
        if (response) {
            return json({
                response
            })
        }
    } catch (error) {
        console.log(error);
        return `llm/pocs/v2`
    }
}

function BankingPOCVersionTwo() {
    const [msg, setMsg] = useState<any>()
    const [audio, setAudio] = React.useState<Blob | null>(null);
    const [showRec, setShowRec] = useState<boolean>(false)
    const submit = useSubmit()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        setMsg(form.get('question'))
        submit(form, {
            method: 'POST'
        })
        e.currentTarget.reset();
    }
    const actionData = useActionData<typeof action>()
    return (
        <ChatSection userInput={msg ? msg : ""} botOuput={actionData?.response}>

            <div className='relative w-full'>
                {
                    showRec && (
                        <WrappedAnimation open={true}>
                            {
                                audio ? (<div className="bg-muted my-auto p-2">
                                    <AudioSubmitForm audio={audio} data={actionData} />
                                </div>) : (

                                    <div className="bg-muted my-auto p-2">
                                        <CallRecorder
                                            onRecordingComplete={(recording) => {
                                                setAudio(recording)

                                            }
                                            }
                                            team={"blue"}
                                        />
                                    </div>
                                )
                            }
                        </WrappedAnimation>
                    )
                }
                <Form onSubmit={handleSubmit}>
                    <Input placeholder='Ask/Click on Mic' name='question' className='' />
                    <Button className="absolute text-white font-bold bottom-0 right-0 " type='button'>
                        <Mic onClick={() => setShowRec(!showRec)} />
                    </Button>
                </Form>
            </div>
        </ChatSection>
    )

}

export default BankingPOCVersionTwo

export function ErrorBoundary() {
    const error = useRouteError();
    return (
        <div>
            <div className="flex justify-center bg-orange-400 items-center mt-80 w-full">
                <Angry size={'40px'} />
                <H4 as="p">{`Yikes... Something went wrong. Sorry about that.`}</H4>
                <H4 as="p" variant="secondary" className="mt-10">
                    {`Want to `}
                    <Link to=".">try again?</Link>
                </H4>
            </div>

        </div>
    );
}