import * as React from 'react'
import { H3 } from './typography.tsx'

interface props {
    heading: string,
    children: React.ReactNode
}

function WrappedComponent({heading,children}:props) {
    return (
        <div className='container flex flex-col justify-center items-center'>
          <H3 as={'h3'}>{heading}</H3>
           <div>
            {children}
           </div>
        </div>
    )
}

export default WrappedComponent