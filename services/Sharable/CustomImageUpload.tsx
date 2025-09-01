"use client";
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';
import { Button } from '@/components/ui/button'
import { FabricImage } from 'fabric';
import ImageKit from 'imagekit'
import { ImageUp, Loader } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { FC, useEffect, useState, useMemo } from 'react'


interface ICustomImageUpload {
    selectedAi: {
        name: string;
        command: string;
        image: string;
    }
}


const CustomImageUpload: FC<ICustomImageUpload> = ({ selectedAi }: ICustomImageUpload) => {
    const [image, setImage] = useState<string | null>(null)
    const [baseImageUrl, setBaseImageUrl] = useState<string | null>(null) // to keep pristine url without AI command
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { designId } = useParams()
    const { canvasEditor } = useCanvasHook()

    const imagekit = useMemo(() => new ImageKit({
        publicKey: String(process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY),
        privateKey: String(process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY),
        urlEndpoint: String(process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT)
    }), [])


    const onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return
        setIsLoading(true)
        const file = e.target.files[0]
        try {
            const imageRef = await imagekit.upload({
                file,
                fileName: `${designId}.png`,
                isPublished: true,
            })
            setBaseImageUrl(imageRef.url) // save bare url first
            setImage(imageRef.url) // initially same as base URL
            console.log('Uploaded image URL:', imageRef.url)
        } catch (error) {
            console.error('Upload error:', error)
        } finally {
            setIsLoading(false)
        }
    }


    // Update image URL whenever selectedAi.command or baseImageUrl changes
    useEffect(() => {
        if (baseImageUrl && selectedAi?.command) {
            const separator = baseImageUrl.includes('?tr=') ? ',' : '?tr='
            setImage(baseImageUrl + separator + selectedAi.command)
        }
    }, [baseImageUrl, selectedAi])


    const onAddToCanvas = async () => {
        if (!image) return
        setIsLoading(true)
        try {
            const fabricImage = await FabricImage.fromURL(image)
            canvasEditor?.add(fabricImage)
            canvasEditor?.renderAll()
            console.log('Image added to canvas')
            // Optionally reset or keep the image for further actions:
            // setImage(null)
            // setBaseImageUrl(null)
        } catch (error) {
            console.error('Error adding image to canvas:', error)
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <div>
            {image ? (
                <label htmlFor='custom_image_upload' className='cursor-pointer block'>
                    <Image
                        src={image}
                        alt='Uploaded image'
                        width={300}
                        height={300}
                        className='w-full h-[150px] rounded-lg object-contain'
                        unoptimized={true}
                    />
                </label>
            ) : (
                <label
                    htmlFor='custom_image_upload'
                    className='bg-secondary p-4 flex flex-col items-center justify-center rounded-xl h-[100px] cursor-pointer'
                >
                    <ImageUp />
                    <h2 className='text-xs text-center'>Upload Image</h2>
                </label>
            )}

            <input
                type='file'
                id='custom_image_upload'
                className='hidden'
                onChange={onFileUpload}
                disabled={isLoading}
                accept='image/*'
            />

            {image && (
                <Button
                    onClick={onAddToCanvas}
                    className='w-full my-2'
                    size='sm'
                    disabled={isLoading}
                >
                    {isLoading ? <Loader className='animate-spin' /> : null}
                    Add to canvas
                </Button>
            )}
        </div>
    )
}


export default CustomImageUpload
