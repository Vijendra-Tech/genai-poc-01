import WrappedComponent from '#app/components/wrapped-component.tsx'
import React from 'react'
import LT,{LottieRefCurrentProps} from "lottie-react";
import animationData from '#app/animation/Animation - 1710950564179.json'

const Lottie = LT.default

function ThreeDPlay() {
    const phoneRef = React.useRef<LottieRefCurrentProps>(null)
    return (
        <WrappedComponent heading=''>
            <div className='flex justify-center items-center min-h-screen'>
                <Lottie animationData={animationData} loop={true} lottieRef={phoneRef} onComplete={()=>{
                    // phoneRef.current?.setDirection(-1)
                    // phoneRef.current?.play()
                }}/>
            </div>
        </WrappedComponent>
    )
}

export default ThreeDPlay