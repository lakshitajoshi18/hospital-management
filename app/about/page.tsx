'use client'
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, CalendarClock, ShieldCheck, UsersRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const highlights = [
    {
        icon: Building2,
        title: "Connected Hospitals",
        description: "Bringing public and private care partners into one smart healthcare network.",
    },
    {
        icon: CalendarClock,
        title: "Faster Appointments",
        description: "Reducing patient waiting time through cleaner digital triage and scheduling.",
    },
    {
        icon: ShieldCheck,
        title: "Reliable Response",
        description: "Emergency-first routing built for urgent care, follow-ups, and recovery journeys.",
    },
];

const impactStats = [
    { value: "75+", label: "Partnered specialists" },
    { value: "24/7", label: "Emergency coordination" },
    { value: "18k+", label: "Monthly support requests" },
    { value: "96%", label: "Patient satisfaction" },
];

const galleryImages = [
    { src: "/hospital/OIP (1).jpg", alt: "Hospital exterior", className: "md:col-span-2 md:row-span-2" },
    { src: "/hospital/OIP (5).jpg", alt: "Doctors team", className: "md:col-span-1" },
    { src: "/hospital/OIP (7).jpg", alt: "Hospital hallway", className: "md:col-span-1" },
    { src: "/hospital/OIP (11).jpg", alt: "Surgery room", className: "md:col-span-2" },
    { src: "/hospital/OIP (8).jpg", alt: "Patient room", className: "md:col-span-1" },
];

const AboutPage = () => {
    return (
        <main className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.2),transparent_35%),linear-gradient(180deg,#f7fcff_0%,#edf8fd_48%,#ffffff_100%)] px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-12">
            <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan-200/35 blur-3xl" />
            <div className="absolute -right-20 top-40 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />

            <div className="relative mx-auto w-full max-w-7xl space-y-10">
                <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                    <div className="space-y-6">
                        <Badge className="bg-cyan-100 text-cyan-800">About MEDISTREAM</Badge>
                        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl lg:leading-[1.05]">
                            A healthcare portal focused on speed, trust, and coordinated patient care.
                        </h1>
                        <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                            MEDISTREAM was built to simplify how patients discover hospitals, connect with doctors, and access emergency
                            support across one unified platform.
                        </p>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/"
                                className={cn(
                                    buttonVariants({ size: "lg" }),
                                    "h-11 rounded-full bg-cyan-700 px-5 text-white hover:bg-cyan-800"
                                )}
                            >
                                Back To Home
                            </Link>
                            <Link
                                href="/#patient-form"
                                className={cn(
                                    buttonVariants({ variant: "outline", size: "lg" }),
                                    "h-11 rounded-full border-cyan-200 bg-white/80 px-5 text-slate-800 hover:bg-cyan-50"
                                )}
                            >
                                Book Appointment
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="group relative overflow-hidden rounded-[34px] border border-white/80 bg-white/75 p-3 shadow-[0_28px_90px_rgba(15,23,42,0.12)] backdrop-blur">
                        <div className="relative h-85 overflow-hidden rounded-[26px] sm:h-105">
                            <Image
                                src="/hospital/OIP (16).jpg"
                                alt="Digital healthcare interaction"
                                fill
                                priority
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 45vw"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-slate-950/55 via-slate-950/15 to-transparent" />
                            <div className="absolute bottom-5 left-5 rounded-2xl border border-white/20 bg-slate-950/55 p-4 text-white backdrop-blur">
                                <p className="text-xs uppercase tracking-[0.26em] text-cyan-200">Healthcare Vision</p>
                                <p className="mt-1 text-lg font-semibold">One network, many care pathways</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {impactStats.map((stat) => (
                        <Card
                            key={stat.label}
                            className="rounded-[22px] border border-white/80 bg-white/72 py-0 shadow-[0_16px_55px_rgba(14,116,144,0.10)] backdrop-blur"
                        >
                            <CardContent className="p-5">
                                <p className="text-3xl font-semibold text-slate-950">{stat.value}</p>
                                <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
                            </CardContent>
                        </Card>
                    ))}
                </section>

                <section className="grid gap-4 md:grid-cols-3">
                    {highlights.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Card
                                key={item.title}
                                className="group rounded-[24px] border border-cyan-100 bg-white/75 py-0 shadow-[0_18px_60px_rgba(14,116,144,0.10)] backdrop-blur transition-transform duration-300 hover:-translate-y-1"
                            >
                                <CardHeader className="pt-5">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 transition-colors duration-300 group-hover:bg-cyan-700 group-hover:text-white">
                                        <Icon className="size-5" />
                                    </div>
                                    <CardTitle className="pt-3 text-xl text-slate-900">{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="pb-5 text-sm leading-6 text-slate-600">{item.description}</CardContent>
                            </Card>
                        );
                    })}
                </section>

                <section className="rounded-[34px] border border-cyan-100/80 bg-white/70 p-5 shadow-[0_20px_80px_rgba(15,23,42,0.09)] backdrop-blur sm:p-6 lg:p-8">
                    <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">Inside MEDISTREAM</p>
                            <h2 className="mt-2 text-2xl font-semibold text-slate-950 sm:text-3xl">A closer look at our care ecosystem</h2>
                        </div>
                        <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                            From hospital infrastructure to specialist teams and surgical units, our network is designed to keep care
                            journeys connected and transparent.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-4 md:auto-rows-[190px]">
                        {galleryImages.map((image) => (
                            <div
                                key={image.src}
                                className={cn(
                                    "group relative overflow-hidden rounded-[26px] border border-white/80 bg-slate-100 shadow-[0_18px_60px_rgba(15,23,42,0.08)]",
                                    image.className
                                )}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-slate-950/45 via-slate-950/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                                <div className="absolute inset-x-4 bottom-4 translate-y-2 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                    {image.alt}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="rounded-[30px] border border-cyan-100/80 bg-white/72 p-6 text-center shadow-[0_18px_60px_rgba(14,116,144,0.08)] backdrop-blur sm:p-8">
                    <div className="mx-auto max-w-3xl">
                        <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-cyan-100 px-3 py-1 text-xs font-medium text-cyan-800">
                            <UsersRound className="size-3.5" />
                            People-first healthcare technology
                        </p>
                        <h3 className="mt-4 text-2xl font-semibold text-slate-950 sm:text-3xl">Built to support every step of patient care</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                            MEDISTREAM continues to evolve with hospitals, doctors, and patients to deliver faster access and better
                            treatment outcomes.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default AboutPage;