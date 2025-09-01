import React from 'react'
import Shapes from '../Sharable/Shapes'
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'
import Stickers from '../Sharable/Stickers'

const Elements = () => {
    const { canvasEditor } = useCanvasHook()
    return (
        <div>
            <Shapes canvasEditor={canvasEditor} />
            <div>
                <Stickers />
            </div>
        </div>
    )
}

export default Elements