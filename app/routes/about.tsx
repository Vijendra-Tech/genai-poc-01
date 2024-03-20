import { Card, CardContent } from '#@/components/ui/card.tsx'
import { H3 } from '#app/components/typography.tsx'
import WrappedComponent from '#app/components/wrapped-component.tsx'
import React from 'react'

function About() {
    return (
        <WrappedComponent heading=''>
            <div className='flex flex-col justify-start gap-2 mt-32 '>
                <Card className="w-[700px] bg-white h-[500px]">
                    <CardContent>
                        <img src="../../profile.png" alt="AI" className="w-72 h-72 bg-white" />
                        <div className='grid w-full items-center gap-4 ml-10 mt-10'>
                            <H3>Vijendra Rana</H3>
                            <p>Associate Consultant</p>
                            <p>T2.Fusion</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </WrappedComponent>
    )
}

export default About