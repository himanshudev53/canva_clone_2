import React from 'react'
import { AITransformationSettings } from '../Options'
import Image from 'next/image'
import CustomImageUpload from '../Sharable/CustomImageUpload'
const AiTransformSetting = () => {
    const [selectedAi, setSelectedAi] = React.useState<{
        name: string;
        command: string;
        image: string;
    }>()
    return (<div>
        <CustomImageUpload selectedAi={selectedAi} />
        <h2 className='my-2 font-bold'>AI Transformation</h2>
        <div className='grid grid-cols-2 gap-2'>
            {AITransformationSettings.map((option, i) => (<div key={i} onClick={() => setSelectedAi(option)}>
                <Image src={option.image} alt={option.name} width={500} height={500} className='w-full h-[70px] object-cover rounded-xl' />
                <div className='text-xs text-center my-4'>{option.name}</div>
            </div>))}
        </div>

    </div>
    )
}

export default AiTransformSetting
