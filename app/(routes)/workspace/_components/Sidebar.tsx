"use client";
import { CirclePlus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import CustomCanvasDialog from "./CustomCanvasDialog";
import { WorkspaceMenu } from "@/services/Options";

const Sidebar = () => {
    const path = usePathname();
    const router = useRouter();

    return (
        <div className="h-screen shadow-sm p-2 bg-purple-50">
            {/* Create Button */}
            <CustomCanvasDialog>
                <div
                    className="p-2 flex items-center flex-col hover:cursor-pointer mb-5"
                // onClick={() => router.push("/create")} // ✅ example route
                >
                    <CirclePlus className="bg-purple-600 text-white rounded-full h-8 w-8" />
                    <div className="text-sm text-purple-600">Create</div>
                </div>
            </CustomCanvasDialog>

            {/* Menu */}
            {WorkspaceMenu.map((menu, i) => (
                <div
                    key={i}
                    className={`p-2 cursor-pointer flex items-center flex-col group mb-4 hover:bg-purple-100 rounded-xl ${path === menu.path && "bg-purple-100"
                        }`}
                    onClick={() => router.push(menu.path)} // ✅ navigate here
                >
                    <menu.icon
                        className={`group-hover:text-purple-800 ${path === menu.path && "text-purple-800"
                            }`}
                    />
                    <div
                        className={`group-hover:text-purple-800 text-sm ${path === menu.path && "text-purple-800"
                            }`}
                    >
                        {menu.name}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
