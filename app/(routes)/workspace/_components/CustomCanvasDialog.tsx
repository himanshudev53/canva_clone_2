"use client"
import React, { ReactNode, useContext } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { UserDetailContext } from '@/contexts/UserDetailsContext'
import { toast } from 'sonner'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'

const CustomCanvasDialog = ({ children }: { children: ReactNode }) => {
    const [design, setDesign] = React.useState({
        name: '',
        height: 0,
        width: 0
    })
    const createNewDesignRecord = useMutation(api.design.CreateNewDesign);
    const [loading, setLoading] = React.useState(false);
    const router = useRouter()

    const { userDetail } = useContext(UserDetailContext)

    const handleInputChange = (field: keyof typeof design, value: string | number) => {
        setDesign(prev => ({
            ...prev,
            [field]: typeof value === 'string' ? value : Number(value)
        }))
    }

    const handleCreate = async () => {
        if (!userDetail?._id) {
            toast.error("Please wait for user data to load");
            return;
        }

        if (!design.name.trim() || design.height <= 0 || design.width <= 0) {
            toast.error("Please provide valid design details");
            return;
        }

        setLoading(true);
        const toastId = toast.loading("Creating new design...");

        try {
            const result = await createNewDesignRecord({
                name: design.name.trim(),
                width: Number(design.width),
                height: Number(design.height),
                uid: userDetail._id
            });

            toast.success("Design created successfully!", { id: toastId });
            console.log("Design created:", result);

            // Reset form
            setDesign({
                name: '',
                height: 0,
                width: 0
            });

            // You might want to navigate to the design editor here
            router.push(`/design/${result}`);

        } catch (error) {
            console.error("Failed to create design:", error);
            toast.error("Failed to create design", { id: toastId });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create custom canvas</DialogTitle>
                    <DialogDescription>
                        Provide canvas height and width
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-5 space-y-5">
                    <div>
                        <label htmlFor="display-name" className="text-sm font-medium">
                            Display Name *
                        </label>
                        <Input
                            id="display-name"
                            className="mt-1 w-full"
                            placeholder="Display Name"
                            value={design.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <div className="flex gap-5">
                        <div className="w-full">
                            <label htmlFor="width" className="text-sm font-medium">
                                Width (px) *
                            </label>
                            <Input
                                id="width"
                                type="number"
                                min="1"
                                className="mt-1 w-full"
                                placeholder="500"
                                value={design.width || ''}
                                onChange={(e) => handleInputChange('width', e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        <div className="w-full">
                            <label htmlFor="height" className="text-sm font-medium">
                                Height (px) *
                            </label>
                            <Input
                                id="height"
                                type="number"
                                min="1"
                                className="mt-1 w-full"
                                placeholder="500"
                                value={design.height || ''}
                                onChange={(e) => handleInputChange('height', e.target.value)}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end w-full">
                        <Button
                            className="w-full"
                            onClick={handleCreate}
                            disabled={loading || !design.name.trim() || design.height <= 0 || design.width <= 0}
                        >
                            {loading ? <Loader2Icon className='animate-spin w-5 h-5' /> : "Create"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CustomCanvasDialog