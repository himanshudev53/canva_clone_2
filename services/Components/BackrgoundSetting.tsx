import React from 'react'
import ColorPickerEditor from '../Sharable/ColorPickerEditor';
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';

const BackrgoundSetting = () => {
    const [bgColor, setBgColor] = React.useState("#fff");
    const { canvasEditor } = useCanvasHook()

    const onColorChange = (color: string) => {
        setBgColor(color)
        canvasEditor?.set({
            backgroundColor: color,
            backgroundImage: null,
        })
        canvasEditor?.renderAll()
    }
    return (
        <div>
            <ColorPickerEditor
                value={bgColor}
                onColorChange={onColorChange}
            />
        </div>
    )
}

export default BackrgoundSetting