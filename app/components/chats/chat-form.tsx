import { Button } from '#@/components/ui/button.tsx'
import { Input } from '#@/components/ui/input.tsx'
import { Mic, MicOff } from 'lucide-react'
import React from 'react'

function ChatForm() {
    return (
        <div className='relative w-full'>
            <Input placeholder='Ask Queries'/>
            <Button className="absolute text-white font-bold top-0 right-0 ">
               <Mic />
            </Button>
        </div>
    )
}

export default ChatForm