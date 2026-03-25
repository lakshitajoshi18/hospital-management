"use client"

import React, { useState } from "react"
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
import { Stethoscope, Phone, Lock, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useDoctorStore } from "@/store/doctor.store"
import { useRouter } from "next/navigation"

const LoginPage = () => {
    const { login } = useDoctorStore();
    const router = useRouter();
    const [isLoading, setisLoading] = useState(false);
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        // Add your login logic here
        try {
            setisLoading(true)
            await login({ phone, password }).then(() => {
                router.push("/dashboard");
            });

        } catch (error) {
        }
        finally {
            setisLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_35%),linear-gradient(180deg,#f7fcff_0%,#edf8fd_50%,#ffffff_100%)] px-4">
            {/* decorative blobs */}
            <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-cyan-200/45 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full bg-sky-300/30 blur-3xl" />

            <Card className="relative z-10 w-full max-w-md border-cyan-100 bg-white/78 shadow-[0_24px_70px_rgba(14,116,144,0.15)] backdrop-blur-sm">
                <CardHeader className="items-center text-center pb-2">
                    {/* logo icon */}
                    <div className="mb-2 flex size-16 items-center justify-center rounded-full bg-cyan-100 ring-4 ring-cyan-200/60">
                        <Stethoscope className="size-8 text-cyan-700" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-cyan-900">
                        Doctor Portal
                    </CardTitle>
                    <CardDescription className="text-cyan-700">
                        Sign in with your mobile number to continue
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Mobile Number */}
                        <div className="space-y-1.5">
                            <Label htmlFor="phone" className="text-cyan-900">
                                Mobile Number
                            </Label>
                            <div className="relative">
                                <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-cyan-600" />
                                <Input
                                    id="phone"
                                    type="tel"
                                    inputMode="numeric"
                                    placeholder="+91 XXXXX XXXXX"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="pl-10 border-cyan-200 focus-visible:border-cyan-500 focus-visible:ring-cyan-500/30"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-cyan-900">
                                    Password
                                </Label>
                                <button
                                    type="button"
                                    className="text-xs font-medium text-cyan-700 hover:text-cyan-900 hover:underline"
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <div className="relative">
                                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-cyan-600" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 pr-10 border-cyan-200 focus-visible:border-cyan-500 focus-visible:ring-cyan-500/30"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-600 hover:text-cyan-800"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-4" />
                                    ) : (
                                        <Eye className="size-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            className="h-10 w-full bg-cyan-700 text-base font-semibold text-white hover:bg-cyan-800"
                        >
                            {isLoading ? "Signing In..." : "Sign In"}
                        </Button>
                    </form>

                    <p className="mt-5 text-center text-sm text-cyan-800/75">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/signup"
                            className="font-medium text-cyan-700 underline underline-offset-2 hover:text-cyan-900"
                        >
                            Create Account
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginPage