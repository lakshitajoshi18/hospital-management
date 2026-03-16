'use client'
import Link from "next/link";
import { Ambulance, ArrowUpRight, Clock3, HeartPulse, PhoneCall } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const primaryLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Doctors", href: "#doctors" },
    { label: "Appointment", href: "#appointment" },
    { label: "Login", href: "/login" },
];

const supportLinks = [
    { label: "Emergency Help", href: "tel:108" },
    { label: "Care Spaces", href: "#care-gallery" },
    { label: "Patient Stories", href: "#" },
    { label: "Health Packages", href: "#" },
    { label: "Insurance Support", href: "#" },
];

const legalLinks = [
    { label: "Terms", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Cookies", href: "#" },
];

const Footer = () => {
    return (
        <footer className="relative overflow-hidden bg-[linear-gradient(180deg,#0e2236_0%,#0a1a2b_100%)] px-4 pb-8 pt-12 text-slate-100 sm:px-6 lg:px-8">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-400/70 to-transparent" />
            <div className="absolute -left-16 top-12 h-48 w-48 rounded-full bg-cyan-500/25 blur-3xl" />
            <div className="absolute -right-16 bottom-10 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />

            <div className="relative mx-auto w-full max-w-7xl">
                <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr_1fr]">
                    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-500 via-sky-500 to-emerald-400 text-sm font-bold tracking-[0.2em] text-white">
                                M
                            </div>
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200">MEDISTREAM</p>
                                <p className="text-xs text-slate-300">Care coordination portal</p>
                            </div>
                        </div>

                        <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
                            A connected hospital experience for emergency support, specialist discovery, and appointment journeys.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                            <Badge className="bg-cyan-500/25 text-cyan-100">
                                <Clock3 className="size-3.5" />
                                24/7 emergency active
                            </Badge>
                            <Badge className="bg-emerald-500/25 text-emerald-100">
                                <HeartPulse className="size-3.5" />
                                Verified care network
                            </Badge>
                        </div>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="tel:108"
                                className={cn(
                                    buttonVariants({ size: "lg" }),
                                    "h-11 rounded-full bg-rose-600 px-4 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(225,29,72,0.35)] hover:bg-rose-500"
                                )}
                            >
                                <Ambulance className="size-4.5" />
                                Ambulance
                            </Link>
                            <Link
                                href="/login"
                                className={cn(
                                    buttonVariants({ variant: "outline", size: "lg" }),
                                    "h-11 rounded-full border-cyan-200/60 bg-transparent px-4 text-sm text-cyan-100 hover:bg-cyan-500/10"
                                )}
                            >
                                Go to Portal
                                <ArrowUpRight className="size-4.5" />
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
                        <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Navigation</h3>
                        <ul className="mt-4 space-y-2">
                            {primaryLinks.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="group flex items-center justify-between rounded-xl px-3 py-2 text-sm text-slate-200 transition-colors duration-300 hover:bg-white/10 hover:text-white"
                                    >
                                        {item.label}
                                        <ArrowUpRight className="size-4 translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
                        <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Support</h3>
                        <ul className="mt-4 space-y-2">
                            {supportLinks.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="group flex items-center justify-between rounded-xl px-3 py-2 text-sm text-slate-200 transition-colors duration-300 hover:bg-white/10 hover:text-white"
                                    >
                                        {item.label}
                                        <ArrowUpRight className="size-4 translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-8 rounded-[22px] border border-white/10 bg-white/4 px-4 py-3 backdrop-blur sm:px-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-slate-300">
                            Copyright {new Date().getFullYear()} MEDISTREAM. Built for faster and safer care access.
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                            {legalLinks.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-slate-300 transition-colors duration-300 hover:bg-white/10 hover:text-white"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Link
                                href="tel:108"
                                className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/20 px-3 py-1.5 text-xs font-medium text-cyan-100 transition-colors duration-300 hover:bg-cyan-500/35"
                            >
                                <PhoneCall className="size-3.5" />
                                Helpline
                            </Link>
                        </div>
                    </div>
                    <Separator className="mt-3 bg-white/10" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;