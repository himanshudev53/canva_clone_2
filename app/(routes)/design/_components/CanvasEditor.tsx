"use client";
import * as fabric from "fabric";
import React from "react";
import { useCanvasHook } from "../[designId]/page";
import TopNavBar from "@/services/Components/TopNavBar";
import ThreeDModelPreview from "./ThreeDModelPreview/ThreeDModelPreview";

interface DesignHeaderProps {
    designInfo?: {
        _creationTime: number;
        _id: string;
        height: number;
        name: string;
        uid: string;
        width: number;
        jsonTemplate: JSON
    } | null;
}

const CanvasEditor = ({ designInfo }: DesignHeaderProps) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const previewCanvasRef = React.useRef<HTMLCanvasElement>(null);
    const [canvas, setCanvas] = React.useState<fabric.Canvas | null>(null);
    const { canvasEditor, setCanvasEditor } = useCanvasHook();

    React.useEffect(() => {
        if (canvasRef.current && designInfo) {
            const scaleFactor = window.devicePixelRatio || 1;

            // Calculate appropriate canvas size for the screen
            const maxWidth = window.innerWidth * 0.9;
            const maxHeight = window.innerHeight * 0.8;
            const aspectRatio = designInfo.width / designInfo.height;

            let displayWidth = designInfo.width;
            let displayHeight = designInfo.height;

            // Scale down if design is larger than screen
            if (displayWidth > maxWidth) {
                displayWidth = maxWidth;
                displayHeight = maxWidth / aspectRatio;
            }
            if (displayHeight > maxHeight) {
                displayHeight = maxHeight;
                displayWidth = maxHeight * aspectRatio;
            }

            const initCanvas = new fabric.Canvas(canvasRef.current, {
                width: displayWidth * scaleFactor,
                height: displayHeight * scaleFactor,
                backgroundColor: "#fff",
                preserveObjectStacking: true
            });

            if (designInfo.jsonTemplate) {
                initCanvas.loadFromJSON(
                    designInfo.jsonTemplate,
                    () => {
                        initCanvas.requestRenderAll();
                    },
                );

            }

            // Set viewport transform for proper scaling
            initCanvas.setViewportTransform([scaleFactor, 0, 0, scaleFactor, 0, 0]);

            setCanvas(initCanvas);
            setCanvasEditor(initCanvas);

            // Center canvas
            initCanvas.renderAll();

            return () => {
                initCanvas.dispose();
            };
        }
    }, [designInfo, setCanvasEditor]);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.key === "Delete") && canvasEditor) {
                const activeObjects = canvasEditor.getActiveObjects();
                if (activeObjects.length > 0) {
                    activeObjects.forEach(obj => {
                        canvasEditor.remove(obj);
                    });
                    canvasEditor.discardActiveObject();
                    canvasEditor.renderAll();
                }
            }

            // Add undo/redo functionality with Ctrl+Z and Ctrl+Y
            if (e.ctrlKey || e.metaKey) {
                if (e.key === 'z' && canvasEditor) {
                    e.preventDefault();
                    // Implement undo logic here
                } else if (e.key === 'y' && canvasEditor) {
                    e.preventDefault();
                    // Implement redo logic here
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [canvasEditor]);

    // Handle window resize
    React.useEffect(() => {
        const handleResize = () => {
            if (canvas && designInfo) {
                const scaleFactor = window.devicePixelRatio || 1;
                const maxWidth = window.innerWidth * 0.9;
                const maxHeight = window.innerHeight * 0.8;
                const aspectRatio = designInfo.width / designInfo.height;

                let displayWidth = designInfo.width;
                let displayHeight = designInfo.height;

                if (displayWidth > maxWidth) {
                    displayWidth = maxWidth;
                    displayHeight = maxWidth / aspectRatio;
                }
                if (displayHeight > maxHeight) {
                    displayHeight = maxHeight;
                    displayWidth = maxHeight * aspectRatio;
                }

                canvas.setDimensions({
                    width: displayWidth * scaleFactor,
                    height: displayHeight * scaleFactor
                });
                canvas.renderAll();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [canvas, designInfo]);
    React.useEffect(() => {
        if (canvasEditor && previewCanvasRef.current) {
            const handleCanvasUpdate = () => {
                if (previewCanvasRef.current) {
                    const context = previewCanvasRef.current.getContext('2d');
                    if (context && canvasRef.current) {
                        // Clear preview canvas
                        context.clearRect(0, 0, previewCanvasRef.current.width, previewCanvasRef.current.height);

                        // Draw main canvas content to preview (scaled down)
                        const scale = 0.3; // Preview scale factor
                        context.drawImage(
                            canvasRef.current,
                            0,
                            0,
                            previewCanvasRef.current.width,
                            previewCanvasRef.current.height
                        );
                    }
                }
            };

            canvasEditor.on('after:render', handleCanvasUpdate);
            return () => {
                canvasEditor.off('after:render', handleCanvasUpdate);
            };
        }
    }, [canvasEditor]);
    if (!designInfo) {
        return (
            <div className="w-screen h-screen flex items-center justify-center bg-secondary">
                <div className="text-gray-500">Loading design...</div>
            </div>
        );
    }

    return (
        <div className="bg-secondary w-screen h-screen flex flex-col">
            <TopNavBar />
            <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
                <canvas
                    id="canvas"
                    ref={canvasRef}
                    className="block"
                    style={{
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    }}
                />
            </div>
            <ThreeDModelPreview />
        </div>
    );
};

export default CanvasEditor;