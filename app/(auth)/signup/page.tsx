"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Stethoscope,
    User,
    Phone,
    Lock,
    Eye,
    EyeOff,
    GraduationCap,
    Briefcase,
    Building2,
    CheckCircle2,
    XCircle,
} from "lucide-react"
import { qualifications, specializations } from "@/constants"
import Link from "next/link"
import { Hospitals } from "@/config/schema"
import { useDoctorStore } from "@/store/doctor.store"
import { db } from "@/config"

type HospitalOption = {
    id: number
    name: string
}

function getPasswordStrength(password: string) {
    let score = 0
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (/[A-Z]/.test(password)) score++
    if (/[a-z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    if (score <= 2) return { label: "Weak", percent: 25, color: "bg-red-500" }
    if (score <= 3) return { label: "Fair", percent: 50, color: "bg-yellow-500" }
    if (score <= 4) return { label: "Good", percent: 75, color: "bg-cyan-400" }
    return { label: "Strong", percent: 100, color: "bg-cyan-600" }
}

const passwordRules = [
    { test: (p: string) => p.length >= 8, label: "At least 8 characters" },
    { test: (p: string) => /[A-Z]/.test(p), label: "One uppercase letter" },
    { test: (p: string) => /[a-z]/.test(p), label: "One lowercase letter" },
    { test: (p: string) => /[0-9]/.test(p), label: "One number" },
    {
        test: (p: string) => /[^A-Za-z0-9]/.test(p),
        label: "One special character",
    },
]

const inputClass =
    "border-cyan-200 focus-visible:border-cyan-500 focus-visible:ring-cyan-500/30"

type SignupFormState = {
    name: string
    hospital: string
    experience: string
    specialization: string
    qualification: string
    phone: string
    password: string
    confirmPassword: string
    showPassword: boolean
    showConfirm: boolean
}

const SignupPage = () => {
    const [form, setForm] = useState<SignupFormState>({
        name: "",
        hospital: "",
        experience: "",
        specialization: "",
        qualification: "",
        phone: "",
        password: "",
        confirmPassword: "",
        showPassword: false,
        showConfirm: false,
    })
    const [hospitalOptions, setHospitalOptions] = useState<HospitalOption[]>([])

    const { signup } = useDoctorStore();

    useEffect(() => {
        let active = true

        const loadHospitals = async () => {
            try {
                const data = await db
                    .select({
                        id: Hospitals.id,
                        name: Hospitals.name,
                    })
                    .from(Hospitals)

                if (active) {
                    setHospitalOptions(data)
                }
            } catch (error) {
                console.log(error)
            }
        }

        loadHospitals()

        return () => {
            active = false
        }
    }, [])

    const strength = useMemo(() => getPasswordStrength(form.password), [form.password])
    const passwordsMatch =
        form.confirmPassword.length > 0 && form.password === form.confirmPassword

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!form.hospital) {
            return
        }

        await signup({
            name: form.name,
            hospital: Number(form.hospital),
            experience: Number(form.experience),
            specialization: form.specialization,
            qualification: form.qualification,
            phone: form.phone,
            password: form.password,
        })

    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_35%),linear-gradient(180deg,#f7fcff_0%,#edf8fd_50%,#ffffff_100%)] px-4 py-8">
            {/* decorative blobs */}
            <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-cyan-200/45 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full bg-sky-300/30 blur-3xl" />

            <Card className="relative z-10 w-full max-w-lg border-cyan-100 bg-white/78 shadow-[0_24px_70px_rgba(14,116,144,0.15)] backdrop-blur-sm">
                <CardHeader className="items-center text-center pb-2">
                    <div className="mb-2 flex size-16 items-center justify-center rounded-full bg-cyan-100 ring-4 ring-cyan-200/60">
                        <Stethoscope className="size-8 text-cyan-700" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-cyan-900">
                        Create Account
                    </CardTitle>
                    <CardDescription className="text-cyan-700">
                        Register as a doctor on the portal
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <ScrollArea className="max-h-[calc(100vh-180px)]">
                        <form onSubmit={handleSignup} className="space-y-4 pr-3">
                            {/* Full Name */}
                            <div className="space-y-1.5">
                                <Label htmlFor="name" className="text-cyan-900">
                                    Full Name *
                                </Label>
                                <div className="relative">
                                    <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-cyan-600" />
                                    <Input
                                        id="name"
                                        placeholder="Dr. John Doe"
                                        value={form.name}
                                        onChange={(e) =>
                                            setForm((prev) => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
                                        className={`pl-10 ${inputClass}`}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Hospital & Experience – side by side */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-cyan-900">Hospital *</Label>
                                    <div className="relative">
                                        <Building2 className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-cyan-600" />
                                        <Select
                                            value={form.hospital}
                                            onValueChange={(val) =>
                                                val &&
                                                setForm((prev) => ({
                                                    ...prev,
                                                    hospital: val,
                                                }))
                                            }
                                        >
                                            <SelectTrigger className={`w-full pl-10 ${inputClass}`}>
                                                <SelectValue placeholder="Select hospital" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {hospitalOptions.map((hospital) => (
                                                    <SelectItem key={hospital.id} value={String(hospital.id)}>
                                                        {hospital.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="experience" className="text-cyan-900">
                                        Experience (years) *
                                    </Label>
                                    <div className="relative">
                                        <Briefcase className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-cyan-600" />
                                        <Input
                                            id="experience"
                                            type="number"
                                            min="0"
                                            max="60"
                                            placeholder="e.g. 5"
                                            value={form.experience}
                                            onChange={(e) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    experience: e.target.value,
                                                }))
                                            }
                                            className={`pl-10 ${inputClass}`}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Specialization & Qualification – side by side */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-cyan-900">Specialization *</Label>
                                    <Select
                                        value={form.specialization}
                                        onValueChange={(val) =>
                                            val &&
                                            setForm((prev) => ({
                                                ...prev,
                                                specialization: val,
                                            }))
                                        }
                                    >
                                        <SelectTrigger className={`w-full ${inputClass}`}>
                                            <SelectValue placeholder="Select specialization" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {specializations.map((s) => (
                                                <SelectItem key={s} value={s}>
                                                    {s}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-cyan-900">Qualification *</Label>
                                    <div className="relative">
                                        <GraduationCap className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-cyan-600" />
                                        <Select
                                            value={form.qualification}
                                            onValueChange={(val) =>
                                                val &&
                                                setForm((prev) => ({
                                                    ...prev,
                                                    qualification: val,
                                                }))
                                            }
                                        >
                                            <SelectTrigger className={`w-full pl-10 ${inputClass}`}>
                                                <SelectValue placeholder="Select qualification" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {qualifications.map((q) => (
                                                    <SelectItem key={q} value={q}>
                                                        {q}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Number */}
                            <div className="space-y-1.5">
                                <Label htmlFor="phone" className="text-cyan-900">
                                    Mobile Number *
                                </Label>
                                <div className="relative">
                                    <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-cyan-600" />
                                    <Input
                                        id="phone"
                                        type="tel"
                                        inputMode="numeric"
                                        placeholder="+91 XXXXX XXXXX"
                                        value={form.phone}
                                        onChange={(e) =>
                                            setForm((prev) => ({
                                                ...prev,
                                                phone: e.target.value,
                                            }))
                                        }
                                        className={`pl-10 ${inputClass}`}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <Label htmlFor="password" className="text-cyan-900">
                                    Password *
                                </Label>
                                <div className="relative">
                                    <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-cyan-600" />
                                    <Input
                                        id="password"
                                        type={form.showPassword ? "text" : "password"}
                                        placeholder="Create a strong password"
                                        value={form.password}
                                        onChange={(e) =>
                                            setForm((prev) => ({
                                                ...prev,
                                                password: e.target.value,
                                            }))
                                        }
                                        className={`pl-10 pr-10 ${inputClass}`}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setForm((prev) => ({
                                                ...prev,
                                                showPassword: !prev.showPassword,
                                            }))
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-600 hover:text-cyan-800"
                                        aria-label={
                                            form.showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {form.showPassword ? (
                                            <EyeOff className="size-4" />
                                        ) : (
                                            <Eye className="size-4" />
                                        )}
                                    </button>
                                </div>

                                {/* Password strength bar */}
                                {form.password.length > 0 && (
                                    <div className="space-y-2 pt-1">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-cyan-700">Password strength</span>
                                            <span
                                                className={`font-semibold ${strength.label === "Weak"
                                                    ? "text-red-600"
                                                    : strength.label === "Fair"
                                                        ? "text-yellow-600"
                                                        : "text-cyan-700"
                                                    }`}
                                            >
                                                {strength.label}
                                            </span>
                                        </div>
                                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-cyan-100">
                                            <div
                                                className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                                                style={{ width: `${strength.percent}%` }}
                                            />
                                        </div>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1">
                                            {passwordRules.map((rule) => {
                                                const passed = rule.test(form.password)
                                                return (
                                                    <li
                                                        key={rule.label}
                                                        className={`flex items-center gap-1.5 text-xs ${passed ? "text-cyan-700" : "text-muted-foreground"
                                                            }`}
                                                    >
                                                        {passed ? (
                                                            <CheckCircle2 className="size-3.5 shrink-0" />
                                                        ) : (
                                                            <XCircle className="size-3.5 shrink-0" />
                                                        )}
                                                        {rule.label}
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-1.5">
                                <Label htmlFor="confirm-password" className="text-cyan-900">
                                    Confirm Password *
                                </Label>
                                <div className="relative">
                                    <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-cyan-600" />
                                    <Input
                                        id="confirm-password"
                                        type={form.showConfirm ? "text" : "password"}
                                        placeholder="Re-enter your password"
                                        value={form.confirmPassword}
                                        onChange={(e) =>
                                            setForm((prev) => ({
                                                ...prev,
                                                confirmPassword: e.target.value,
                                            }))
                                        }
                                        className={`pl-10 pr-10 ${inputClass} ${form.confirmPassword.length > 0 && !passwordsMatch
                                            ? "border-red-400 focus-visible:border-red-500 focus-visible:ring-red-500/30"
                                            : ""
                                            }`}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setForm((prev) => ({
                                                ...prev,
                                                showConfirm: !prev.showConfirm,
                                            }))
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-600 hover:text-cyan-800"
                                        aria-label={
                                            form.showConfirm
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {form.showConfirm ? (
                                            <EyeOff className="size-4" />
                                        ) : (
                                            <Eye className="size-4" />
                                        )}
                                    </button>
                                </div>
                                {form.confirmPassword.length > 0 && (
                                    <p
                                        className={`text-xs flex items-center gap-1 ${passwordsMatch ? "text-cyan-700" : "text-red-500"
                                            }`}
                                    >
                                        {passwordsMatch ? (
                                            <>
                                                <CheckCircle2 className="size-3.5" /> Passwords match
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="size-3.5" /> Passwords do not match
                                            </>
                                        )}
                                    </p>
                                )}
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                className="mt-2 h-10 w-full bg-cyan-700 text-base font-semibold text-white hover:bg-cyan-800"
                            >
                                Create Account
                            </Button>
                        </form>
                    </ScrollArea>

                    <p className="mt-5 text-center text-sm text-cyan-800/75">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-medium text-cyan-700 underline underline-offset-2 hover:text-cyan-900"
                        >
                            Sign In
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignupPage