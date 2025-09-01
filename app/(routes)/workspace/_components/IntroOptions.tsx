"use client"
import { UserDetailContext } from '@/contexts/UserDetailsContext';
import { api } from '@/convex/_generated/api';
import { canvasSizeOptions } from '@/services/Options'
import { useMutation } from 'convex/react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { toast } from 'sonner';

const IntroOptions = () => {
    const { userDetail } = useContext(UserDetailContext);
    const createNewDesignRecord = useMutation(api.design.CreateNewDesign);
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const OnCanvasOptionSelect = async (option: {
        name: string;
        width: number;
        height: number;
        icon: string;
    }) => {
        // Check if userDetail is loaded
        if (!userDetail?._id) {
            toast.error("Please wait for user data to load");
            return;
        }

        setLoading(true);
        toast.loading("Creating new design...");

        try {
            const result = await createNewDesignRecord({
                name: option.name,
                width: option.width,
                height: option.height,
                uid: userDetail._id
            });

            toast.success("Design created successfully!");
            console.log("Design created:", result);

            // You might want to navigate to the design editor here
            router.push(`/design/${result}`);

        } catch (error) {
            console.error("Failed to create design:", error);
            toast.error("Failed to create design");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className='relative'>
                <Image
                    src={"/banner-home.png"}
                    alt='banner'
                    width={1800}
                    className='w-full h-[200px] object-cover rounded-2xl'
                    height={300}
                />
                <h1 className='text-3xl absolute bottom-10 left-10 text-white'>Work Space</h1>
            </div>

            <div className='flex gap-6 items-center mt-10 justify-center'>
                {canvasSizeOptions.map((option, i) => (
                    <div
                        key={i}
                        className={`flex flex-col items-center cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                            } transition-all`}
                        onClick={() => !loading && OnCanvasOptionSelect(option)}
                    >
                        <Image
                            src={option.icon}
                            alt={option.name}
                            width={100}
                            height={100}
                            className={loading ? 'animate-pulse' : ''}
                        />
                        <h2 className='text-xs mt-2 font-medium'>{option.name}</h2>
                    </div>
                ))}
            </div>

            {/* Loading overlay */}
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="text-white text-lg">Creating design...</div>
                </div>
            )}
        </div>
    )
}

export default IntroOptions