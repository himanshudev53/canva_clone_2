import React from 'react'
import ColorPickerEditor from './ColorPickerEditor'
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';

const BorderColor = () => {
    const [color, setColor] = React.useState("#000");
    const { canvasEditor } = useCanvasHook()

    const onColorChange = (v: string) => {
        setColor(v); // Update the local state

        if (canvasEditor) {
            const activeObject = canvasEditor.getActiveObject();
            if (activeObject) {
                // Use the new color value 'v' instead of the old 'color'
                activeObject.set({ stroke: v });

                // No need to re-add the object to canvas, just modify and render
                canvasEditor.renderAll();

                // Optional: fire event for history tracking
                canvasEditor.fire('object:modified', { target: activeObject });
            }
        }
    }

    // Optional: Update color when active object changes
    React.useEffect(() => {
        if (canvasEditor) {
            const handleSelectionCreated = () => {
                const activeObject = canvasEditor.getActiveObject();
                if (activeObject && activeObject.stroke) {
                    setColor(activeObject.stroke as string);
                }
            };

            const handleSelectionCleared = () => {
                setColor("#000"); // Reset to default when no object selected
            };

            canvasEditor.on('selection:created', handleSelectionCreated);
            canvasEditor.on('selection:updated', handleSelectionCreated);
            canvasEditor.on('selection:cleared', handleSelectionCleared);

            return () => {
                canvasEditor.off('selection:created', handleSelectionCreated);
                canvasEditor.off('selection:updated', handleSelectionCreated);
                canvasEditor.off('selection:cleared', handleSelectionCleared);
            };
        }
    }, [canvasEditor]);

    return (
        <div>
            <ColorPickerEditor onColorChange={onColorChange} value={color} />
        </div>
    )
}

export default BorderColor