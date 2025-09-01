import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'
import { IText } from 'fabric'
import React from 'react'

const TextSettings = () => {
    const { canvasEditor } = useCanvasHook()
    const onAddTextClick = (text: "Heading" | "SubHeading" | "Para") => {
        if (canvasEditor) {
            if (text === "Heading") {
                const textRef = new IText("Add Heading", {
                    fontSize: 30,
                    fontWeight: "bold",
                    fontFamily: "Arial",
                    fill: "black",
                    left: 100,
                    top: 100
                })
                canvasEditor.add(textRef)
            } else if (text === "SubHeading") {
                const textRef = new IText("Add Sub Heading", {
                    fontSize: 20,
                    fontWeight: "400",
                    fontFamily: "Arial",
                    fill: "black",
                    left: 100,
                    top: 100
                })
                canvasEditor.add(textRef)
            } else {
                const textRef = new IText("Add Heading", {
                    fontSize: 13,
                    fontWeight: "normal",
                    fontFamily: "Arial",
                    fill: "black",
                    left: 100,
                    top: 100
                })
                canvasEditor.add(textRef)
            }
            canvasEditor.renderAll()
        }
        console.log({ text })
    }
    return (
        <div className='flex flex-col gap-2'>
            <h2
                className='font-bold text-2xl p-3 bg-secondary rounded-xl cursor-pointer'
                onClick={() => onAddTextClick("Heading")}
            >
                Add Heading
            </h2>
            <h2
                className='font-medium text-xl p-3 bg-secondary rounded-xl cursor-pointer'
                onClick={() => onAddTextClick("SubHeading")}
            >
                Add Sub Heading
            </h2>
            <h2
                className='text-md p-3 bg-secondary rounded-xl cursor-pointer'
                onClick={() => onAddTextClick("Para")}
            >
                Paragraph
            </h2>
        </div>
    )
}

export default TextSettings