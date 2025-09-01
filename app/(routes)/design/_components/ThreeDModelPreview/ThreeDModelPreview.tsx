import { Button } from '@/components/ui/button'
import { X, RotateCcw, ZoomIn, ZoomOut, Download, Maximize, Minimize } from 'lucide-react'
import React, { useState } from 'react'
import "./style.css"
const ThreeDModelPreview = () => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isVisible, setIsVisible] = useState(true)

    // Mock 3D model display - in a real implementation, this would be a Three.js canvas
    const renderModelPlaceholder = () => (
        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="text-center text-white">
                <div className="w-32 h-40 mx-auto bg-gradient-to-b from-blue-500 to-blue-700 rounded-lg shadow-lg transform rotate-12"></div>
                <p className="mt-4 text-sm font-medium">3D Preview</p>
                <p className="text-xs text-gray-300 mt-1">Drag to rotate • Scroll to zoom</p>
            </div>
        </div>
    )

    if (!isVisible) {
        return (
            <Button
                onClick={() => setIsVisible(true)}
                className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg bg-blue-600 hover:bg-blue-700"
            >
                <Maximize size={24} />
            </Button>
        )
    }

    return (
        <div className={`fixed z-50 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300
            ${isExpanded ? 'bottom-10 right-10 w-96 h-[600px]' : 'bottom-10 right-10 w-80 h-96'}`}>

            {/* Header */}
            <div className='flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white'>
                <h3 className='font-semibold text-lg'>3D Design Preview</h3>
                <div className='flex items-center space-x-2'>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-white hover:bg-white/20"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? <Minimize size={16} /> : <Maximize size={16} />}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-white hover:bg-white/20"
                        onClick={() => setIsVisible(false)}
                    >
                        <X size={18} />
                    </Button>
                </div>
            </div>

            {/* Model Container */}
            <div className='h-56 relative'>
                {renderModelPlaceholder()}

                {/* Loading overlay (would conditionally render) */}
                {/* <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
                </div> */}
            </div>

            {/* Controls */}
            <div className='p-4 border-b border-gray-200'>
                <div className='flex justify-between items-center'>
                    <span className='text-sm font-medium text-gray-700'>View Controls</span>
                    <div className='flex space-x-2'>
                        <Button variant="outline" size="sm" className="h-8">
                            <RotateCcw size={14} className="mr-1" />
                            Reset
                        </Button>
                    </div>
                </div>

                <div className='flex space-x-2 mt-3'>
                    <Button variant="outline" size="sm" className="flex-1 h-8">
                        <ZoomIn size={14} className="mr-1" />
                        Zoom In
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 h-8">
                        <ZoomOut size={14} className="mr-1" />
                        Zoom Out
                    </Button>
                </div>
            </div>

            {/* Info Panel */}
            <div className='p-4'>
                <div className='grid grid-cols-2 gap-4 mb-4'>
                    <div className='bg-gray-50 p-3 rounded-lg'>
                        <p className='text-xs text-gray-500'>Design Size</p>
                        <p className='font-medium'>500 × 500px</p>
                    </div>
                    <div className='bg-gray-50 p-3 rounded-lg'>
                        <p className='text-xs text-gray-500'>Position</p>
                        <p className='font-medium'>Center</p>
                    </div>
                </div>

                <div className='bg-blue-50 p-3 rounded-lg border border-blue-100'>
                    <p className='text-xs text-blue-700 flex items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Drag the model to rotate view
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className='p-4 border-t border-gray-200 bg-gray-50 flex space-x-3'>
                <Button variant="outline" className="flex-1">
                    <Download size={16} className="mr-2" />
                    Save Preview
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Apply to Model
                </Button>
            </div>
        </div>
    )
}

export default ThreeDModelPreview