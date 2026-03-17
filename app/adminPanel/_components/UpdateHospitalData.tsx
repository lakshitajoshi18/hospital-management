"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { departmentsList } from "@/constants"
import { HospitalFormData } from "@/types"

type UpdateHospitalDataProps = {
    formData: HospitalFormData
    onFieldChange: (field: keyof HospitalFormData, value: string | boolean) => void
    onToggleDepartment: (department: string) => void
    onSave: () => void
}

const UpdateHospitalData = ({
    formData,
    onFieldChange,
    onToggleDepartment,
    onSave,
}: UpdateHospitalDataProps) => {
    return (
        <>
            <DialogHeader className="px-6 pt-6 pb-2">
                <DialogTitle className="text-xl font-semibold text-green-800">
                    Update Hospital Data
                </DialogTitle>
                <DialogDescription className="text-green-600">
                    Edit any hospital information and save your updates.
                </DialogDescription>
            </DialogHeader>

            <ScrollArea className="max-h-[calc(90vh-180px)] px-6">
                <div className="space-y-6 pb-4">
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
                                    value={formData.name}
                                    onChange={(e) => onFieldChange("name", e.target.value)}
                                    className="border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="reg-number" className="text-green-800">
                                    Registration Number *
                                </Label>
                                <Input
                                    id="reg-number"
                                    value={formData.registrationNumber}
                                    onChange={(e) => onFieldChange("registrationNumber", e.target.value)}
                                    className="border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="hospital-type" className="text-green-800">
                                    Hospital Type *
                                </Label>
                                <Input
                                    id="hospital-type"
                                    value={formData.type}
                                    onChange={(e) => onFieldChange("type", e.target.value)}
                                    className="border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="operating-hours" className="text-green-800">
                                    Operating Hours
                                </Label>
                                <Input
                                    id="operating-hours"
                                    value={formData.operatingHours}
                                    onChange={(e) => onFieldChange("operatingHours", e.target.value)}
                                    className="border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30"
                                />
                            </div>
                        </div>
                    </section>

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
                                    value={formData.address}
                                    onChange={(e) => onFieldChange("address", e.target.value)}
                                    className="border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30 min-h-15"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="city" className="text-green-800">
                                    City *
                                </Label>
                                <Input
                                    id="city"
                                    value={formData.city}
                                    onChange={(e) => onFieldChange("city", e.target.value)}
                                    className="border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="state" className="text-green-800">
                                    State *
                                </Label>
                                <Input
                                    id="state"
                                    value={formData.state}
                                    onChange={(e) => onFieldChange("state", e.target.value)}
                                    className="border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="pincode" className="text-green-800">
                                    Pincode
                                </Label>
                                <Input
                                    id="pincode"
                                    value={formData.pincode}
                                    onChange={(e) => onFieldChange("pincode", e.target.value)}
                                    className="border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="phone" className="text-green-800">
                                    Phone *
                                </Label>
                                <Input
                                    id="phone"
                                    value={formData.phone}
                                    onChange={(e) => onFieldChange("phone", e.target.value)}
                                    className="border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="email" className="text-green-800">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => onFieldChange("email", e.target.value)}
                                    className="border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="website" className="text-green-800">
                                    Website
                                </Label>
                                <Input
                                    id="website"
                                    value={formData.website}
                                    onChange={(e) => onFieldChange("website", e.target.value)}
                                    className="border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30"
                                />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-3">
                            Infrastructure
                        </h3>
                        <Separator className="bg-green-200 mb-4" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                ["numberOfBeds", "Number of Beds"],
                                ["icuBeds", "ICU Beds"],
                                ["oxygenCylinders", "Oxygen Cylinders"],
                                ["ventilators", "Ventilators"],
                                ["ambulances", "Ambulances"],
                            ].map(([key, label]) => (
                                <div key={key} className="space-y-1.5">
                                    <Label className="text-green-800">{label}</Label>
                                    <Input
                                        type="number"
                                        min={0}
                                        value={formData[key as keyof HospitalFormData] as string}
                                        onChange={(e) =>
                                            onFieldChange(
                                                key as keyof HospitalFormData,
                                                e.target.value
                                            )
                                        }
                                        className="border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-3">
                            Facilities & Services
                        </h3>
                        <Separator className="bg-green-200 mb-4" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                ["hasXray", "X-Ray"],
                                ["hasMRI", "MRI"],
                                ["hasUltrasound", "Ultrasound"],
                                ["hasCTScan", "CT Scan"],
                                ["hasPathologyLab", "Pathology Lab"],
                                ["hasBloodBank", "Blood Bank"],
                                ["hasPharmacy", "Pharmacy"],
                            ].map(([key, label]) => (
                                <div
                                    key={key}
                                    className="flex items-center justify-between rounded-md border border-green-200 px-3 py-2"
                                >
                                    <Label className="text-green-800">{label}</Label>
                                    <Switch
                                        checked={Boolean(formData[key as keyof HospitalFormData])}
                                        onCheckedChange={(checked) =>
                                            onFieldChange(
                                                key as keyof HospitalFormData,
                                                checked
                                            )
                                        }
                                    />
                                </div>
                            ))}
                            <div className="flex items-center justify-between rounded-md border border-green-200 px-3 py-2 sm:col-span-2">
                                <Label className="text-green-800">Emergency Available</Label>
                                <Switch
                                    checked={formData.emergencyAvailable}
                                    onCheckedChange={(checked) =>
                                        onFieldChange("emergencyAvailable", checked)
                                    }
                                />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-3">
                            Departments
                        </h3>
                        <Separator className="bg-green-200 mb-4" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {departmentsList.map((department) => (
                                <label
                                    key={department}
                                    className="flex items-center gap-2 rounded-md border border-green-200 px-3 py-2"
                                >
                                    <Checkbox
                                        checked={formData.departments.includes(department)}
                                        onCheckedChange={() => onToggleDepartment(department)}
                                    />
                                    <span className="text-sm text-green-800">{department}</span>
                                </label>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-3">
                            Description
                        </h3>
                        <Separator className="bg-green-200 mb-4" />
                        <Textarea
                            placeholder="Hospital description"
                            value={formData.description}
                            onChange={(e) => onFieldChange("description", e.target.value)}
                            className="border-green-300 focus-visible:border-green-500 focus-visible:ring-green-500/30 min-h-24"
                        />
                    </section>
                </div>
            </ScrollArea>

            <DialogFooter className="justify-end gap-2 px-6 pb-6 pt-2 bg-transparent border-none">
                <Button onClick={onSave} className="bg-green-600 text-white hover:bg-green-700">
                    Save Changes
                </Button>
            </DialogFooter>
        </>
    )
}

export default UpdateHospitalData