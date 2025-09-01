import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'
import { Slider } from '@/components/ui/slider'
import React from 'react'

const BorderRadius = () => {
    const { canvasEditor } = useCanvasHook()
    const [borderRadius, setBorderRadius] = React.useState<number>(0) // 0-100 scale

    const onBorderRadiusChange = (valueArray: number[]) => {
        const value = valueArray[0]
        setBorderRadius(value)

        if (canvasEditor) {
            const activeObjects = canvasEditor.getActiveObjects()
            if (activeObjects.length > 0) {
                activeObjects.forEach(obj => {
                    // Handle different object types
                    if (obj.type === 'rect') {
                        // For rectangles, use rx and ry properties
                        obj.set({
                            rx: value,
                            ry: value
                        })
                    } else if (obj.type === 'circle' || obj.type === 'ellipse') {
                        // Circles and ellipses don't have borderRadius
                        console.log('Border radius not supported for this shape type')
                    } else {
                        // For other objects, try to use corner radius if available
                        if ('rx' in obj && 'ry' in obj) {
                            obj.set({
                                rx: value,
                                ry: value
                            })
                        }
                    }
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
                if (activeObject && activeObject.type === 'rect') {
                    // For rectangles, get the rx value
                    const rxValue = (activeObject as any).rx || 0
                    setBorderRadius(rxValue)
                } else {
                    setBorderRadius(0)
                }
            }

            canvasEditor.on('selection:created', handleSelection)
            canvasEditor.on('selection:updated', handleSelection)
            canvasEditor.on('selection:cleared', () => setBorderRadius(0))

            return () => {
                canvasEditor.off('selection:created', handleSelection)
                canvasEditor.off('selection:updated', handleSelection)
                canvasEditor.off('selection:cleared', () => setBorderRadius(0))
            }
        }
    }, [canvasEditor])

    return (
        <div className='p-2'>
            <h2 className='my-2 text-sm font-medium'>Border Radius</h2>
            <div className="flex items-center gap-3">
                <Slider
                    value={[borderRadius]}
                    defaultValue={[0]}
                    max={50}
                    min={0}
                    step={1}
                    onValueChange={onBorderRadiusChange}
                    className="flex-1"
                />
                <span className="text-xs text-gray-500 w-12 text-center">
                    {borderRadius}px
                </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
                Works with rectangles and similar shapes
            </p>
        </div>
    )
}

export default BorderRadius