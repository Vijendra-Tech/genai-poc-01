import { Button } from '#@/components/ui/button.tsx'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '#@/components/ui/sheet.tsx'
import React from 'react'
import ReactPdfViewer from './react-pdf-viewer.tsx'

function FaqSheet({ fileUrl = "faq.pdf", side = "right" }: { fileUrl?: string, side?: string }) {
  return (
    <div className='h-full overflow-auto'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Hsbc FAQ</Button>
        </SheetTrigger>
        <SheetContent side={side as "right" | "top" | "bottom" | "left" | null | undefined} onInteractOutside={(e) => {
          // e.preventDefault();
        }}>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription className='w-[700px] h-full overflow-auto'>
              <ReactPdfViewer fileUrl={fileUrl} />
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">

            </div>
          </div>
          <SheetFooter >
            <SheetClose asChild className='top-0 right-0'>
              <Button type="submit">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default FaqSheet