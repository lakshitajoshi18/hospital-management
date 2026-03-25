import React from "react"

import Sidebar from "./_components/Sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <Sidebar />
            <SidebarInset className="pb-20 md:pb-0">
                <div className="p-4 md:p-6">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default DashboardLayout