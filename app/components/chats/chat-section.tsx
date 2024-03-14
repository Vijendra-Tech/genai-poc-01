
/* 
     Create a chat window and style it using tailwind
     Window must be placed at right end of screen
    chat window should look similar to  gemini chat bot

*/
import { Button } from '#@/components/ui/button.tsx';
import { Input } from '#@/components/ui/input.tsx';
import { Bot, Loader, User } from 'lucide-react';
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
            <div className="flex flex-col h-full">
                {
                    userInput && (
                       <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 mx-2 my-1"><User className="mx-2 my-2"/></div>
                        
                    )
                }
                <div className="flex-grow p-4">
                    {userInput}
                </div>
                {
                    botOuput && (
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 mx-2 my-1"><Bot className="mx-2 my-2"/></div>
                    )
                }
                <div className="p-4">
                    {
                        botOuput ? <p>{botOuput}</p> : (botOuput?.length ?? 0) > 0 ? <Loader /> : null
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
