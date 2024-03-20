import * as React from 'react'
import { H3 } from './typography.tsx'

interface props {
    heading: string,
    children: React.ReactNode,
    className?:string
}

function WrappedComponent({heading,children,className}:props) {
    return (
        <div className='container mt-10'>
          <H3 as={'h3'}>{heading}</H3>
           <div className={className}>
            {children}
           </div>
        </div>
    )
}

export default WrappedComponent