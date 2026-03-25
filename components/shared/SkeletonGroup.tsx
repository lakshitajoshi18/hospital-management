"use client"

import { useEffect, useMemo, useState } from "react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"

const loadingSteps = [
  "Validating secure session",
  "Syncing doctor and patient data",
  "Preparing your dashboard",
] as const

const SkeletonGroup = () => {
  const [progress, setProgress] = useState(18)
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 10) + 3
        return next >= 100 ? 100 : next
      })
    }, 650)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 90) {
      setStepIndex(2)
      return
    }

    if (progress >= 55) {
      setStepIndex(1)
      return
    }

    setStepIndex(0)
  }, [progress])

  const currentStep = useMemo(() => loadingSteps[stepIndex], [stepIndex])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-sky-50 via-cyan-50 to-white p-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="pointer-events-none absolute -left-28 -top-24 h-64 w-64 rounded-full bg-cyan-300/30 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -right-20 top-12 h-56 w-56 rounded-full bg-blue-300/30 blur-3xl animate-pulse [animation-delay:350ms]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-indigo-300/20 blur-3xl animate-pulse [animation-delay:700ms]" />

      <Card className="relative z-10 w-full max-w-xl border border-white/50 bg-white/80 py-0 shadow-2xl backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/70">
        <CardHeader className="space-y-3 border-b bg-white/70 pb-5 dark:bg-slate-900/60">
          <div className="flex items-center justify-between gap-3">
            <Badge variant="secondary" className="animate-pulse px-2.5 py-1 text-[11px] tracking-wide uppercase">
              Secure Auth
            </Badge>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Spinner className="size-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-xs font-medium">Please wait...</span>
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-semibold tracking-tight">
              Checking Your Credentials
            </CardTitle>
            <CardDescription className="mt-1 text-sm">
              We are safely validating your account and loading your hospital workspace.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          <Progress value={progress} className="gap-2">
            <div className="flex items-center gap-2">
              <ProgressLabel>Authentication Progress</ProgressLabel>
              <ProgressValue>{(_, value) => `${value ?? 0}%`}</ProgressValue>
            </div>
          </Progress>

          <div className="rounded-xl border bg-background/70 p-4">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Current step
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-sm font-medium">{currentStep}</p>
            </div>
          </div>

          <div className="space-y-3 rounded-xl border bg-background/70 p-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-44" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Separator />
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2 rounded-lg border p-3">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-6 w-full" />
              </div>
              <div className="space-y-2 rounded-lg border p-3">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-6 w-5/6" />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="justify-between gap-3 border-t bg-white/70 text-xs text-muted-foreground dark:bg-slate-900/60">
          <span>Encrypting request and restoring your session</span>
          <span className="inline-flex items-center gap-2">
            <span className="size-2 rounded-full bg-cyan-500 animate-ping" />
            Live status
          </span>
        </CardFooter>
      </Card>
    </section>
  )
}

export default SkeletonGroup