"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { HospitalFormData } from "@/types"
import { Pencil, Trash2 } from "lucide-react"
import { useMemo, useState } from "react"
import UpdateHospitalData from "./UpdateHospitalData"

type HospitalRecord = {
    id: number
    name: string
    registrationNumber: string
    type: string
    address: string
    city: string
    state: string
    pincode: string
    phone: string
    email: string
    website: string
    numberOfBeds: number
    icuBeds: number
    oxygenCylinders: number
    ventilators: number
    ambulances: number
    hasXray: boolean
    hasMRI: boolean
    hasUltrasound: boolean
    hasCTScan: boolean
    hasPathologyLab: boolean
    hasBloodBank: boolean
    hasPharmacy: boolean
    departments: string[]
    operatingHours: string
    emergencyAvailable: boolean
    description: string
    latitude?: number | null
    longitude?: number | null
}

const dummyHospitals: HospitalRecord[] = [
    {
        id: 1,
        name: "City General Hospital",
        registrationNumber: "CGH-2020-101",
        type: "Government",
        address: "12 Main Road, Sector 15",
        city: "Jaipur",
        state: "Rajasthan",
        pincode: "302001",
        phone: "+91 9876543210",
        email: "citygeneral@hospital.com",
        website: "www.citygeneral.in",
        numberOfBeds: 320,
        icuBeds: 48,
        oxygenCylinders: 180,
        ventilators: 36,
        ambulances: 10,
        hasXray: true,
        hasMRI: true,
        hasUltrasound: true,
        hasCTScan: true,
        hasPathologyLab: true,
        hasBloodBank: true,
        hasPharmacy: true,
        departments: ["OPD (Outpatient)", "Emergency / Trauma", "Cardiology", "Neurology"],
        operatingHours: "24 x 7",
        emergencyAvailable: true,
        description:
            "Multi-specialty government hospital serving emergency and critical care patients.",
    },
    {
        id: 2,
        name: "Apollo Medical Center",
        registrationNumber: "AMC-2018-884",
        type: "Private",
        address: "45 Ring Road, Civil Lines",
        city: "Lucknow",
        state: "Uttar Pradesh",
        pincode: "226001",
        phone: "+91 9811122233",
        email: "support@apollomedical.com",
        website: "www.apollomedical.com",
        numberOfBeds: 210,
        icuBeds: 32,
        oxygenCylinders: 120,
        ventilators: 28,
        ambulances: 6,
        hasXray: true,
        hasMRI: true,
        hasUltrasound: true,
        hasCTScan: true,
        hasPathologyLab: true,
        hasBloodBank: false,
        hasPharmacy: true,
        departments: ["Orthopedics", "Gynecology & Obstetrics", "Pediatrics", "Radiology"],
        operatingHours: "8AM - 10PM",
        emergencyAvailable: true,
        description: "Private tertiary-care center with advanced diagnostics and elective surgery units.",
    },
    {
        id: 3,
        name: "Sunrise Health Clinic",
        registrationNumber: "SHC-2022-457",
        type: "Clinic",
        address: "9 Green Park, MG Road",
        city: "Indore",
        state: "Madhya Pradesh",
        pincode: "452001",
        phone: "+91 9800012345",
        email: "hello@sunriseclinic.in",
        website: "www.sunriseclinic.in",
        numberOfBeds: 60,
        icuBeds: 8,
        oxygenCylinders: 36,
        ventilators: 6,
        ambulances: 2,
        hasXray: true,
        hasMRI: false,
        hasUltrasound: true,
        hasCTScan: false,
        hasPathologyLab: true,
        hasBloodBank: false,
        hasPharmacy: true,
        departments: ["General Surgery", "ENT", "Dermatology", "Dental"],
        operatingHours: "9AM - 9PM",
        emergencyAvailable: false,
        description: "Community-focused clinic for OPD, minor procedures, and preventive care services.",
    },
]

const emptyFormData: HospitalFormData = {
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
    numberOfBeds: "0",
    icuBeds: "0",
    oxygenCylinders: "0",
    ventilators: "0",
    ambulances: "0",
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

const ListofHospital = () => {
    const [hospitals, setHospitals] = useState<HospitalRecord[]>(dummyHospitals)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [selectedHospitalId, setSelectedHospitalId] = useState<number | null>(null)
    const [formData, setFormData] = useState<HospitalFormData>(emptyFormData)

    const selectedHospital = useMemo(
        () => hospitals.find((hospital) => hospital.id === selectedHospitalId) ?? null,
        [hospitals, selectedHospitalId]
    )

    const mapToFormData = (hospital: HospitalRecord): HospitalFormData => ({
        name: hospital.name,
        registrationNumber: hospital.registrationNumber,
        type: hospital.type,
        address: hospital.address,
        city: hospital.city,
        state: hospital.state,
        pincode: hospital.pincode,
        phone: hospital.phone,
        email: hospital.email,
        website: hospital.website,
        numberOfBeds: String(hospital.numberOfBeds),
        icuBeds: String(hospital.icuBeds),
        oxygenCylinders: String(hospital.oxygenCylinders),
        ventilators: String(hospital.ventilators),
        ambulances: String(hospital.ambulances),
        hasXray: hospital.hasXray,
        hasMRI: hospital.hasMRI,
        hasUltrasound: hospital.hasUltrasound,
        hasCTScan: hospital.hasCTScan,
        hasPathologyLab: hospital.hasPathologyLab,
        hasBloodBank: hospital.hasBloodBank,
        hasPharmacy: hospital.hasPharmacy,
        departments: hospital.departments,
        operatingHours: hospital.operatingHours,
        emergencyAvailable: hospital.emergencyAvailable,
        description: hospital.description,
        latitude: hospital.latitude ? String(hospital.latitude) : "",
        longitude: hospital.longitude ? String(hospital.longitude) : "",
    })

    const mapToHospital = (id: number, values: HospitalFormData): HospitalRecord => ({
        id,
        name: values.name,
        registrationNumber: values.registrationNumber,
        type: values.type,
        address: values.address,
        city: values.city,
        state: values.state,
        pincode: values.pincode,
        phone: values.phone,
        email: values.email,
        website: values.website,
        numberOfBeds: Number(values.numberOfBeds) || 0,
        icuBeds: Number(values.icuBeds) || 0,
        oxygenCylinders: Number(values.oxygenCylinders) || 0,
        ventilators: Number(values.ventilators) || 0,
        ambulances: Number(values.ambulances) || 0,
        hasXray: values.hasXray,
        hasMRI: values.hasMRI,
        hasUltrasound: values.hasUltrasound,
        hasCTScan: values.hasCTScan,
        hasPathologyLab: values.hasPathologyLab,
        hasBloodBank: values.hasBloodBank,
        hasPharmacy: values.hasPharmacy,
        departments: values.departments,
        operatingHours: values.operatingHours,
        emergencyAvailable: values.emergencyAvailable,
        description: values.description,
        latitude: values.latitude ? Number(values.latitude) : null,
        longitude: values.longitude ? Number(values.longitude) : null,
    })

    const handleOpenEdit = (hospital: HospitalRecord) => {
        setSelectedHospitalId(hospital.id)
        setFormData(mapToFormData(hospital))
        setEditDialogOpen(true)
    }

    const handleFieldChange = (field: keyof HospitalFormData, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleToggleDepartment = (department: string) => {
        setFormData((prev) => ({
            ...prev,
            departments: prev.departments.includes(department)
                ? prev.departments.filter((dept) => dept !== department)
                : [...prev.departments, department],
        }))
    }

    const handleSave = () => {
        if (!selectedHospitalId) {
            return
        }

        setHospitals((prev) =>
            prev.map((hospital) =>
                hospital.id === selectedHospitalId
                    ? mapToHospital(selectedHospitalId, formData)
                    : hospital
            )
        )

        setEditDialogOpen(false)
        setSelectedHospitalId(null)
        setFormData(emptyFormData)
    }

    const handleDelete = (hospitalId: number) => {
        setHospitals((prev) => prev.filter((hospital) => hospital.id !== hospitalId))
        if (selectedHospitalId === hospitalId) {
            setEditDialogOpen(false)
            setSelectedHospitalId(null)
            setFormData(emptyFormData)
        }
    }

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-green-800">List of Hospitals</h2>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    {hospitals.length} Hospitals
                </Badge>
            </div>

            {hospitals.length === 0 ? (
                <Card className="border border-dashed border-green-300">
                    <CardContent className="py-8 text-center text-muted-foreground">
                        No hospitals available.
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {hospitals.map((hospital) => (
                        <Card key={hospital.id} className="border border-green-100">
                            <CardHeader>
                                <CardTitle className="text-green-800">{hospital.name}</CardTitle>
                                <CardDescription>
                                    Reg No: {hospital.registrationNumber} | {hospital.type}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                    <p>
                                        <span className="font-medium text-green-700">Phone:</span>{" "}
                                        {hospital.phone}
                                    </p>
                                    <p>
                                        <span className="font-medium text-green-700">Email:</span>{" "}
                                        {hospital.email}
                                    </p>
                                    <p className="sm:col-span-2">
                                        <span className="font-medium text-green-700">Address:</span>{" "}
                                        {hospital.address}, {hospital.city}, {hospital.state} - {hospital.pincode}
                                    </p>
                                    <p>
                                        <span className="font-medium text-green-700">Website:</span>{" "}
                                        {hospital.website}
                                    </p>
                                    <p>
                                        <span className="font-medium text-green-700">Operating Hours:</span>{" "}
                                        {hospital.operatingHours}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                                    <Badge variant="outline">Beds: {hospital.numberOfBeds}</Badge>
                                    <Badge variant="outline">ICU: {hospital.icuBeds}</Badge>
                                    <Badge variant="outline">O2: {hospital.oxygenCylinders}</Badge>
                                    <Badge variant="outline">Vent: {hospital.ventilators}</Badge>
                                    <Badge variant="outline">Amb: {hospital.ambulances}</Badge>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {hospital.hasXray && <Badge>X-Ray</Badge>}
                                    {hospital.hasMRI && <Badge>MRI</Badge>}
                                    {hospital.hasUltrasound && <Badge>Ultrasound</Badge>}
                                    {hospital.hasCTScan && <Badge>CT Scan</Badge>}
                                    {hospital.hasPathologyLab && <Badge>Pathology Lab</Badge>}
                                    {hospital.hasBloodBank && <Badge>Blood Bank</Badge>}
                                    {hospital.hasPharmacy && <Badge>Pharmacy</Badge>}
                                    {hospital.emergencyAvailable && (
                                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                                            Emergency Available
                                        </Badge>
                                    )}
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-green-700 mb-1">Departments</p>
                                    <div className="flex flex-wrap gap-2">
                                        {hospital.departments.map((department) => (
                                            <Badge
                                                key={`${hospital.id}-${department}`}
                                                variant="outline"
                                                className="text-xs"
                                            >
                                                {department}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <p className="text-sm text-muted-foreground">{hospital.description}</p>
                            </CardContent>

                            <CardFooter className="justify-end gap-2">
                                <Dialog open={editDialogOpen && selectedHospitalId === hospital.id} onOpenChange={(open) => setEditDialogOpen(open)}>
                                    <DialogTrigger
                                        render={
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleOpenEdit(hospital)}
                                            >
                                                <Pencil className="size-3.5" />
                                                Edit
                                            </Button>
                                        }
                                    />
                                    <DialogContent className="sm:max-w-2xl max-h-[90vh] p-0 border-green-200">
                                        {selectedHospital ? (
                                            <UpdateHospitalData
                                                formData={formData}
                                                onFieldChange={handleFieldChange}
                                                onToggleDepartment={handleToggleDepartment}
                                                onSave={handleSave}
                                            />
                                        ) : null}
                                    </DialogContent>
                                </Dialog>

                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(hospital.id)}
                                >
                                    <Trash2 className="size-3.5" />
                                    Delete
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </section>
    )
}

export default ListofHospital