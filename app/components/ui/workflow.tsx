import { Input } from '#@/components/ui/input.tsx';
import React from 'react';
import { H4 } from '../typography.tsx';
import BotProgress from './bot-progress.tsx';
import FaqSheet from '../faq-sheet.tsx';

/*
    create stepper workflow component using tailwind css
    Worflows are Voice to Text,Similarity search, Language Traslator,text to voice
    Develop Stepper and each step must one round div and div  have that workflow name and each step must be connected by vertical line connect
*/

type props = {
    stages?: any,
    data?: any
}

const Workflow: React.FC = ({ stages,data }: props) => {

    const GreeTick = () => {
        return (
            <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
            </svg>
        )
    }
    return (
        <>
            <div className='flex flex-col gap-2 px-8'>
                <H4 className='px-2'>Flow</H4>
                <div className='h-[720px] overflow-auto'>
                    <FaqSheet fileUrl='../../faq.pdf' side="left" />
                </div>
            </div>
            <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                <li className="mb-10 ms-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                        {
                            stages.one && !data?.errors && <GreeTick />
                        }

                    </span>
                    <h3 className="font-medium leading-tight">Voice to Text</h3>
                    <p className="text-sm">Open AI- Whisper model</p>
                </li>
                <li className="mb-10 ms-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                        {/* <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                        <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                    </svg> */}
                        {
                            stages.two &&  !data?.errors && <GreeTick />
                        }
                    </span>
                    <h3 className="font-medium leading-tight">Similarity Search</h3>
                    <p className="text-sm">Superbase VectorDB</p>
                </li>
                <li className="mb-10 ms-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                        {/* <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                        <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                    </svg> */}
                        {
                            stages.three &&  !data?.errors && <GreeTick />
                        }
                    </span>
                    <h3 className="font-medium leading-tight">Language Translator</h3>
                    <p className="text-sm">Open AI- gpt-3.5-turbo model</p>
                </li>
                <li className="ms-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                        {/* <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                        <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                    </svg> */}
                        {
                            stages.four && !data?.errors && <GreeTick />
                        }
                    </span>
                    <h3 className="font-medium leading-tight">Text to Voice</h3>
                    <p className="text-sm">Open AI - tts-1 model</p>
                </li>
                {
                    stages.one && !data?.errors && (
                        <li className='mt-56 mx-2'>
                            <BotProgress stages={stages} />
                        </li>
                    )
                }
            </ol>
        </>
    );
};

export default Workflow;










