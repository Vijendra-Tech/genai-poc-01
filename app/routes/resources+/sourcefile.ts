import { readFileSync } from 'fs'


const getFileContents = (filename: string) => readFileSync(`./app/assets/${filename}.pdf`)

type ParamsType = {
  filename: string
}

export async function loader({ params }: { params: ParamsType }) {
//   const { filename } = params
  const pdf = getFileContents("faq")
  return new Response(pdf, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
    },
  })
}