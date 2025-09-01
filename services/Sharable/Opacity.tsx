import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'
import { Slider } from '@/components/ui/slider'
import React from 'react'

const Opacity = () => {
    const { canvasEditor } = useCanvasHook()
    const [opacity, setOpacity] = React.useState<number>(100) // 0-100 scale for percentage

    const onOpacityChange = (values: number[]) => {
        const value = values[0]
        setOpacity(value)

        if (canvasEditor) {
            const activeObjects = canvasEditor.getActiveObjects()
            if (activeObjects.length > 0) {
                // Convert percentage (0-100) to decimal (0-1) for fabric.js
                const opacityDecimal = value / 100

                activeObjects.forEach(obj => {
                    obj.set({
                        opacity: opacityDecimal,
                    })
                })
                canvasEditor.renderAll()
            }
        }
    }



    return (
        <div className='p-2'>
            <h2 className='my-2 text-sm font-medium'>Opacity</h2>
            <div className="flex items-center gap-3">
                <Slider
                    value={[opacity]}
                    defaultValue={[100]}
                    max={100}
                    min={0}
                    step={1}
                    onValueChange={onOpacityChange}
                    className="flex-1"
                />
                <span className="text-xs text-gray-500 w-12 text-center">
                    {opacity}%
                </span>
            </div>
        </div>
    )
}

export default Opacity