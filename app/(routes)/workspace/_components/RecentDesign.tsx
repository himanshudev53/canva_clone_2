"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image'
import React, { useContext } from 'react'
import CustomCanvasDialog from './CustomCanvasDialog';
import { UserDetailContext } from '@/contexts/UserDetailsContext';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

interface R {
    _creationTime: number
    _id: string
    height: number
    name: string
    uid: string
    width: number
    jsonTemplate: any
}
const RecentDesign = () => {
    const [designList, setDesignList] = React.useState<Array<R>>([])
    const { userDetail } = useContext(UserDetailContext)
    const convex = useConvex()

    const GetRecentDesigns = async () => {
        const result = await convex.query(api.design.GetDesignBuUserId, {
            uid: userDetail?._id as Id<"users">
        })
        console.log({ result });
        setDesignList(result)
    }
    React.useEffect(() => {
        userDetail && GetRecentDesigns()
    }, [userDetail])
    return (
        <div className='mt-7'>
            <h1 className='font-bold text-2xl'>Recent Design</h1>
            {
                designList.length == 0 ? <div className='flex flex-col gap-4 items-center'>
                    <Image src={"/edittool.png"} alt={"edit"} width={100} height={100} />
                    <h2 className='text-center'>You don't have any design created. Create new one!</h2>
                    <CustomCanvasDialog>
                        <Button>Create New</Button>
                    </CustomCanvasDialog>
                </div> : <div>

                    {designList.map((item, i) => <div key={i}>
                        {item.name}
                    </div>)}
                </div>
            }
        </div>
    )
}

export default RecentDesign