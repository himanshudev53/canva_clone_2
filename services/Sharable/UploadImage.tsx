import React from 'react'
import ImageKit from "imagekit";
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';
import { FabricImage } from 'fabric';
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';
const UploadImage = () => {
    const { designId } = useParams()
    const [isLoading, setIsLoading] = React.useState(false)
    const { canvasEditor } = useCanvasHook()
    var imagekit = new ImageKit({
        publicKey: String(process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY),
        privateKey: String(process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY),
        urlEndpoint: String(process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT)
    });
    const onFileUpload = async (e: any) => {
        setIsLoading(true)
        const file = e.target.files[0];
        const imageRef = await imagekit.upload({
            file: file,
            fileName: designId + "png",
            isPublished: true
        })
        const canvasImageRef = await FabricImage.fromURL(imageRef.url)
        // canvasImageRef?.set({
        //     width: 200,
        //     height: 200,
        // })
        canvasEditor?.add(canvasImageRef);
        canvasEditor?.renderAll()
        setIsLoading(false)
    }
    return (
        <div>
            <label htmlFor='upload_image'>
                <h1 className={`p-2 bg-primary text-white rounded-md text-center text-sm ${isLoading && "disabled:"}`} >
                    {isLoading ? <Loader2Icon /> : "Upload Image"}
                </h1>
            </label>
            <input type="file" id='upload_image' className='hidden' onChange={(onFileUpload)} />
        </div>
    )
}

export default UploadImage