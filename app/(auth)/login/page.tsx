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

const LoginPage = () => {
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Login attempt:", { phone, password })
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-green-50 via-white to-green-100 px-4">
            {/* decorative blobs */}
            <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-green-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full bg-green-300/30 blur-3xl" />

            <Card className="relative z-10 w-full max-w-md border-green-200 bg-white/80 shadow-xl backdrop-blur-sm">
                <CardHeader className="items-center text-center pb-2">
                    {/* logo icon */}
                    <div className="mb-2 flex size-16 items-center justify-center rounded-full bg-green-100 ring-4 ring-green-200/60">
                        <Stethoscope className="size-8 text-green-700" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-green-800">
                        Doctor Portal
                    </CardTitle>
                    <CardDescription className="text-green-600">
                        Sign in with your mobile number to continue
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Mobile Number */}
                        <div className="space-y-1.5">
                            <Label htmlFor="phone" className="text-green-800">
                                Mobile Number
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
                                    className="pl-10 border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-green-800">
                                    Password
                                </Label>
                                <button
                                    type="button"
                                    className="text-xs font-medium text-green-600 hover:text-green-800 hover:underline"
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <div className="relative">
                                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-green-500" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 pr-10 border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30"
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
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            className="w-full bg-green-600 text-white hover:bg-green-700 h-10 text-base font-semibold"
                        >
                            Sign In
                        </Button>
                    </form>

                    <p className="mt-5 text-center text-sm text-green-700/70">
                        Don&apos;t have an account?{" "}
                        <a
                            href="#"
                            className="font-medium text-green-700 hover:text-green-900 underline underline-offset-2"
                        >
                            Contact Admin
                        </a>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginPage