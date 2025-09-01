import { Button } from "@/components/ui/button";
import Logo from "@/Logo";
import { UserButton } from "@stackframe/stack";
import { Download, Save, Edit3, RotateCcw, AlertCircle, Upload, HelpCircle } from "lucide-react";
import { useCanvasHook } from "../[designId]/page";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useState, useRef, useEffect } from "react";
import * as fabric from "fabric"
import { Id } from "@/convex/_generated/dataModel";

interface DesignHeaderProps {
    designInfo?: {
        _creationTime: number;
        _id: string;
        height: number;
        name: string;
        uid: string;
        width: number;
    } | null;
}

const DesignHeader = ({ designInfo }: DesignHeaderProps) => {
    const { canvasEditor } = useCanvasHook();
    const SaveDesign = useMutation(api.design.SaveDesign);
    const { designId } = useParams();
    const [isSaving, setIsSaving] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [designName, setDesignName] = useState(designInfo?.name || '');
    const [exportError, setExportError] = useState<string | null>(null);
    const [showHelp, setShowHelp] = useState(false);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const updateDesignName = useMutation(api.design.UpdateDesignName);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (designInfo?.name) {
            setDesignName(designInfo.name);
        }
    }, [designInfo?.name]);

    useEffect(() => {
        if (isEditingName && nameInputRef.current) {
            nameInputRef.current.focus();
            nameInputRef.current.select();
        }
    }, [isEditingName]);

    // Function to ensure all images have CORS enabled
    const ensureCORSForAllImages = async (): Promise<boolean> => {
        if (!canvasEditor) return false;

        const objects = canvasEditor.getObjects();
        let hasExternalImages = false;

        for (const obj of objects) {
            if (obj.type === 'image' && (obj as fabric.Image).getSrc()) {
                const imgSrc = (obj as fabric.Image).getSrc();
                if (typeof imgSrc === 'string' && imgSrc.startsWith('http')) {
                    hasExternalImages = true;

                    try {
                        // Create a new image with CORS enabled
                        await new Promise<void>((resolve, reject) => {
                            const img = new Image();
                            img.crossOrigin = 'Anonymous';
                            img.onload = () => {
                                // Replace the image source with the CORS-enabled version
                                (obj as fabric.Image).setElement(img);
                                canvasEditor.renderAll();
                                resolve();
                            };
                            img.onerror = reject;
                            img.src = imgSrc + (imgSrc.includes('?') ? '&' : '?') + 't=' + Date.now();
                        });
                    } catch (error) {
                        console.error('Failed to load image with CORS:', error);
                        return false;
                    }
                }
            }
        }

        return true;
    };

    const onSave = async () => {
        if (canvasEditor) {
            setIsSaving(true);
            try {
                const jsonDesign = canvasEditor.toJSON();
                await SaveDesign({
                    id: designId as Id<"designs">,
                    jsonDesign: jsonDesign
                });
                toast.success("Design saved successfully!");
            } catch (error) {
                console.error("Error saving design:", error);
                toast.error("Failed to save design");
            } finally {
                setIsSaving(false);
            }
        }
    };

    const onExport = async () => {
        if (!canvasEditor) return;

        setExportError(null);
        setIsExporting(true);

        try {
            // First try to ensure all images have CORS enabled
            const corsSuccess = await ensureCORSForAllImages();

            if (!corsSuccess) {
                throw new Error("Some external images couldn't be loaded with CORS");
            }

            // Add a small delay to allow images to load
            await new Promise(resolve => setTimeout(resolve, 500));

            // Try to export
            const dataUrl = canvasEditor.toDataURL({
                format: "png",
                quality: 1,
                multiplier: 2
            });

            // If we get here, the export was successful
            const fileName = designName.trim() !== '' ? designName : "MyDesign";

            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = `${fileName}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast.success("Design downloaded!");
        } catch (error) {
            console.error("Export error:", error);
            setExportError("Cannot export design with external images due to security restrictions. Please use only uploaded images.");
            toast.error("Export failed: External images detected");
        } finally {
            setIsExporting(false);
        }
    };

    const handleNameUpdate = async () => {
        if (designName.trim() === '') {
            setDesignName(designInfo?.name || '');
            setIsEditingName(false);
            return;
        }

        try {
            await updateDesignName({
                id: designId as Id<"designs">,
                name: designName
            });
            toast.success("Design name updated");
        } catch (error) {
            console.error("Error updating design name:", error);
            toast.error("Failed to update design name");
            setDesignName(designInfo?.name || '');
        }
        setIsEditingName(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleNameUpdate();
        } else if (e.key === 'Escape') {
            setDesignName(designInfo?.name || '');
            setIsEditingName(false);
        }
    };

    const handleResetCanvas = () => {
        if (canvasEditor && confirm("Are you sure you want to reset the canvas? This action cannot be undone.")) {
            canvasEditor.clear();
            toast.info("Canvas has been reset");
        }
    };

    const closeErrorDialog = () => {
        setExportError(null);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || !files.length || !canvasEditor) return;

        const file = files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            fabric.Image.fromURL(event.target?.result as string, (img) => {
                // Scale image if it's too large
                const maxWidth = 500;
                if (img.width && img.width > maxWidth) {
                    const scale = maxWidth / img.width;
                    img.scale(scale);
                }

                img.set({
                    left: 100,
                    top: 100,
                });

                canvasEditor.add(img);
                canvasEditor.setActiveObject(img);
                canvasEditor.renderAll();
                toast.success("Image uploaded successfully!");
            });
        };

        reader.readAsDataURL(file);

        // Reset the file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Function to convert external images to data URLs
    const convertExternalImagesToDataURLs = async (): Promise<boolean> => {
        if (!canvasEditor) return false;

        const objects = canvasEditor.getObjects();

        for (const obj of objects) {
            if (obj.type === 'image') {
                const fabricImage = obj as fabric.Image;
                const src = fabricImage.getSrc();

                if (typeof src === 'string' && src.startsWith('http')) {
                    try {
                        // Convert external image to data URL
                        const dataUrl = await imageUrlToDataURL(src);
                        if (dataUrl) {
                            // Replace the image source with data URL
                            fabricImage.setSrc(dataUrl, () => {
                                canvasEditor.renderAll();
                            });
                        }
                    } catch (error) {
                        console.error('Failed to convert image to data URL:', error);
                        return false;
                    }
                }
            }
        }

        return true;
    };

    // Helper function to convert image URL to data URL
    const imageUrlToDataURL = (url: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0);
                    resolve(canvas.toDataURL('image/png'));
                } else {
                    reject(new Error('Could not get canvas context'));
                }
            };
            img.onerror = reject;
            img.src = url;
        });
    };

    const tryAlternativeExport = async () => {
        setIsExporting(true);
        try {
            // Try to convert all external images to data URLs
            const success = await convertExternalImagesToDataURLs();

            if (success) {
                // Wait a bit for images to convert
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Now try export again
                await onExport();
            } else {
                throw new Error("Could not convert external images");
            }
        } catch (error) {
            console.error("Alternative export failed:", error);
            setExportError("Export failed. Please try uploading images instead of using external URLs.");
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className='p-3 flex justify-between items-center bg-gradient-to-r from-sky-500 to-purple-600 shadow-lg'>
            <div className="flex items-center space-x-3 text-white">
                <div className="p-2 bg-white/10 rounded-lg">
                    <Logo />
                </div>
                <span className="text-xl font-bold hidden md:block">Design Editor</span>
            </div>

            <div className="flex items-center gap-2 relative group">
                {isEditingName ? (
                    <input
                        ref={nameInputRef}
                        value={designName}
                        onChange={(e) => setDesignName(e.target.value)}
                        onBlur={handleNameUpdate}
                        onKeyDown={handleKeyDown}
                        className="text-white border border-white/30 outline-none bg-white/10 px-4 py-1 rounded-lg text-center w-64"
                        maxLength={50}
                    />
                ) : (
                    <>
                        <h2 className="text-white text-lg font-medium px-4 py-1 max-w-xs truncate">
                            {designName || 'Untitled Design'}
                        </h2>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                            onClick={() => setIsEditingName(true)}
                        >
                            <Edit3 size={16} />
                        </Button>
                    </>
                )}
            </div>

            <div className="flex gap-3 items-center">
                <Button
                    variant={"outline"}
                    onClick={handleResetCanvas}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white hidden sm:flex"
                    size="sm"
                >
                    <RotateCcw size={16} className="mr-1" />
                    Reset
                </Button>

                <Button
                    variant={"outline"}
                    onClick={triggerFileInput}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
                    size="sm"
                >
                    <Upload size={16} className="mr-1" />
                    Upload
                </Button>

                <Button
                    variant={"outline"}
                    onClick={onExport}
                    disabled={isExporting}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
                    size="sm"
                >
                    {isExporting ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></div>
                            Exporting...
                        </>
                    ) : (
                        <>
                            <Download size={16} className="mr-1" />
                            Export
                        </>
                    )}
                </Button>

                <Button
                    variant={"outline"}
                    onClick={onSave}
                    disabled={isSaving}
                    className="bg-white border-sky-500 text-sky-600 hover:bg-sky-50 hover:text-sky-700 font-medium"
                    size="sm"
                >
                    {isSaving ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-sky-600 mr-1"></div>
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save size={16} className="mr-1" />
                            Save
                        </>
                    )}
                </Button>

                <Button
                    variant={"ghost"}
                    size="icon"
                    className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                    onClick={() => setShowHelp(true)}
                >
                    <HelpCircle size={16} />
                </Button>

                <div className="border-l border-white/30 h-8 mx-2"></div>

                <UserButton />
            </div>

            {/* Hidden file input for uploads */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
            />

            {/* Error Dialog */}
            {exportError && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                        <div className="flex items-center mb-4">
                            <AlertCircle className="text-red-500 mr-2" size={24} />
                            <h3 className="text-lg font-semibold">Export Error</h3>
                        </div>
                        <p className="text-gray-700 mb-4">{exportError}</p>
                        <p className="text-gray-600 text-sm mb-6">
                            Solution: Use the "Upload" button to add images from your device instead of external URLs.
                        </p>
                        <div className="flex justify-end gap-2">
                            <Button
                                onClick={closeErrorDialog}
                                variant="outline"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={tryAlternativeExport}
                                className="bg-blue-500 hover:bg-blue-600 text-white mr-2"
                            >
                                Try Again
                            </Button>
                            <Button
                                onClick={triggerFileInput}
                                className="bg-green-500 hover:bg-green-600 text-white"
                            >
                                <Upload size={16} className="mr-1" />
                                Upload Image
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Help Dialog */}
            {showHelp && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Export Help</h3>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowHelp(false)}
                            >
                                ✕
                            </Button>
                        </div>
                        <div className="text-gray-700 space-y-3">
                            <p><strong>Why can't I export my design?</strong></p>
                            <p>Browsers block exporting when your design contains images from other websites due to security restrictions.</p>

                            <p><strong>How to fix this:</strong></p>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li>Use the "Upload" button to add images from your device</li>
                                <li>Avoid using images from external websites</li>
                                <li>If you must use external images, make sure they have proper CORS headers</li>
                            </ol>

                            <p><strong>Tips for successful exports:</strong></p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Always upload images instead of using URLs</li>
                                <li>If export fails, try the "Try Again" button</li>
                                <li>For best results, use PNG format images</li>
                            </ul>
                        </div>
                        <div className="flex justify-end mt-6">
                            <Button
                                onClick={() => setShowHelp(false)}
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                            >
                                OK
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DesignHeader;