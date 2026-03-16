"use client";

import { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Phone, Search, UserRound, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Appointment = {
    id: string;
    patientName: string;
    hospital: string;
    doctor: string;
    date: string;
    time: string;
    problem: string;
    mobile: string;
    status: "Confirmed" | "Pending" | "Completed";
};

const appointments: Appointment[] = [
    {
        id: "APT-1001",
        patientName: "Rohit Bisht",
        hospital: "City General Hospital",
        doctor: "Dr. Aarya Sharma",
        date: "2026-03-18",
        time: "10:30 AM",
        problem: "High fever and chest pain",
        mobile: "7896541230",
        status: "Confirmed",
    },
    {
        id: "APT-1009",
        patientName: "Rohit Bisht",
        hospital: "Metro Multispecialty Hospital",
        doctor: "Dr. Kabir Mehta",
        date: "2026-03-22",
        time: "04:00 PM",
        problem: "Follow-up orthopedic consultation",
        mobile: "7896541230",
        status: "Pending",
    },
    {
        id: "APT-1017",
        patientName: "Rohit Bisht",
        hospital: "Green Valley Hospital",
        doctor: "Dr. Neha Chawla",
        date: "2026-02-28",
        time: "11:15 AM",
        problem: "Skin allergy check",
        mobile: "7896541230",
        status: "Completed",
    },
    {
        id: "APT-1102",
        patientName: "Pooja Verma",
        hospital: "Apollo Medical Center",
        doctor: "Dr. Rhea Nair",
        date: "2026-03-20",
        time: "09:00 AM",
        problem: "Migraine episode",
        mobile: "9988776655",
        status: "Confirmed",
    },
];

const CheckAppointment = () => {
    const [mobileInput, setMobileInput] = useState("7896541230");
    const [searchedMobile, setSearchedMobile] = useState("7896541230");
    const [open, setOpen] = useState(false);

    const matchedAppointments = useMemo(
        () => appointments.filter((appointment) => appointment.mobile === searchedMobile.trim()),
        [searchedMobile]
    );

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSearchedMobile(mobileInput);
        setOpen(true);
    };

    return (
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.14),transparent_35%),linear-gradient(180deg,#f6fcff_0%,#ebf8fd_48%,#ffffff_100%)] px-4 py-14 sm:px-6 lg:px-8">
            <div className="absolute -left-24 top-12 h-64 w-64 rounded-full bg-cyan-200/35 blur-3xl" />
            <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />

            <div className="relative mx-auto w-full max-w-5xl">
                <Card className="rounded-[30px] border border-white/80 bg-white/75 py-0 shadow-[0_24px_80px_rgba(14,116,144,0.12)] backdrop-blur">
                    <CardHeader className="border-b border-cyan-100/80 pb-5 pt-6">
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge className="bg-cyan-100 text-cyan-800">
                                <Search className="size-3.5" />
                                Appointment Lookup
                            </Badge>
                            <Badge className="bg-sky-100 text-sky-800">
                                <CalendarDays className="size-3.5" />
                                Mobile-based search
                            </Badge>
                        </div>
                        <CardTitle className="pt-2 text-2xl text-slate-950 sm:text-3xl">Check Your Registered Appointments</CardTitle>
                        <CardDescription className="text-base text-slate-600">
                            Enter your mobile number and view appointment history instantly in a detailed dialog.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="p-5 sm:p-6">
                        <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
                            <div className="relative flex-1">
                                <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-cyan-600" />
                                <Input
                                    type="tel"
                                    value={mobileInput}
                                    onChange={(event) => setMobileInput(event.target.value)}
                                    placeholder="Enter mobile number"
                                    className="h-11 rounded-xl border-cyan-200 bg-white/90 pl-10 focus-visible:border-cyan-500 focus-visible:ring-cyan-500/30"
                                    required
                                />
                            </div>
                            <Button type="submit" className="h-11 rounded-xl bg-cyan-700 px-5 text-white hover:bg-cyan-800">
                                <Search className="size-4" />
                                Search Appointment
                            </Button>
                        </form>
                        <p className="mt-3 text-sm text-slate-600">
                            Demo data available for <span className="font-semibold text-cyan-800">7896541230</span>
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-h-[88vh] overflow-hidden border-cyan-100 bg-[linear-gradient(180deg,#f9fdff_0%,#f2faff_100%)] p-0 sm:max-w-4xl">
                    <DialogHeader className="border-b border-cyan-100 px-5 pb-4 pt-5 sm:px-6">
                        <DialogTitle className="text-xl text-slate-900 sm:text-2xl">Appointments for {searchedMobile}</DialogTitle>
                        <DialogDescription className="text-slate-600">
                            Matching records found: <span className="font-semibold text-cyan-800">{matchedAppointments.length}</span>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="px-5 py-4 sm:px-6">
                        <ScrollArea className="h-[56vh]">
                            {matchedAppointments.length > 0 ? (
                                <Table className="min-w-190">
                                    <TableHeader>
                                        <TableRow className="bg-cyan-50/70 hover:bg-cyan-50/70">
                                            <TableHead>Appointment ID</TableHead>
                                            <TableHead>Patient</TableHead>
                                            <TableHead>Hospital</TableHead>
                                            <TableHead>Doctor</TableHead>
                                            <TableHead>Date & Time</TableHead>
                                            <TableHead>Problem</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {matchedAppointments.map((appointment) => (
                                            <TableRow key={appointment.id} className="hover:bg-cyan-50/40">
                                                <TableCell className="font-medium text-slate-800">{appointment.id}</TableCell>
                                                <TableCell>
                                                    <span className="inline-flex items-center gap-1.5 text-slate-700">
                                                        <UserRound className="size-4 text-cyan-700" />
                                                        {appointment.patientName}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-slate-700">{appointment.hospital}</TableCell>
                                                <TableCell className="text-slate-700">{appointment.doctor}</TableCell>
                                                <TableCell className="text-slate-700">
                                                    {appointment.date}
                                                    <span className="text-slate-500"> ({appointment.time})</span>
                                                </TableCell>
                                                <TableCell className="max-w-55 truncate text-slate-700">{appointment.problem}</TableCell>
                                                <TableCell>
                                                    {appointment.status === "Confirmed" && (
                                                        <Badge className="bg-emerald-100 text-emerald-700">
                                                            <CheckCircle2 className="size-3.5" />
                                                            Confirmed
                                                        </Badge>
                                                    )}
                                                    {appointment.status === "Pending" && (
                                                        <Badge className="bg-amber-100 text-amber-700">Pending</Badge>
                                                    )}
                                                    {appointment.status === "Completed" && (
                                                        <Badge className="bg-cyan-100 text-cyan-700">Completed</Badge>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <div className="flex h-[44vh] flex-col items-center justify-center rounded-2xl border border-dashed border-cyan-200 bg-white/85 p-6 text-center">
                                    <XCircle className="size-10 text-cyan-700" />
                                    <h3 className="mt-3 text-lg font-semibold text-slate-900">No appointments found</h3>
                                    <p className="mt-1 text-sm text-slate-600">
                                        No records registered with <span className="font-medium text-cyan-800">{searchedMobile}</span>.
                                    </p>
                                    <p className="mt-1 text-sm text-slate-600">
                                        Try searching with <span className="font-semibold text-cyan-800">7896541230</span> for demo results.
                                    </p>
                                </div>
                            )}
                        </ScrollArea>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default CheckAppointment;