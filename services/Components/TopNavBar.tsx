import React from 'react'
import ShapSettings from '../Sharable/ShapSettings'
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'
import TextSettings from './TextSettings';
import TextSettingsNavbar from './TextSettingsNavbar';

const TopNavBar = () => {
    const { canvasEditor } = useCanvasHook();
    const [showShapeSettings, setShowShapeSettings] = React.useState(false);
    const [enableTextSettings, setEnableTextSettings] = React.useState(false);
    const [activeObjectType, setActiveObjectType] = React.useState<string>('');

    // Debug function to log all object properties
    const debugObject = (obj: any) => {
        if (!obj) return;
        console.log('Object details:', {
            type: obj.type,
            isType: typeof obj.type,
            constructor: obj.constructor?.name,
            keys: Object.keys(obj),
            allProperties: Object.getOwnPropertyNames(obj)
        });
    }

    React.useEffect(() => {
        if (!canvasEditor) return;

        console.log('Setting up canvas event listeners...');

        const handleSelectionCreated = (e: any) => {
            const activeObject = canvasEditor.getActiveObject();
            console.log('Selection created - active object:', activeObject);
            debugObject(activeObject);

            if (activeObject) {
                // More robust type checking
                const objectType = activeObject.type || '';
                setActiveObjectType(objectType);

                // Check if it's a shape
                const isShape = [
                    'rect', 'circle', 'triangle',
                    'polygon', 'ellipse', 'line',
                    'path', 'group' // Add more types as needed
                ].includes(objectType);

                // Check if it's text
                const isText = [
                    'text', 'i-text', 'textbox',
                    'itext', 'text-line' // Common text types in Fabric.js
                ].includes(objectType);

                console.log('Type detection:', { objectType, isShape, isText });

                setShowShapeSettings(isShape);
                setEnableTextSettings(isText);
            } else {
                setShowShapeSettings(false);
                setEnableTextSettings(false);
                setActiveObjectType('');
            }
        };

        const handleSelectionCleared = () => {
            console.log('Selection cleared');
            setShowShapeSettings(false);
            setEnableTextSettings(false);
            setActiveObjectType('');
        };

        const handleSelectionUpdated = (e: any) => {
            const activeObject = canvasEditor.getActiveObject();
            console.log('Selection updated - active object:', activeObject);

            if (activeObject) {
                const objectType = activeObject.type || '';
                setActiveObjectType(objectType);

                const isShape = [
                    'rect', 'circle', 'triangle',
                    'polygon', 'ellipse', 'line',
                    'path', 'group'
                ].includes(objectType);

                const isText = [
                    'text', 'i-text', 'textbox',
                    'itext', 'text-line'
                ].includes(objectType);

                setShowShapeSettings(isShape);
                setEnableTextSettings(isText);
            } else {
                setShowShapeSettings(false);
                setEnableTextSettings(false);
                setActiveObjectType('');
            }
        };

        const handleObjectModified = (e: any) => {
            console.log('Object modified:', e.target);
            // Re-check selection when object is modified
            handleSelectionUpdated(e);
        };

        // Add event listeners
        canvasEditor.on('selection:created', handleSelectionCreated);
        canvasEditor.on('selection:cleared', handleSelectionCleared);
        canvasEditor.on('selection:updated', handleSelectionUpdated);
        canvasEditor.on('object:modified', handleObjectModified);

        // Check initial selection
        const initialObject = canvasEditor.getActiveObject();
        if (initialObject) {
            handleSelectionCreated({});
        }

        // Cleanup function
        return () => {
            console.log('Cleaning up canvas event listeners...');
            canvasEditor.off('selection:created', handleSelectionCreated);
            canvasEditor.off('selection:cleared', handleSelectionCleared);
            canvasEditor.off('selection:updated', handleSelectionUpdated);
            canvasEditor.off('object:modified', handleObjectModified);
        };
    }, [canvasEditor]);

    return (
        <div className='p-3 bg-white border-b border-gray-200'>
            {/* Debug info - remove in production */}
            <div className="text-xs text-gray-400 mb-2">
                Active object type: {activeObjectType || 'none'}
            </div>

            {showShapeSettings && <ShapSettings />}
            {enableTextSettings && <TextSettingsNavbar />}

            {!showShapeSettings && !enableTextSettings && (
                <div className="text-sm text-gray-500">
                    Select an object to edit its properties
                </div>
            )}
        </div>
    )
}

export default TopNavBar