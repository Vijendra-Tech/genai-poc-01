
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

type chatSectionProps = {
    userInput?: string,
    botOuput?: string,
    children: React.ReactNode
}

const ChatSection = ({ userInput, botOuput, children }: chatSectionProps) => {
    return (
        <div className="fixed right-10 bottom-10 w-1/3 h-2/3 bg-white shadow-lg rounded-lg">
            <div className="bg-muted flex justify-start items-center h-14">
                <Bot size={"40px"} className="mx-5" />
                <h1 className="text-2xl font-bold grow">HCBC Bot</h1>
                <MessageSquareX
                    className="float-end cursor-pointer"
                // onClick={() => setOpenChatWindow(false)}
                />
            </div>
            <div className="flex flex-col h-full">
                {
                    userInput && (
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 mx-2 my-1"><User className="mx-2 my-2" /></div>

                    )
                }
                <div className="flex-grow p-4">
                    <audio
                        src={userInput}
                        controls
                        preload="metadata"
                        aria-describedby="audio-error-message"
                    />
                    {/* {userInput} */}
                </div>
                {
                    botOuput && (
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 mx-2 my-1"><Bot className="mx-2 my-2" /></div>
                    )
                }
                <div className="p-4">
                    {
                        botOuput ? <audio
                            src={botOuput}
                            controls
                            preload="metadata"
                            aria-describedby="audio-error-message"
                        /> : (botOuput?.length ?? 0) > 0 ? <Loader /> : null
                    }
                </div>
                <div className="flex items-center justify-end p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ChatSection;
