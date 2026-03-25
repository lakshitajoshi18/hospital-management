"use client"

import {
    CalendarDays,
    LayoutDashboard,
    Stethoscope,
    UserRound,
    Users
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { buttonVariants } from "@/components/ui/button"
import {
    Sidebar as AppSidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const doctorMenuItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Today\'s Appointment",
        href: "/dashboard/todays-appointments",
        icon: CalendarDays,
    },
    {
        title: "Appointed Patients",
        href: "/dashboard/appointed-patients",
        icon: Users,
    },
    {
        title: "Profile",
        href: "/dashboard/profile",
        icon: UserRound,
    },
]

const quickMenuItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Appointments",
        href: "/dashboard/todays-appointments",
        icon: CalendarDays,
    },
    {
        title: "Patients",
        href: "/dashboard/appointed-patients",
        icon: Users,
    },
    {
        title: "Profile",
        href: "/dashboard/profile",
        icon: UserRound,
    },
]

const isItemActive = (pathname: string, href: string) => {
    if (href === "/dashboard") {
        return pathname === href
    }

    return pathname === href || pathname.startsWith(`${href}/`)
}

const Sidebar = () => {
    const pathname = usePathname()

    return (
        <>
            <AppSidebar
                collapsible="none"
                className="hidden border-r md:sticky md:top-0 md:flex md:h-svh md:w-72 md:shrink-0"
            >
                <SidebarHeader className="border-b p-4">
                    <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                            <Stethoscope className="size-5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Doctor Panel</p>
                            <p className="text-xs text-muted-foreground">Manage your day</p>
                        </div>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {doctorMenuItems.map((item) => {
                                    const Icon = item.icon
                                    const isActive = isItemActive(pathname, item.href)

                                    return (
                                        <SidebarMenuItem key={item.href}>
                                            <SidebarMenuButton
                                                isActive={isActive}
                                                render={<Link href={item.href} />}
                                            >
                                                <Icon />
                                                <span>{item.title}</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </AppSidebar>

            <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 px-2 py-2 backdrop-blur-sm md:hidden">
                <ul className="grid grid-cols-4 gap-1">
                    {quickMenuItems.map((item) => {
                        const Icon = item.icon
                        const isActive = isItemActive(pathname, item.href)

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        buttonVariants({ variant: isActive ? "default" : "ghost", size: "sm" }),
                                        "h-12 w-full flex-col gap-1 rounded-md px-1 text-[11px]"
                                    )}
                                >
                                    <Icon className="size-4" />
                                    <span className="truncate">{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </>
    )
}

export default Sidebar