import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Loader } from 'lucide-react';
import React, { useState } from 'react'
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
// import fs from 'fs'
// import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
// import { readFileSync } from 'fs-extra';


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

export async function loader() {
    const file = ""
    return json({
        file
    })
}

function ReactPdfViewer({fileUrl}:{fileUrl:string}) {
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);

    const data = useLoaderData<typeof loader>()

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    return (
        <div className='max-h-[900px] overflow-auto'>
            <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} options={options} loading={<Loader className='flex justify-center'/>}>
                {Array.from(new Array(numPages), (el, index) => (
                    <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        loading={<>
                            {
                                index + 1 == 1 && (
                                    <Loader />
                                )
                            }
                        </>}
                    />
                ))}
            </Document>
        </div>
    );
}

export default ReactPdfViewer