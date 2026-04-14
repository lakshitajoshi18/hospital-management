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
import { useEffect, useMemo, useState } from "react"
import UpdateHospitalData from "./UpdateHospitalData"
import { AdminStore } from "@/store/admin.store"

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
}

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
    const {getHospitalList, hospitalList} = AdminStore();
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [selectedHospitalId, setSelectedHospitalId] = useState<number | null>(null)
    const [formData, setFormData] = useState<HospitalFormData>(emptyFormData)

    useEffect(() => {
        if (hospitalList.length === 0) {
            getHospitalList();
        }
    }, [hospitalList, getHospitalList])
    const selectedHospital = useMemo(
        () => hospitalList.find((hospital) => hospital.id === selectedHospitalId) ?? null,
        [hospitalList, selectedHospitalId]
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

    // const handleSave = () => {
    //     if (!selectedHospitalId) {
    //         return
    //     }

    //     setHospitals((prev) =>
    //         prev.map((hospital) =>
    //             hospital.id === selectedHospitalId
    //                 ? mapToHospital(selectedHospitalId, formData)
    //                 : hospital
    //         )
    //     )

    //     setEditDialogOpen(false)
    //     setSelectedHospitalId(null)
    //     setFormData(emptyFormData)
    // }

    // const handleDelete = (hospitalId: number) => {
    //     setHospitals((prev) => prev.filter((hospital) => hospital.id !== hospitalId))
    //     if (selectedHospitalId === hospitalId) {
    //         setEditDialogOpen(false)
    //         setSelectedHospitalId(null)
    //         setFormData(emptyFormData)
    //     }
    // }

    return hospitalList && (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-green-800">List of Hospitals</h2>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    {hospitalList.length} Hospitals
                </Badge>
            </div>

            {hospitalList.length === 0 ? (
                <Card className="border border-dashed border-green-300">
                    <CardContent className="py-8 text-center text-muted-foreground">
                        No hospitals available.
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {hospitalList.map((hospital) => (
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
                                        {hospital.departments.map((department: string) => (
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
                                                onSave={() => {}}
                                            />
                                        ) : null}
                                    </DialogContent>
                                </Dialog>

                                <Button
                                    variant="destructive"
                                    size="sm"
                                    // onClick={() => handleDelete(hospital.id)}
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