
/* 
     Create a chat window and style it using tailwind
     Window must be placed at right end of screen
    chat window should look similar to  gemini chat bot

*/
import { Button } from '#@/components/ui/button.tsx';
import { Input } from '#@/components/ui/input.tsx';
import { Bot, Loader, MessageSquareX, User } from 'lucide-react';
import React from 'react';
import CharForm from './chat-form.tsx';
import { BotSkelton, UserSkeleton } from '../ui/skelton-bot.tsx';

type chatSectionProps = {
    userInput?: string,
    botOuput?: string,
    children: React.ReactNode,
    stages?: any
}

const ChatSection = ({ userInput, botOuput, children, stages }: chatSectionProps) => {
    return (
        <div className="fixed right-10 bottom-10 w-1/4  min-h-[720px] max-h-[720px] bg-white shadow-lg rounded-lg">
            <div className="bg-muted flex justify-start items-center h-14">
                <img src="../../ai.png" alt="AI" className="w-12 h-12"/>
                <h1 className="text-2xl font-bold grow">HSBC Bot</h1>
                <MessageSquareX
                    className="float-end cursor-pointer"
                // onClick={() => setOpenChatWindow(false)}
                />
            </div>
            <div className="flex flex-col flex-grow h-full p-4">
                <div className="flex w-full mt-2 space-x-3">
                    {
                        stages?.one && (
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 mx-2 my-1"><User className="mx-2 my-2" /></div>

                        )
                    }
                    {
                        stages?.one && (
                            <div className="bg-muted text-white p-3 rounded-l-lg rounded-br-lg">
                                <audio
                                    src={userInput}
                                    controls
                                    preload="metadata"
                                    aria-describedby="audio-error-message"
                                />
                            </div>
                        ) 
                    }
                </div>
                <div className="flex w-full mt-2 space-x-3  ml-auto justify-end max-w-xs">
                    {
                        stages?.four ? (

                            <div className="bg-muted text-white p-3 rounded-l-lg rounded-br-lg">
                                <audio
                                    src={botOuput}
                                    controls
                                    preload="metadata"
                                    aria-describedby="audio-error-message"
                                />
                            </div>
                        ) : (
                            <>
                            {
                                stages?.one ?(
                                    <BotSkelton />
                                ):null
                            }
                            </>
                        )
                    }

                    {
                        stages?.four && (
                             <img src="../../ai.png" alt="AI" className="w-12 h-12"/>
                        )
                    }
                </div>
                {/* {
                    botOuput ? (
                        <></>
                    ) : (
                        <>
                            <div className="flex w-full mt-2 space-x-3  ml-auto justify-end max-w-xs"></div>
                        </>
                    )
                } */}
                <div className="flex items-center justify-end p-4 h-full">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ChatSection;
