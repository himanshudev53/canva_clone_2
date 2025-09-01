"use client";

import Logo from "@/Logo";
import { UserButton } from "@stackframe/stack";
import React from "react";

const WorkSpaceHeader = () => {
    return (
        <header className="w-full flex items-center justify-between px-6 py-3 bg-white shadow-sm border-b border-gray-200">
            {/* Left: Logo */}
            <div className="flex items-center space-x-2">
                <Logo />
                <span className="text-xl font-semibold text-gray-800">Workspace</span>
            </div>

            {/* Right: User */}
            <div className="flex items-center space-x-4">
                <UserButton />
            </div>
        </header>
    );
};

export default WorkSpaceHeader;
