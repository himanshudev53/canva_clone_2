import React from 'react'
import { TextSettingsList } from '../Options'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Trash } from 'lucide-react'
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'
import FontStyles from '../Sharable/FontStyles'

const TextSettingsNavbar = () => {
    const { canvasEditor } = useCanvasHook();
    const [show, setShow] = React.useState<boolean>(false);
    const onDelete = () => {
        const activeObject = canvasEditor?.getActiveObject();
        if (activeObject) {
            canvasEditor?.remove(activeObject);
            setShow(true);

        }
    }
    return (
        <div className='flex gap-6'>
            {TextSettingsList.map((item, i) => <div className='hover:scale-105 transition-all cursor-pointer' key={i}>
                <Popover>
                    <PopoverTrigger asChild>
                        <item.icon />
                    </PopoverTrigger>
                    <PopoverContent>{item.component}</PopoverContent>
                </Popover>
            </div>)}
            <FontStyles />
            <Trash className='cursor-pointer' onClick={onDelete} />
        </div>
    )
}

export default TextSettingsNavbar