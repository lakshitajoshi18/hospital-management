"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import EmergencyDialogBox from "./EmergencyDialogBox";
import Image from "next/image";
import { useDoctorStore } from "@/store/doctor.store";

const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Doctors", href: "/#doctors" },
    { label: "Appointment", href: "/#appointment" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useDoctorStore();

    return (
        <header className="sticky top-4 z-50">
            <nav className="rounded-[32px] border border-white/70 bg-white/70 px-4 py-3 shadow-[0_20px_55px_rgba(14,116,144,0.12)] backdrop-blur-xl sm:px-5 lg:px-6">
                <div className="flex items-center justify-between gap-4">
                    <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setIsOpen(false)}>
                        <Image
                            src="/hospital/logo.png"
                            alt="Hospital logo"
                            width={56}
                            height={56}
                            priority
                            className="h-12 w-auto object-contain"
                        />
                        <div className="hidden min-w-0 sm:block">
                            <h1 className="bg-linear-to-r from-cyan-600 via-blue-600 to-cyan-700 bg-clip-text text-lg font-bold text-transparent transition-all duration-300 hover:scale-105 hover:via-blue-500 cursor-pointer">MEDISTREAM</h1>
                        </div>
                    </Link>

                    <div className="hidden items-center gap-1 rounded-full border border-cyan-100 bg-white/80 p-1 lg:flex">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-300 hover:bg-cyan-50 hover:text-cyan-800"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden items-center gap-3 lg:flex">
                        <EmergencyDialogBox />
                        {
                            user ? (
                                <Link
                                    href="/dashboard"
                                    className={
                                        cn(
                                            buttonVariants({ size: "lg" }),
                                            "h-11 rounded-full bg-slate-950 px-5 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-cyan-800"
                                        )}
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    className={
                                        cn(
                                            buttonVariants({ size: "lg" }),
                                            "h-11 rounded-full bg-slate-950 px-5 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-cyan-800"
                                        )}
                                >
                                    Staff Login
                                </Link>

                            )
                        }
                    </div>

                    <button
                        type="button"
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                        onClick={() => setIsOpen((open) => !open)}
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-100 bg-white/85 text-slate-800 shadow-sm transition-colors duration-300 hover:bg-cyan-50 lg:hidden"
                    >
                        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                    </button>
                </div>

                <div
                    className={cn(
                        "grid overflow-hidden transition-all duration-300 lg:hidden",
                        isOpen ? "grid-rows-[1fr] pt-4 opacity-100" : "grid-rows-[0fr] pt-0 opacity-0"
                    )}
                >
                    <div className="overflow-hidden">
                        <div className="space-y-3 rounded-[28px] border border-cyan-100 bg-white/80 p-4 shadow-[0_18px_45px_rgba(14,116,144,0.08)]">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors duration-300 hover:bg-cyan-50 hover:text-cyan-800"
                                >
                                    {item.label}
                                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-500/70" />
                                </Link>
                            ))}
                            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                                <EmergencyDialogBox />
                                {
                                    user ? (
                                        <Link
                                            href="/dashboard"
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                buttonVariants({ size: "lg" }),
                                                "h-11 rounded-full bg-slate-950 px-5 text-sm font-semibold text-white hover:bg-cyan-800"
                                            )}
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (

                                        <Link
                                            href="/login"
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                buttonVariants({ size: "lg" }),
                                                "h-11 rounded-full bg-slate-950 px-5 text-sm font-semibold text-white hover:bg-cyan-800"
                                            )}
                                        >
                                            Staff Login
                                        </Link>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header >
    );
};

export default Navbar;