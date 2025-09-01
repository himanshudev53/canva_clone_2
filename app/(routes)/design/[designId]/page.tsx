"use client";
import { useParams } from 'next/navigation'
import React, { useContext } from 'react'
import DesignHeader from '../_components/DesignHeader';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Loader2 } from 'lucide-react';
import Sidebar from '../_components/Sidebar';
import CanvasEditor from '../_components/CanvasEditor';
import { CanvasContext } from '@/contexts/CanvasContext';
import { ICanvas } from '@/types/canvas';
import * as fabric from "fabric"
const DesignEditor = () => {
    const params = useParams();
    const designId = params.designId as Id<"designs">;
    const [canvasEditor, setCanvasEditor] = React.useState<fabric.Canvas | null>(null);

    const design = useQuery(api.design.GetDesignById, designId ? { id: designId } : 'skip');
    console.log({ design })
    // Handle loading state
    if (design === undefined) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p>Loading design...</p>
                </div>
            </div>
        );
    }

    // Handle case where design is not found
    if (design === null) {
        return (
            <div>
                <DesignHeader designInfo={design ?? null} />
                <div className="flex items-center justify-center min-h-[50vh]">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900">Design not found</h2>
                        <p className="text-gray-600 mt-2">The design you're looking for doesn't exist.</p>
                    </div>
                </div>
            </div>
        );
    }
    console.log({ design })

    return (
        <CanvasContext value={{ canvasEditor, setCanvasEditor }}>
            <DesignHeader designInfo={design} />
            <div className='flex'>
                <Sidebar />
                <CanvasEditor designInfo={design} />
            </div>
        </CanvasContext>
    )
}

export default DesignEditor

export const useCanvasHook = () => {
    const context = useContext(CanvasContext);
    if (!context) {
        throw new Error("Error")
    }

    return context
}