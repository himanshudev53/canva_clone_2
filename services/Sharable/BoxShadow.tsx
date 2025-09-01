import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import React from 'react'
import * as fabric from "fabric"
import { Switch } from '@/components/ui/switch'
interface ShadowSettings {
    offsetX: number
    offsetY: number
    blur: number
    color: string
}

const BoxShadow = () => {
    const { canvasEditor } = useCanvasHook()
    const [settings, setSettings] = React.useState<ShadowSettings>({
        offsetX: 5,
        offsetY: 5,
        blur: 10,
        color: '#000000'
    })

    const applyShadowToSelection = () => {
        if (!canvasEditor) return

        const activeObjects = canvasEditor.getActiveObjects()
        if (activeObjects.length === 0) return

        activeObjects.forEach(obj => {

            obj.set({
                shadow: new fabric.Shadow({
                    color: settings.color,
                    blur: settings.blur,
                    offsetX: settings.offsetX,
                    offsetY: settings.offsetY
                })
            })
        })

        canvasEditor.renderAll()
    }

    // Update shadow when settings change
    React.useEffect(() => {
        applyShadowToSelection()
    }, [settings])

    // Update controls when selection changes
    React.useEffect(() => {
        if (!canvasEditor) return

        const handleSelection = () => {
            const activeObject = canvasEditor.getActiveObject()
            if (activeObject && activeObject.shadow) {
                const shadow = activeObject.shadow
                setSettings({
                    offsetX: shadow.offsetX || 0,
                    offsetY: shadow.offsetY || 0,
                    blur: shadow.blur || 0,
                    color: shadow.color || '#000000'
                })
            } else {
                setSettings(prev => ({ ...prev, enabled: false }))
            }
        }

        canvasEditor.on('selection:created', handleSelection)
        canvasEditor.on('selection:updated', handleSelection)
        canvasEditor.on('selection:cleared', () => {
            setSettings(prev => ({ ...prev, enabled: false }))
        })

        return () => {
            canvasEditor.off('selection:created', handleSelection)
            canvasEditor.off('selection:updated', handleSelection)
            canvasEditor.off('selection:cleared', () => {
                setSettings(prev => ({ ...prev, enabled: false }))
            })
        }
    }, [canvasEditor])

    const handleSettingChange = (key: keyof ShadowSettings, value: any) => {
        setSettings(prev => ({ ...prev, [key]: value }))
    }

    return (
        <div className="p-4 space-y-4">



            <div className="space-y-4">
                {/* Color Picker */}
                <div>
                    <label className="text-xs text-gray-600 mb-2 block">Shadow Color</label>
                    <div className="flex items-center gap-2">
                        <Input
                            type="color"
                            value={settings.color}
                            onChange={(e) => handleSettingChange('color', e.target.value)}
                            className="w-10 h-8 p-1"
                        />
                        <Input
                            value={settings.color}
                            onChange={(e) => handleSettingChange('color', e.target.value)}
                            className="flex-1 text-xs"
                            placeholder="#000000"
                        />
                    </div>
                </div>

                {/* Horizontal Offset */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-xs text-gray-600">Horizontal Offset</label>
                        <span className="text-xs text-gray-500">{settings.offsetX}px</span>
                    </div>
                    <Slider
                        value={[settings.offsetX]}
                        min={-50}
                        max={50}
                        step={1}
                        onValueChange={(values) => handleSettingChange('offsetX', values[0])}
                    />
                </div>

                {/* Vertical Offset */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-xs text-gray-600">Vertical Offset</label>
                        <span className="text-xs text-gray-500">{settings.offsetY}px</span>
                    </div>
                    <Slider
                        value={[settings.offsetY]}
                        min={-50}
                        max={50}
                        step={1}
                        onValueChange={(values) => handleSettingChange('offsetY', values[0])}
                    />
                </div>

                {/* Blur Radius */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-xs text-gray-600">Blur Radius</label>
                        <span className="text-xs text-gray-500">{settings.blur}px</span>
                    </div>
                    <Slider
                        value={[settings.blur]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(values) => handleSettingChange('blur', values[0])}
                    />
                </div>

                {/* Preview */}
                <div className="p-3 bg-gray-100 rounded-lg">
                    <label className="text-xs text-gray-600 mb-2 block">Preview</label>
                    <div
                        className="w-20 h-20 bg-white rounded border"
                        style={{
                            boxShadow: `${settings.offsetX}px ${settings.offsetY}px ${settings.blur}px ${settings.color}`
                        }}
                    />
                </div>
            </div>

        </div>
    )
}

export default BoxShadow