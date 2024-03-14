import WrappedComponent from '#app/components/wrapped-component.tsx'
import { loadpdf} from '#app/utils/rag.server.ts'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import React from 'react'

export async function loader() {
  // const message = await ragInit()
  return json({
    ok:true
  })
}

function LLMPOCVersionOne() {
  const data = useLoaderData<typeof loader>()
  // const { message } = data
  // Convert message to ReactNode
  return (
    <WrappedComponent heading='POC V1'>
      <div>This is version One</div>
      {/* {message && (
        <ul>{message}</ul>
      )} */}

    </WrappedComponent>
  )
}

export default LLMPOCVersionOne