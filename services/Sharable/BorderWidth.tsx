import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'
import { Slider } from '@/components/ui/slider'
import React from 'react'

const BorderWidth = () => {
    const { canvasEditor } = useCanvasHook()
    const [width, setWidth] = React.useState<number>(0)

    const onWidthChange = (values: number[]) => {
        const value = values[0]
        setWidth(value)

        if (canvasEditor) {
            const activeObjects = canvasEditor.getActiveObjects()
            if (activeObjects.length > 0) {
                activeObjects.forEach(obj => {
                    obj.set({
                        strokeWidth: value,
                        // Ensure stroke is set if changing from 0 to positive width
                        ...(value > 0 && !obj.stroke && { stroke: '#000000' })
                    })
                })
                canvasEditor.renderAll()
            }
        }
    }

    // Update slider when selection changes
    React.useEffect(() => {
        if (canvasEditor) {
            const handleSelection = () => {
                const activeObject = canvasEditor.getActiveObject()
                if (activeObject && 'strokeWidth' in activeObject) {
                    setWidth(activeObject.strokeWidth as number || 0)
                } else {
                    setWidth(0)
                }
            }

            canvasEditor.on('selection:created', handleSelection)
            canvasEditor.on('selection:updated', handleSelection)
            canvasEditor.on('selection:cleared', () => setWidth(0))

            return () => {
                canvasEditor.off('selection:created', handleSelection)
                canvasEditor.off('selection:updated', handleSelection)
                canvasEditor.off('selection:cleared', () => setWidth(0))
            }
        }
    }, [canvasEditor])

    return (
        <div className='p-2'>
            <h2 className='my-2'>Border Width</h2>
            <div className="flex items-center gap-3">
                <Slider
                    value={[width]}
                    defaultValue={[5]}
                    max={20}
                    min={0}
                    step={1}
                    onValueChange={onWidthChange}
                    className="flex-1"
                />
                <span className="text-xs text-gray-500 w-8 text-center">
                    {width}px
                </span>
            </div>
        </div>
    )
}

export default BorderWidth