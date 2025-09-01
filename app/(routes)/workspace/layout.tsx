import React, { ReactNode } from 'react'
import WorkSpaceHeader from './_components/WorkSpaceHeader'
import Sidebar from './_components/Sidebar'

const WorkSpaceLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <WorkSpaceHeader />
            <div className="flex">
                <Sidebar />
                {children}
            </div>
        </div>
    )
}

export default WorkSpaceLayout