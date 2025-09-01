"use client";
import { sideBarMenu } from '@/services/Options'
import React from 'react'
import SidebarSettings from './SidebarSettings';
import { LayoutTemplate, LucideProps } from 'lucide-react';
import TemplatesList from '@/services/Components/TemplatesList';

const Sidebar = () => {
    const [selectedOption, setSelectedOption] = React.useState<{
        name: string;
        desc: string;
        icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        component: React.ReactNode
    }>({
        name: 'Templates',
        desc: 'Select Prebuild Template',
        icon: LayoutTemplate,
        component: <TemplatesList />
    })
    return (
        <div className='flex'>

            <div className='p-2  w-[120px] border-r h-screen pt-5 bg-background'>
                {sideBarMenu.map((menu, i) => (
                    <div
                        key={i}
                        className={`p-3 mb-2 flex flex-col items-center hover:bg-secondary rounded-lg transition-colors cursor-pointer group
                    ${menu.name == selectedOption.name && "bg-secondary"}
                    `}
                        onClick={() => {
                            setSelectedOption(menu)
                        }}
                    >
                        <menu.icon className='w-5 h-5 text-muted-foreground group-hover:text-foreground' />
                        <span className='text-xs mt-1 text-muted-foreground group-hover:text-foreground text-center'>
                            {menu.name}
                        </span>
                    </div>
                ))}
            </div>

            <SidebarSettings selectedOption={selectedOption} />
        </div>
    )
}

export default Sidebar