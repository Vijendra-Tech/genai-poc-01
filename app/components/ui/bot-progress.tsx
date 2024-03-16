import { Progress } from '#@/components/ui/progress.tsx'
import e from 'express'
import * as React from 'react'

function BotProgress({ stages }: any) {
    const [progress, setProgress] = React.useState(10)

    React.useEffect(() => {
        if (stages.four) {
            setProgress(100)
        } else {
            if (stages.two || stages.three) {
                setProgress(60)
            }else{
                setProgress(10)
            }
        }
    }, [stages])

    return (
        <div><Progress value={progress} className="w-full" /></div>
    )
}

export default BotProgress