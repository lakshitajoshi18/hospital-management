"use client"

import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { departmentsList } from "@/constants"
import { AdminStore } from "@/store/admin.store"
import { HospitalFormData } from "@/types"
import { PlusCircle } from "lucide-react"
import { useState } from "react"

const HospitalLocationMap = dynamic(() => import("./HospitalLocationMap"), {
    ssr: false,
})

const initialFormData: HospitalFormData = {
    name: "",
    registrationNumber: "",
    type: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
    website: "",
    numberOfBeds: "",
    icuBeds: "",
    oxygenCylinders: "",
    ventilators: "",
    ambulances: "",
    latitude: "",
    longitude: "",
    hasXray: false,
    hasMRI: false,
    hasUltrasound: false,
    hasCTScan: false,
    hasPathologyLab: false,
    hasBloodBank: false,
    hasPharmacy: false,
    departments: [],
    operatingHours: "",
    emergencyAvailable: false,
    description: "",
}

const AddHospitalDialog = () => {
    const [formData, setFormData] = useState<HospitalFormData>(initialFormData)
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { registerHospital } = AdminStore()

    const updateField = (field: keyof HospitalFormData, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const toggleDepartment = (dept: string) => {
        setFormData((prev) => ({
            ...prev,
            departments: prev.departments.includes(dept)
                ? prev.departments.filter((d) => d !== dept)
                : [...prev.departments, dept],
        }))
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)

        const isRegistered = await registerHospital(formData)

        if (isRegistered) {
            setFormData(initialFormData)
            setOpen(false)
        }

        setIsSubmitting(false)
    }

    const handleMapChange = (coordinates: { latitude: string; longitude: string }) => {
        setFormData((prev) => ({
            ...prev,
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
        }))
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <Button className="bg-green-600 text-white hover:bg-green-700 gap-2">
                        <PlusCircle className="size-4" />
                        Add Hospital
                    </Button>
                }
            />
            <DialogContent className="sm:max-w-2xl max-h-[90vh] p-0 border-green-200">
                <DialogHeader className="px-6 pt-6 pb-2">
                    <DialogTitle className="text-xl font-semibold text-green-800">
                        Add New Hospital
                    </DialogTitle>
                    <DialogDescription className="text-green-600">
                        Fill in the hospital details below. All fields marked with * are required.
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="max-h-[calc(90vh-180px)] px-6">
                    <div className="space-y-6 pb-4">
                        {/* ── Basic Information ── */}
                        <section>
                            <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-3">
                                Basic Information
                            </h3>
                            <Separator className="bg-green-200 mb-4" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="hospital-name" className="text-green-800">
                                        Hospital Name *
                                    </Label>
                                    <Input
                                        id="hospital-name"
                                        placeholder="Enter hospital name"
                                        value={formData.name}
                                        onChange={(e) => updateField("name", e.target.value)}
                                        className="border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="reg-number" className="text-green-800">
                                        Registration Number *
                                    </Label>
                                    <Input
                                        id="reg-number"
                                        placeholder="e.g. HSP-2024-001"
                                        value={formData.registrationNumber}
                                        onChange={(e) =>
                                            updateField("registrationNumber", e.target.value)
                                        }
                                        className="border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-green-800">Hospital Type *</Label>
                                    <Select
                                        value={formData.type}
                                        onValueChange={(val) => {
                                            if (val !== null) {
                                                updateField("type", val);
                                            }
                                        }}                                    >
                                        <SelectTrigger className="w-full border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="government">Government</SelectItem>
                                            <SelectItem value="private">Private</SelectItem>
                                            <SelectItem value="semi-government">
                                                Semi-Government
                                            </SelectItem>
                                            <SelectItem value="trust">Trust / NGO</SelectItem>
                                            <SelectItem value="clinic">Clinic</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-green-800">Operating Hours</Label>
                                    <Select
                                        value={formData.operatingHours}
                                        onValueChange={(val) => {
                                            if (val !== null) {
                                                updateField("operatingHours", val);
                                            }
                                        }}                                    >
                                        <SelectTrigger className="w-full border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30">
                                            <SelectValue placeholder="Select hours" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="24x7">24 x 7</SelectItem>
                                            <SelectItem value="day-only">Day Only (8AM - 8PM)</SelectItem>
                                            <SelectItem value="custom">Custom Hours</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </section>

                        {/* ── Contact & Address ── */}
                        <section>
                            <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-3">
                                Contact & Address
                            </h3>
                            <Separator className="bg-green-200 mb-4" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2 space-y-1.5">
                                    <Label htmlFor="address" className="text-green-800">
                                        Address *
                                    </Label>
                                    <Textarea
                                        id="address"
                                        placeholder="Full street address"
                                        value={formData.address}
                                        onChange={(e) => updateField("address", e.target.value)}
                                        className="border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30 min-h-15"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="city" className="text-green-800">
                                        City *
                                    </Label>
                                    <Input
                                        id="city"
                                        placeholder="Enter city"
                                        value={formData.city}
                                        onChange={(e) => updateField("city", e.target.value)}
                                        className="border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="state" className="text-green-800">
                                        State *
                                    </Label>
                                    <Input
                                        id="state"
                                        placeholder="Enter state"
                                        value={formData.state}
                                        onChange={(e) => updateField("state", e.target.value)}
                                        className="border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="pincode" className="text-green-800">
                                        Pincode
                                    </Label>
                                    <Input
                                        id="pincode"
                                        placeholder="e.g. 110001"
                                        value={formData.pincode}
                                        onChange={(e) => updateField("pincode", e.target.value)}
                                        className="border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="phone" className="text-green-800">
                                        Phone *
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="+91 XXXXX XXXXX"
                                        value={formData.phone}
                                        onChange={(e) => updateField("phone", e.target.value)}
                                        className="border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="email" className="text-green-800">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="hospital@example.com"
                                        value={formData.email}
                                        onChange={(e) => updateField("email", e.target.value)}
                                        className="border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="website" className="text-green-800">
                                        Website
                                    </Label>
                                    <Input
                                        id="website"
                                        placeholder="https://www.hospital.com"
                                        value={formData.website}
                                        onChange={(e) => updateField("website", e.target.value)}
                                        className="border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* ── Location Pin ── */}
                        <section>
                            <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-3">
                                Hospital Location
                            </h3>
                            <Separator className="bg-green-200 mb-4" />
                            <div className="space-y-4">
                                <HospitalLocationMap
                                    value={{
                                        latitude: formData.latitude ?? "",
                                        longitude: formData.longitude ?? "",
                                    }}
                                    onChange={handleMapChange}
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="latitude" className="text-green-800">
                                            Latitude
                                        </Label>
                                        <Input
                                            id="latitude"
                                            value={formData.latitude ?? ""}
                                            placeholder="Click map to fill latitude"
                                            readOnly
                                            className="border-green-300 bg-green-50 focus-visible:border-green-500 focus-visible:ring-green-500/30"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="longitude" className="text-green-800">
                                            Longitude
                                        </Label>
                                        <Input
                                            id="longitude"
                                            value={formData.longitude ?? ""}
                                            placeholder="Click map to fill longitude"
                                            readOnly
                                            className="border-green-300 bg-green-50 focus-visible:border-green-500 focus-visible:ring-green-500/30"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* ── Capacity & Equipment ── */}
                        <section>
                            <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-3">
                                Capacity & Equipment
                            </h3>
                            <Separator className="bg-green-200 mb-4" />
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="beds" className="text-green-800">
                                        Total Beds *
                                    </Label>
                                    <Input
                                        id="beds"
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={formData.numberOfBeds}
                                        onChange={(e) => updateField("numberOfBeds", e.target.value)}
                                        className="border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="icu-beds" className="text-green-800">
                                        ICU Beds
                                    </Label>
                                    <Input
                                        id="icu-beds"
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={formData.icuBeds}
                                        onChange={(e) => updateField("icuBeds", e.target.value)}
                                        className="border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="oxygen" className="text-green-800">
                                        Oxygen Cylinders
                                    </Label>
                                    <Input
                                        id="oxygen"
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={formData.oxygenCylinders}
                                        onChange={(e) =>
                                            updateField("oxygenCylinders", e.target.value)
                                        }
                                        className="border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="ventilators" className="text-green-800">
                                        Ventilators
                                    </Label>
                                    <Input
                                        id="ventilators"
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={formData.ventilators}
                                        onChange={(e) => updateField("ventilators", e.target.value)}
                                        className="border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="ambulances" className="text-green-800">
                                        Ambulances
                                    </Label>
                                    <Input
                                        id="ambulances"
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={formData.ambulances}
                                        onChange={(e) => updateField("ambulances", e.target.value)}
                                        className="border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* ── Diagnostic Facilities ── */}
                        <section>
                            <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-3">
                                Diagnostic Facilities
                            </h3>
                            <Separator className="bg-green-200 mb-4" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                                {[
                                    { key: "hasXray" as const, label: "X-Ray" },
                                    { key: "hasMRI" as const, label: "MRI" },
                                    { key: "hasUltrasound" as const, label: "Ultrasound" },
                                    { key: "hasCTScan" as const, label: "CT Scan" },
                                    { key: "hasPathologyLab" as const, label: "Pathology Lab" },
                                    { key: "hasBloodBank" as const, label: "Blood Bank" },
                                    { key: "hasPharmacy" as const, label: "Pharmacy" },
                                    {
                                        key: "emergencyAvailable" as const,
                                        label: "24/7 Emergency",
                                    },
                                ].map(({ key, label }) => (
                                    <div
                                        key={key}
                                        className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50/50 px-4 py-3"
                                    >
                                        <Label htmlFor={key} className="text-green-800 cursor-pointer">
                                            {label}
                                        </Label>
                                        <Switch
                                            id={key}
                                            checked={formData[key]}
                                            onCheckedChange={(val) => updateField(key, val)}
                                            className="data-checked:bg-green-600"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* ── Departments ── */}
                        <section>
                            <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-3">
                                Departments
                            </h3>
                            <Separator className="bg-green-200 mb-4" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {departmentsList.map((dept) => {
                                    const isChecked = formData.departments.includes(dept)
                                    return (
                                        <label
                                            key={dept}
                                            className={`flex items-center gap-3 rounded-lg border px-4 py-2.5 cursor-pointer transition-colors ${isChecked
                                                ? "border-green-500 bg-green-50"
                                                : "border-green-200 bg-white hover:bg-green-50/50"
                                                }`}
                                        >
                                            <Checkbox
                                                checked={isChecked}
                                                onCheckedChange={() => toggleDepartment(dept)}
                                                className="data-checked:border-green-600 data-checked:bg-green-600"
                                            />
                                            <span className="text-sm text-green-900">{dept}</span>
                                        </label>
                                    )
                                })}
                            </div>
                        </section>

                        {/* ── Additional Notes ── */}
                        <section>
                            <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-3">
                                Additional Information
                            </h3>
                            <Separator className="bg-green-200 mb-4" />
                            <div className="space-y-1.5">
                                <Label htmlFor="description" className="text-green-800">
                                    Description / Notes
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Any additional details about the hospital..."
                                    value={formData.description}
                                    onChange={(e) => updateField("description", e.target.value)}
                                    className="border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30 min-h-20"
                                />
                            </div>
                        </section>
                    </div>
                </ScrollArea>

                <DialogFooter className="border-t-green-200 bg-green-50/50 px-6">
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="border-green-300 text-green-700 hover:bg-green-100"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-green-600 text-white hover:bg-green-700"
                    >
                        {isSubmitting ? "Adding..." : "Add Hospital"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddHospitalDialog