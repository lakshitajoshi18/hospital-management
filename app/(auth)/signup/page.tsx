"use client"

import React, { useMemo, useState } from "react"
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

// Replace with actual hospital data from your backend
const hospitals = [
    "City General Hospital",
    "Apollo Medical Center",
    "Green Valley Hospital",
    "Sunrise Health Clinic",
    "National Institute of Medical Sciences",
    "Metro Multispecialty Hospital",
]

const specializations = [
    "General Physician",
    "Cardiologist",
    "Neurologist",
    "Orthopedic Surgeon",
    "Pediatrician",
    "Gynecologist",
    "Dermatologist",
    "Ophthalmologist",
    "ENT Specialist",
    "Oncologist",
    "Urologist",
    "Nephrologist",
    "Psychiatrist",
    "Radiologist",
    "Anesthesiologist",
    "Pulmonologist",
    "Gastroenterologist",
    "Dentist",
    "Physiotherapist",
]

const qualifications = [
    "MBBS",
    "MD",
    "MS",
    "BDS",
    "MDS",
    "BAMS",
    "BHMS",
    "DNB",
    "DM",
    "MCh",
    "FRCS",
    "MRCP",
]

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
    if (score <= 4) return { label: "Good", percent: 75, color: "bg-green-400" }
    return { label: "Strong", percent: 100, color: "bg-green-600" }
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
    "border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30"

const SignupPage = () => {
    const [name, setName] = useState("")
    const [hospital, setHospital] = useState("")
    const [experience, setExperience] = useState("")
    const [specialization, setSpecialization] = useState("")
    const [qualification, setQualification] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const strength = useMemo(() => getPasswordStrength(password), [password])
    const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Signup data:", {
            name,
            hospital,
            experience,
            specialization,
            qualification,
            phone,
            password,
        })
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-green-50 via-white to-green-100 px-4 py-8">
            {/* decorative blobs */}
            <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-green-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full bg-green-300/30 blur-3xl" />

            <Card className="relative z-10 w-full max-w-lg border-green-200 bg-white/80 shadow-xl backdrop-blur-sm">
                <CardHeader className="items-center text-center pb-2">
                    <div className="mb-2 flex size-16 items-center justify-center rounded-full bg-green-100 ring-4 ring-green-200/60">
                        <Stethoscope className="size-8 text-green-700" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-green-800">
                        Create Account
                    </CardTitle>
                    <CardDescription className="text-green-600">
                        Register as a doctor on the portal
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <ScrollArea className="max-h-[calc(100vh-280px)]">
                        <form onSubmit={handleSignup} className="space-y-4 pr-3">
                            {/* Full Name */}
                            <div className="space-y-1.5">
                                <Label htmlFor="name" className="text-green-800">
                                    Full Name *
                                </Label>
                                <div className="relative">
                                    <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-green-500" />
                                    <Input
                                        id="name"
                                        placeholder="Dr. John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className={`pl-10 ${inputClass}`}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Hospital & Experience – side by side */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-green-800">Hospital *</Label>
                                    <div className="relative">
                                        <Building2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-green-500 z-10" />
                                        <Select
                                            value={hospital}
                                            onValueChange={(val) => val && setHospital(val)}
                                        >
                                            <SelectTrigger className={`w-full pl-10 ${inputClass}`}>
                                                <SelectValue placeholder="Select hospital" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {hospitals.map((h) => (
                                                    <SelectItem key={h} value={h}>
                                                        {h}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="experience" className="text-green-800">
                                        Experience (years) *
                                    </Label>
                                    <div className="relative">
                                        <Briefcase className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-green-500" />
                                        <Input
                                            id="experience"
                                            type="number"
                                            min="0"
                                            max="60"
                                            placeholder="e.g. 5"
                                            value={experience}
                                            onChange={(e) => setExperience(e.target.value)}
                                            className={`pl-10 ${inputClass}`}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Specialization & Qualification – side by side */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-green-800">Specialization *</Label>
                                    <Select
                                        value={specialization}
                                        onValueChange={(val) => val && setSpecialization(val)}
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
                                    <Label className="text-green-800">Qualification *</Label>
                                    <div className="relative">
                                        <GraduationCap className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-green-500 z-10" />
                                        <Select
                                            value={qualification}
                                            onValueChange={(val) => val && setQualification(val)}
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
                                <Label htmlFor="phone" className="text-green-800">
                                    Mobile Number *
                                </Label>
                                <div className="relative">
                                    <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-green-500" />
                                    <Input
                                        id="phone"
                                        type="tel"
                                        inputMode="numeric"
                                        placeholder="+91 XXXXX XXXXX"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className={`pl-10 ${inputClass}`}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <Label htmlFor="password" className="text-green-800">
                                    Password *
                                </Label>
                                <div className="relative">
                                    <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-green-500" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a strong password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`pl-10 pr-10 ${inputClass}`}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-700"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="size-4" />
                                        ) : (
                                            <Eye className="size-4" />
                                        )}
                                    </button>
                                </div>

                                {/* Password strength bar */}
                                {password.length > 0 && (
                                    <div className="space-y-2 pt-1">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-green-700">Password strength</span>
                                            <span
                                                className={`font-semibold ${strength.label === "Weak"
                                                        ? "text-red-600"
                                                        : strength.label === "Fair"
                                                            ? "text-yellow-600"
                                                            : "text-green-700"
                                                    }`}
                                            >
                                                {strength.label}
                                            </span>
                                        </div>
                                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-green-100">
                                            <div
                                                className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                                                style={{ width: `${strength.percent}%` }}
                                            />
                                        </div>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1">
                                            {passwordRules.map((rule) => {
                                                const passed = rule.test(password)
                                                return (
                                                    <li
                                                        key={rule.label}
                                                        className={`flex items-center gap-1.5 text-xs ${passed ? "text-green-600" : "text-muted-foreground"
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
                                <Label htmlFor="confirm-password" className="text-green-800">
                                    Confirm Password *
                                </Label>
                                <div className="relative">
                                    <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-green-500" />
                                    <Input
                                        id="confirm-password"
                                        type={showConfirm ? "text" : "password"}
                                        placeholder="Re-enter your password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className={`pl-10 pr-10 ${inputClass} ${confirmPassword.length > 0 && !passwordsMatch
                                                ? "border-red-400 focus-visible:border-red-500 focus-visible:ring-red-500/30"
                                                : ""
                                            }`}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm((v) => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-700"
                                        aria-label={showConfirm ? "Hide password" : "Show password"}
                                    >
                                        {showConfirm ? (
                                            <EyeOff className="size-4" />
                                        ) : (
                                            <Eye className="size-4" />
                                        )}
                                    </button>
                                </div>
                                {confirmPassword.length > 0 && (
                                    <p
                                        className={`text-xs flex items-center gap-1 ${passwordsMatch ? "text-green-600" : "text-red-500"
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
                                className="w-full bg-green-600 text-white hover:bg-green-700 h-10 text-base font-semibold mt-2"
                            >
                                Create Account
                            </Button>
                        </form>
                    </ScrollArea>

                    <p className="mt-5 text-center text-sm text-green-700/70">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="font-medium text-green-700 hover:text-green-900 underline underline-offset-2"
                        >
                            Sign In
                        </a>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignupPage