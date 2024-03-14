
/* 
     Create a chat window and style it using tailwind
     Window must be placed at right end of screen
    chat window should look similar to  gemini chat bot

*/
import { Button } from '#@/components/ui/button.tsx';
import { Input } from '#@/components/ui/input.tsx';
import { Bot, User } from 'lucide-react';
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
            {/* Chat window content */}
            <div className="flex flex-col h-full">
                {/* User messages */}

                <div className="flex-grow p-4">
                    {/* User message content */}
                    <User />
                    {userInput}
                </div>
                {/* Bot messages */}
                <div className="bg-gray-100 p-4">
                    {/* Bot message content */}
                    <Bot />
                    {botOuput}
                </div>
                <div className="flex items-center justify-end p-4">
                    {children}
                    {/* <CharForm /> */}
                </div>
            </div>
        </div>
    );
};

export default ChatSection;
