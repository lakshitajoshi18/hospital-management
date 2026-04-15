'use client'
import { ArrowRight, Building2, Clock3, ShieldCheck, Stethoscope } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { usePatientStore } from "@/store/patient.store";
import { useEffect } from "react";

const ListOfDoctors = () => {
    const {doctorList, getDoctorList} = usePatientStore();
    useEffect(() => {
        doctorList.length === 0 && getDoctorList();
    }, [])
    return (
        <section
            id="doctors"
            className="relative bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.14),transparent_36%),linear-gradient(180deg,#f4fbff_0%,#ffffff_42%,#f8fdff_100%)] px-4 py-16 sm:px-6 lg:px-8"
        >
            <div className="mx-auto w-full max-w-7xl">
                <div className="mb-8 flex flex-col gap-4 sm:mb-10 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">Doctors Directory</p>
                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                            Find a specialist in seconds
                        </h2>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                            Explore verified doctors by hospital, specialization, and years of clinical experience.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="border-cyan-200 bg-white/80 px-3 py-1 text-cyan-800">
                            <ShieldCheck className="size-3.5" />
                            10 Verified Profiles
                        </Badge>
                        <Badge variant="outline" className="border-cyan-200 bg-white/80 px-3 py-1 text-cyan-800">
                            <Stethoscope className="size-3.5" />
                            Multi-speciality network
                        </Badge>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {doctorList.map((doctor) => (
                        <Card
                            key={doctor.id}
                            className="rounded-[24px] border border-cyan-100/70 bg-white/75 py-0 shadow-[0_20px_70px_rgba(14,116,144,0.10)] backdrop-blur transition-transform duration-300 hover:-translate-y-1"
                        >
                            <CardHeader className="border-b border-cyan-100/70 pt-5">
                                <div className="mb-2 flex items-center justify-between gap-3">
                                    <Badge className="bg-cyan-700 text-white">{doctor.specialization}</Badge>
                                    <Badge variant="outline" className="border-slate-200 text-slate-700">
                                        ID #{doctor.id}
                                    </Badge>
                                </div>
                                <CardTitle className="text-xl font-semibold text-slate-900">{doctor.name}</CardTitle>
                                <CardDescription className="text-slate-600">Specialist available for consultation</CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4 pt-4">
                                <div className="flex items-start gap-3 rounded-2xl bg-slate-50/80 p-3">
                                    <Building2 className="mt-0.5 size-4.5 text-cyan-700" />
                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Hospital</p>
                                        <p className="mt-1 text-sm font-medium leading-6 text-slate-800">{doctor.hospital?.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 rounded-2xl bg-slate-50/80 p-3">
                                    <Clock3 className="mt-0.5 size-4.5 text-cyan-700" />
                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Experience</p>
                                        <p className="mt-1 text-sm font-medium text-slate-800">{doctor.experience} years in practice</p>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="justify-between rounded-b-[24px] border-t border-cyan-100/70 bg-cyan-50/45">
                                <p className="text-sm font-medium text-cyan-800">Consultation slots open</p>
                                <Button size="sm" className="rounded-full bg-slate-900 px-4 text-white hover:bg-cyan-800">
                                    Book
                                    <ArrowRight className="size-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ListOfDoctors;