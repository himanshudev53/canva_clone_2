import React from 'react'
import { FontFamilyList } from '../Options'
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'

const FontFamily = () => {
    const { canvasEditor } = useCanvasHook()
    const onChangeFontFamily = (fontFamily: string) => {
        const activeObject = canvasEditor?.getActiveObject()
        if (activeObject && activeObject.set) {
            activeObject.set({
                fontFamily: fontFamily
            })
            canvasEditor?.renderAll()
        }
    }
    return (
        <div className='max-h-96 overflow-auto'>
            {FontFamilyList.map((item, i) => (
                <div
                    key={i}
                    className='p-2 text-lg bg-secondary hover:cursor-pointer mt-2 hover:bg-gray-200 rounded-lg'
                    onClick={() => onChangeFontFamily(item)}
                    style={{ fontFamily: item }} // visually show each font in dropdown
                >
                    {item}
                </div>
            ))}
        </div>
    )
}

export default FontFamily
