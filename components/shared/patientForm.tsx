"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import {
    CalendarDays,
    CircleAlert,
    Clock3,
    Hospital,
    MapPin,
    Phone,
    User,
} from "lucide-react";

import { hospitals } from "@/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Gender = "male" | "female" | "other";

type PatientFormState = {
    name: string;
    city: string;
    problem: string;
    mobile: string;
    gender: Gender;
    age: string;
    hospital: string;
    address: string;
};

const defaultState: PatientFormState = {
    name: "",
    city: "",
    problem: "",
    mobile: "",
    gender: "male",
    age: "",
    hospital: "",
    address: "",
};

const cities = ["Pithoragarh", "Nainital", "Dehradun", "Haldwani", "Almora"];

const fieldClassName = "h-11 rounded-xl border-cyan-200 bg-white/85 focus-visible:border-cyan-500 focus-visible:ring-cyan-500/30";

const PatientForm = () => {
    const [form, setForm] = useState<PatientFormState>(defaultState);
    const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(new Date());

    const isFormValid = useMemo(() => {
        return Boolean(
            form.name &&
            form.city &&
            form.problem &&
            form.mobile &&
            form.age &&
            form.hospital &&
            form.address &&
            appointmentDate
        );
    }, [form, appointmentDate]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload = {
            ...form,
            appointmentDate: appointmentDate ? format(appointmentDate, "yyyy-MM-dd") : "",
        };

        console.log("Patient appointment payload:", payload);
    };

    return (
        <section
            id="appointment"
            className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_36%),linear-gradient(180deg,#f7fcff_0%,#edf9fe_48%,#ffffff_100%)] px-4 py-16 sm:px-6 lg:px-8"
        >
            <div className="absolute -left-20 top-8 h-64 w-64 rounded-full bg-cyan-200/35 blur-3xl" />
            <div className="absolute -right-20 bottom-6 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />

            <div className="relative mx-auto w-full max-w-5xl">
                <Card className="rounded-[32px] border border-white/80 bg-white/72 py-0 shadow-[0_28px_90px_rgba(14,116,144,0.12)] backdrop-blur">
                    <CardHeader className="rounded-t-[32px] border-b border-cyan-100/80 bg-white/50 py-6">
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge className="bg-cyan-100 text-cyan-800">
                                <Clock3 className="size-3.5" />
                                Quick Intake
                            </Badge>
                            <Badge className="bg-sky-100 text-sky-800">
                                <CircleAlert className="size-3.5" />
                                Priority Appointment
                            </Badge>
                        </div>
                        <CardTitle className="pt-2 text-2xl text-slate-950 sm:text-3xl">Patient Appointment Form</CardTitle>
                        <CardDescription className="text-base leading-6 text-slate-600">
                            Fill in your details to request treatment support and schedule your appointment directly.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="p-5 sm:p-6">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="patient-name" className="text-cyan-900">Name</Label>
                                    <div className="relative">
                                        <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-cyan-600" />
                                        <Input
                                            id="patient-name"
                                            value={form.name}
                                            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                                            placeholder="Enter full name"
                                            className={cn("pl-10", fieldClassName)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="patient-city" className="text-cyan-900">City</Label>
                                    <Select
                                        value={form.city}
                                        onValueChange={(value) => setForm((prev) => ({ ...prev, city: value ?? "" }))}
                                    >
                                        <SelectTrigger id="patient-city" className={cn("w-full", fieldClassName)}>
                                            <SelectValue placeholder="Select city" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {cities.map((city) => (
                                                <SelectItem key={city} value={city}>{city}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="patient-problem" className="text-cyan-900">Problem</Label>
                                    <Input
                                        id="patient-problem"
                                        value={form.problem}
                                        onChange={(event) => setForm((prev) => ({ ...prev, problem: event.target.value }))}
                                        placeholder="Describe the primary issue"
                                        className={fieldClassName}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="patient-mobile" className="text-cyan-900">Mobile Number</Label>
                                    <div className="relative">
                                        <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-cyan-600" />
                                        <Input
                                            id="patient-mobile"
                                            type="tel"
                                            value={form.mobile}
                                            onChange={(event) => setForm((prev) => ({ ...prev, mobile: event.target.value }))}
                                            placeholder="+91 XXXXX XXXXX"
                                            className={cn("pl-10", fieldClassName)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label className="text-cyan-900">Gender</Label>
                                    <RadioGroup
                                        value={form.gender}
                                        onValueChange={(value) => setForm((prev) => ({ ...prev, gender: value as Gender }))}
                                        className="grid grid-cols-3 gap-2"
                                    >
                                        {["male", "female", "other"].map((gender) => (
                                            <label
                                                key={gender}
                                                className="flex cursor-pointer items-center gap-2 rounded-xl border border-cyan-100 bg-white/85 px-3 py-2 text-sm font-medium capitalize text-slate-700 transition-colors duration-300 hover:bg-cyan-50"
                                            >
                                                <RadioGroupItem value={gender} id={`gender-${gender}`} />
                                                {gender}
                                            </label>
                                        ))}
                                    </RadioGroup>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="patient-age" className="text-cyan-900">Age</Label>
                                    <Input
                                        id="patient-age"
                                        type="number"
                                        min="0"
                                        max="120"
                                        value={form.age}
                                        onChange={(event) => setForm((prev) => ({ ...prev, age: event.target.value }))}
                                        placeholder="Enter age"
                                        className={fieldClassName}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="patient-hospital" className="text-cyan-900">Hospital</Label>
                                    <div className="relative">
                                        <Hospital className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-cyan-600" />
                                        <Select
                                            value={form.hospital}
                                            onValueChange={(value) => setForm((prev) => ({ ...prev, hospital: value ?? "" }))}
                                        >
                                            <SelectTrigger id="patient-hospital" className={cn("w-full pl-10", fieldClassName)}>
                                                <SelectValue placeholder="Choose hospital" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {hospitals.map((hospitalName) => (
                                                    <SelectItem key={hospitalName} value={hospitalName}>{hospitalName}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-cyan-900">Appointment Date</Label>
                                    <Popover>
                                        <PopoverTrigger
                                            className={cn(
                                                "flex h-11 w-full items-center justify-between rounded-xl border border-cyan-200 bg-white/85 px-3 text-left text-sm text-slate-700 transition-colors focus-visible:border-cyan-500 focus-visible:ring-3 focus-visible:ring-cyan-500/30",
                                                !appointmentDate && "text-slate-400"
                                            )}
                                        >
                                            <span>{appointmentDate ? format(appointmentDate, "PPP") : "Pick a date"}</span>
                                            <CalendarDays className="size-4.5 text-cyan-600" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto border-cyan-100 bg-white p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={appointmentDate}
                                                onSelect={setAppointmentDate}
                                                disabled={{ before: new Date() }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="patient-address" className="text-cyan-900">Address</Label>
                                <div className="relative">
                                    <MapPin className="pointer-events-none absolute left-3 top-3 size-4 text-cyan-600" />
                                    <Textarea
                                        id="patient-address"
                                        value={form.address}
                                        onChange={(event) => setForm((prev) => ({ ...prev, address: event.target.value }))}
                                        placeholder="Enter complete address"
                                        className="min-h-24 rounded-xl border-cyan-200 bg-white/85 pl-10 focus-visible:border-cyan-500 focus-visible:ring-cyan-500/30"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 rounded-2xl border border-cyan-100 bg-cyan-50/55 p-3 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-sm text-cyan-800">Submit your request and we will route you to the selected hospital quickly.</p>
                                <Button
                                    type="submit"
                                    disabled={!isFormValid}
                                    className="h-11 rounded-full bg-cyan-700 px-6 text-sm font-semibold text-white hover:bg-cyan-800 disabled:bg-cyan-300"
                                >
                                    Book Appointment
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default PatientForm;