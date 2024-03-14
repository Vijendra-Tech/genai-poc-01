import React from 'react'
import { LinkPreview } from '@dhaiwat10/react-link-preview';

function LinkPreviewViewer({url}:{url:string}) {
  return (
    <div className='flex justify-center items-centers'>
        <LinkPreview url={url} width='400px'  fallback={<p>Failed to load</p>}/>
    </div>
  )
}

export default LinkPreviewViewer