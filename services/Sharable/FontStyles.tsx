import React, { useEffect, useState } from 'react'
import { Toggle } from "@/components/ui/toggle"
import { Bold, Italic, Underline } from 'lucide-react'
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'

// Type for fabric object's font properties (adjust as per your actual canvas object type)
type CanvasTextObject = {
    fontWeight?: string
    fontStyle?: string
    underline?: boolean
    set: (props: Partial<CanvasTextObject>) => void
}

const FontStyles: React.FC = () => {
    const { canvasEditor } = useCanvasHook()
    const [activeObject, setActiveObject] = useState<CanvasTextObject | null>(null)

    // Sync active object with canvas selection
    useEffect(() => {
        const update = () => setActiveObject(canvasEditor?.getActiveObject() ?? null)
        if (canvasEditor) {
            canvasEditor.on('selection:created', update)
            canvasEditor.on('selection:updated', update)
            canvasEditor.on('selection:cleared', update)
        }
        update()
        return () => {
            if (canvasEditor) {
                canvasEditor.off('selection:created', update)
                canvasEditor.off('selection:updated', update)
                canvasEditor.off('selection:cleared', update)
            }
        }
    }, [canvasEditor])

    const onChangeStyle = (style: "bold" | "italic" | "underline") => {
        if (!activeObject) return
        switch (style) {
            case "bold":
                activeObject.set({
                    fontWeight: activeObject.fontWeight === "bold" ? "normal" : "bold"
                })
                break
            case "italic":
                activeObject.set({
                    fontStyle: activeObject.fontStyle === "italic" ? "normal" : "italic"
                })
                break
            case "underline":
                activeObject.set({
                    underline: !activeObject.underline
                })
                break
        }
        canvasEditor?.renderAll()
        // Force UI update
        setActiveObject({ ...activeObject })
    }

    return (
        <div>
            <Toggle
                aria-label="Toggle bold"
                pressed={Boolean(activeObject?.fontWeight === "bold")}
                onClick={() => onChangeStyle("bold")}
            >
                <Bold className="h-4 w-4" size="lg" />
            </Toggle>
            <Toggle
                aria-label="Toggle italic"
                pressed={Boolean(activeObject?.fontStyle === "italic")}
                onClick={() => onChangeStyle("italic")}
            >
                <Italic className="h-4 w-4" size="lg" />
            </Toggle>
            <Toggle
                aria-label="Toggle underline"
                pressed={Boolean(activeObject?.underline)}
                onClick={() => onChangeStyle("underline")}
            >
                <Underline className="h-4 w-4" size="lg" />
            </Toggle>
        </div>
    )
}

export default FontStyles
