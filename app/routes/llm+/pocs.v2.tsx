import WrappedComponent from '#app/components/wrapped-component.tsx'
import { textEmbedding } from '#app/utils/text.server.ts'
import React, { useEffect, useState } from 'react'
import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, Link, useActionData, useRouteError, useSubmit } from '@remix-run/react'
import { Input } from '#@/components/ui/input.tsx';
import { Button } from '#@/components/ui/button.tsx';
import { FaqQA } from '#app/utils/faqv1.server.ts';
import ChatSection from '#app/components/chats/chat-section.tsx';
import { Angry, MessageCircleCodeIcon, Mic } from 'lucide-react';
import { getErrorForAudio, getErrorForLanguage, getNonNull, translateFrom } from '#app/utils/misc.tsx';
import { Textarea } from '#app/components/ui/textarea.tsx';
import { H3, H4 } from '#app/components/typography.tsx';
import WrappedAnimation from '#app/components/wrapped-animation.tsx';
import { CallRecorder } from '#app/components/records/recorder.tsx';
import { AudioSubmitForm, RecordingFormData } from '#app/components/records/record-form.tsx';
import botImg from '../../assets/voice-bot.png'
import AssistentImage from '#app/components/assistent-image.tsx';
import AiDesc from '#app/components/ai-desc.tsx';
import { audioTotext, readFileAsBlob, textSpeech } from '#app/utils/llms.server.ts';
import { translateTo } from '#app/utils/translation.server.ts';
import { Skeleton } from '#@/components/ui/skeleton.tsx';
import { BotSkelton, UserSkeleton } from '#app/components/ui/skelton-bot.tsx';
import Workflow from '#app/components/ui/workflow.tsx';
import { useMachine } from "@xstate/react";
import { assign, createMachine, send as sendUtil } from "xstate";

type ActionData = RecordingFormData;

export async function action({ request }: ActionFunctionArgs) {
    const requestText = await request.text();
    const actionData: ActionData = { fields: {}, errors: {} };
    const form = new URLSearchParams(requestText);
    const formData = {
        audio: form.get("audio"),
        language: form.get("language"),
        //   audioUrl: form.get("audioUrl"),
        question: form.get('question') ?? ''
    };
    actionData.fields = {
        language: formData.language,
        question: formData.question
    };

    actionData.errors = {
        audio: getErrorForAudio(formData.audio),
        language: getErrorForLanguage(formData.language),
    };

    if (Object.values(actionData.errors).some((err) => err !== null)) {
        return json(actionData, 401);
    }
    const { question, audio, language } = getNonNull(formData);
    try {
        const textAsk = await audioTotext(audio, language);
        if (typeof textAsk === 'string') {
            const TxtResponse = await FaqQA(textAsk)
            if (TxtResponse) {
                const translatedTxt = await translateTo(TxtResponse, language)

                if (translatedTxt !== null) {
                    await textSpeech(translatedTxt);
                }
                const fileBlob = await readFileAsBlob("");
                return json({ audio, fileBlob });
            }
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
    const [openChatWindow, setOpenChatWindow] = useState(false);
    const actionData = useActionData<typeof action>()
    //manage workfloe steps
    const [stages, setStages] = useState<any>({
        one: false,
        two: false,
        three: false,
        four: false
    })

    useEffect(() => {
        let timer: any
        if (stages.one) {
            timer = setTimeout(() => {
                setStages((prev: any) => ({
                    ...prev,
                    two: true,
                    three:true
                }))
            }, 2000)
        }
        return () => clearInterval(timer)
    }, [stages])

    useEffect(() => {
        if (actionData?.fileBlob) {
            setStages((prev: any) => ({
                ...prev,
                four: true
            }))

        }
    }, [actionData?.fileBlob])

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

    return (
        <div className='container w-full flex flex-row justify-center'>
            <div className='flex items-center space-x-3'>
            </div>
            {
                openChatWindow ? (
                    <>
                        <div className='bg-white w-1/4 text-black h-[720px] flex justify-center ml-64 rounded-l-3xl fixed top-44'>
                            <Workflow stages={stages} data={actionData}/>
                        </div>
                        <ChatSection userInput={actionData?.audio} botOuput={actionData?.fileBlob} stages={stages} >
                            <div className='relative w-full'>
                                {
                                    showRec && (
                                        <WrappedAnimation open={true}>
                                            {
                                                audio ? (<div className="bg-muted p-2">
                                                    <AudioSubmitForm audio={audio} data={actionData} reset={setAudio} setStages={setStages}/>
                                                </div>) : (
                                                    <div
                                                        style={{
                                                            overflowY: "auto",
                                                            scrollbarWidth: "thin",
                                                            scrollbarColor: "var(--scrollbar-thumb) var(--scrollbar-track)",
                                                            // aspectRatio: "3/2",
                                                            maxHeight: '200px'
                                                        }}
                                                    >
                                                        <div className="bg-muted my-auto p-2">
                                                            <CallRecorder
                                                                onRecordingComplete={(recording) => {
                                                                    setAudio(recording)

                                                                }
                                                                }
                                                                team={"blue"}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </WrappedAnimation>

                                    )
                                }
                                {/* <div className='relative'> */}
                                <div className='fixed bottom-0 w-1/4 top-[50rem] pr-14'>
                                    <Form onSubmit={handleSubmit}>
                                        <Input placeholder='Ask/Click on Mic' name='question' className='' disabled />
                                        <Button className="text-white font-bold fixed right-0 mr-16 -mt-9" type='button'>
                                            <Mic onClick={() => setShowRec(!showRec)} />
                                        </Button>
                                    </Form>
                                </div>
                                {/* </div> */}
                            </div>
                        </ChatSection>
                    </>
                ) : (

                    <div
                        className="fixed bottom-10 right-10 z-50"
                    // onClick={() => setOpenVoiceCtrl(!openVoiceCtrl)}
                    >
                        <MessageCircleCodeIcon
                            size={"90px"}
                            onClick={() => setOpenChatWindow(!openChatWindow)}
                            className='cursor-pointer'
                        />
                    </div>
                )
            }
        </div>
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