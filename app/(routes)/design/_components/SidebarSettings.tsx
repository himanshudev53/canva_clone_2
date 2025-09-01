import { LucideProps } from 'lucide-react';
import React from 'react'

const SidebarSettings = ({ selectedOption }: {
    selectedOption: {
        name: string;
        desc: string;
        icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        component: React.ReactNode
    }
}) => {
    return (
        <div className='w-[280px] p-5 h-screen border-r'>
            <h2 className='font-bold'>{selectedOption.name}</h2>
            <p className='text-sm text-gray-500'>{selectedOption.desc}</p>
            <div className='mt-4'>

                {selectedOption.component}
            </div>
        </div>
    )
}

export default SidebarSettings
