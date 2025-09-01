import React from 'react'
import { shapesSettingsList } from '../Options'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
const ShapSettings = () => {
    return (
        <div className='flex gap-6'>
            {shapesSettingsList.map((item, i) => <div className='hover:scale-105 transition-all cursor-pointer' key={i}>
                <Popover>
                    <PopoverTrigger asChild>
                        <item.icon />
                    </PopoverTrigger>
                    <PopoverContent>{item.component}</PopoverContent>
                </Popover>
            </div>)}
        </div>
    )
}

export default ShapSettings