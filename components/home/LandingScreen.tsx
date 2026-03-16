'use client';

import {
  ArrowRight,
  CalendarClock,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

import EmergencyDialogBox from "@/components/shared/EmergencyDialogBox";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const heroStats = [
  {
    value: "24/7",
    label: "Emergency response",
  },
  {
    value: "50+",
    label: "Specialist departments",
  },
  {
    value: "10k+",
    label: "Monthly patient visits",
  },
];

const galleryImages = [
  {
    src: "/hospital/OIP (1).jpg",
    alt: "Modern hospital building exterior",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/hospital/OIP (5).jpg",
    alt: "Doctor welcoming patients in a hospital",
    className: "md:col-span-1",
  },
  {
    src: "/hospital/OIP (7).jpg",
    alt: "Clean hospital hallway",
    className: "md:col-span-1",
  },
  {
    src: "/hospital/OIP (10).jpg",
    alt: "Calendar and stethoscope for medical appointments",
    className: "md:col-span-1",
  },
  {
    src: "/hospital/OIP (11).jpg",
    alt: "Advanced operation theatre in use",
    className: "md:col-span-2",
  },
];

const supportCards = [
  {
    icon: HeartPulse,
    title: "Critical care ready",
    description: "Real-time emergency coordination backed by specialist triage teams.",
  },
  {
    icon: CalendarClock,
    title: "Fast appointment flow",
    description: "Move from search to booking with a cleaner patient intake experience.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted hospital network",
    description: "Designed for safe care journeys across diagnostics, surgery, and recovery.",
  },
];

const LandingScreen = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.22),transparent_35%),linear-gradient(180deg,#f7fcff_0%,#ecf7fb_46%,#ffffff_100%)] text-slate-950"
    >
      <div className="absolute inset-x-0 top-0 z-0 h-64 bg-[linear-gradient(90deg,rgba(12,74,110,0.08),rgba(6,182,212,0.03),rgba(12,74,110,0.08))]" />
      <div className="absolute right-0 top-24 z-0 h-72 w-72 rounded-full bg-cyan-200/35 blur-3xl" />
      <div className="absolute left-0 top-52 z-0 h-64 w-64 rounded-full bg-sky-300/20 blur-3xl" />

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-[1.08fr_0.92fr] lg:py-16">
          <div className="relative z-10 max-w-2xl">
            <div
              id="about"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-sm font-medium text-cyan-800 shadow-sm backdrop-blur"
            >
              <span className="h-2 w-2 rounded-full bg-cyan-500" />
              Intelligent hospital access for modern care delivery
            </div>

            <div className="mt-6 space-y-6">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl lg:leading-[1.05]">
                One portal for faster treatment, smarter bookings, and immediate ambulance support.
              </h1>

              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                MEDISTREAM brings emergency response, doctor discovery, and hospital coordination into one calm,
                responsive experience for patients and care teams.
              </p>
            </div>

            <div id="appointment" className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <EmergencyDialogBox triggerClassName="h-12 rounded-full bg-rose-600 px-5 text-base font-semibold text-white shadow-[0_18px_40px_rgba(225,29,72,0.28)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-rose-500" />
              <a
                href="#care-gallery"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 rounded-full border-cyan-200 bg-white/80 px-5 text-base text-slate-800 shadow-sm backdrop-blur transition-transform duration-300 hover:-translate-y-0.5"
                )}
              >
                Explore Care Spaces
                <ArrowRight className="size-5" />
              </a>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/80 bg-white/72 p-4 shadow-[0_16px_50px_rgba(15,23,42,0.07)] backdrop-blur"
                >
                  <p className="text-2xl font-semibold text-slate-950">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {supportCards.map((card) => {
                const Icon = card.icon;

                return (
                  <div
                    key={card.title}
                    className="group rounded-[28px] border border-cyan-100 bg-white/68 p-5 shadow-[0_20px_45px_rgba(14,116,144,0.08)] backdrop-blur transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 transition-colors duration-300 group-hover:bg-cyan-700 group-hover:text-white">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-slate-900">{card.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{card.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
              <div className="group relative overflow-hidden rounded-[36px] border border-white/70 bg-white/75 p-3 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur md:min-h-140">
                <div className="relative h-85 overflow-hidden rounded-[28px] md:h-full">
                  <Image
                    src="/hospital/OIP (16).jpg"
                    alt="Digital hospital booking and consultation experience"
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-slate-950/10 to-transparent" />
                </div>
                <div className="absolute inset-x-8 bottom-8 rounded-[28px] border border-white/20 bg-slate-950/65 p-5 text-white shadow-2xl backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">Emergency Connect</p>
                  <h2 className="mt-2 text-2xl font-semibold">Immediate help with clear next steps</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    Surface urgent pathways for ambulance dispatch, doctor routing, and follow-up recovery planning.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
                <div className="group relative overflow-hidden rounded-[30px] border border-cyan-100 bg-white/80 p-3 shadow-[0_24px_70px_rgba(14,116,144,0.10)] backdrop-blur">
                  <div className="relative h-52 overflow-hidden rounded-[24px]">
                    <Image
                      src="/hospital/OIP (13).jpg"
                      alt="Medical team in surgical ward"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 22vw"
                    />
                  </div>
                  <p className="px-2 pb-2 pt-4 text-sm font-medium text-slate-700">
                    Specialist-led care, ready for complex situations.
                  </p>
                </div>

                <div className="group relative overflow-hidden rounded-[30px] border border-cyan-100 bg-white/80 p-3 shadow-[0_24px_70px_rgba(14,116,144,0.10)] backdrop-blur">
                  <div className="relative h-52 overflow-hidden rounded-[24px]">
                    <Image
                      src="/hospital/OIP (8).jpg"
                      alt="Modern patient room in hospital"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 22vw"
                    />
                  </div>
                  <p className="px-2 pb-2 pt-4 text-sm font-medium text-slate-700">
                    Comfortable inpatient spaces designed for recovery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="relative mt-2 rounded-[36px] border border-cyan-100/80 bg-white/70 p-5 shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6 lg:p-8"
        >
          <div id="care-gallery" className="absolute -top-24" />
          <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">Care Spaces</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950 sm:text-3xl">
                A visual journey through the MEDISTREAM experience
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Multiple environments, one connected portal: emergency entry, treatment zones, specialist teams, and calm
              recovery rooms.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4 md:auto-rows-[190px]">
            {galleryImages.map((image) => (
              <div
                key={image.src}
                className={cn(
                  "group relative overflow-hidden rounded-[28px] border border-white/80 bg-slate-100 shadow-[0_18px_60px_rgba(15,23,42,0.08)]",
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
        </div>
      </div>
    </section>
  );
};

export default LandingScreen;