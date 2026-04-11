"use client"

import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AdminPasswordDialogProps {
    open: boolean
    onVerified: () => void
}

const AdminPasswordDialog = ({ open, onVerified }: AdminPasswordDialogProps) => {
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if (open) {
            setPassword("")
            setError("")
            setShowPassword(false)
        }
    }, [open])

    // This is only a UI gate. For real security, verify on server-side routes/APIs.
    const adminPassword = useMemo(
        () => process.env.NEXT_PUBLIC_ADMIN_PANEL_PASSWORD ?? "admin123",
        []
    )

    const handleVerify = () => {
        if (!password.trim()) {
            setError("Please enter admin password")
            return
        }

        if (password === adminPassword) {
            setError("")
            setPassword("")
            onVerified()
            return
        }

        setError("Incorrect password. Try again.")
        toast.error("Invalid admin password")
    }

    return (
        <Dialog
            open={open}
            onOpenChange={() => { }}
        >
            <DialogContent
                showCloseButton={false}
                className="border-green-200 max-w-[90vw] sm:max-w-[50vw]"
            >
                <DialogHeader>
                    <DialogTitle className="text-green-800">Admin Access Required</DialogTitle>
                    <DialogDescription>
                        Enter the admin password to open the admin panel.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <div className="flex gap-2">
                        <Input
                            id="admin-password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                if (error) setError("")
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault()
                                    handleVerify()
                                }
                            }}
                            placeholder="Enter admin password"
                            autoFocus
                        />
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="shrink-0"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </Button>
                    </div>
                    {error ? <p className="text-sm text-red-600">{error}</p> : null}
                </div>

                <DialogFooter>
                    <Button onClick={handleVerify} className="bg-green-600 hover:bg-green-700">
                        Verify
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AdminPasswordDialog