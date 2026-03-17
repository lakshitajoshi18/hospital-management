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
import { CheckCircle2 } from "lucide-react"
import { useState } from "react"

type DoctorRecord = {
    id: number
    name: string
    specialization: string
    qualification: string
    experience: number
    hospital: number
    phone: string
    password: string
    loginType: string
    city: string | null
    isVerified: boolean
    patientsAppointed: number
}

const hospitalLookup: Record<number, string> = {
    1: "City General Hospital",
    2: "Apollo Medical Center",
    3: "Sunrise Health Clinic",
}

const dummyDoctors: DoctorRecord[] = [
    {
        id: 1,
        name: "Dr. Aditi Sharma",
        specialization: "Cardiologist",
        qualification: "MBBS, MD",
        experience: 9,
        hospital: 1,
        phone: "+91 9810011101",
        password: "doctor@123",
        loginType: "doctor",
        city: "Jaipur",
        isVerified: true,
        patientsAppointed: 124,
    },
    {
        id: 2,
        name: "Dr. Rohan Verma",
        specialization: "Orthopedic Surgeon",
        qualification: "MBBS, MS",
        experience: 6,
        hospital: 2,
        phone: "+91 9810011102",
        password: "doctor@123",
        loginType: "doctor",
        city: "Lucknow",
        isVerified: false,
        patientsAppointed: 79,
    },
    {
        id: 3,
        name: "Dr. Meera Kapoor",
        specialization: "Pediatrician",
        qualification: "MBBS, DNB",
        experience: 11,
        hospital: 3,
        phone: "+91 9810011103",
        password: "doctor@123",
        loginType: "doctor",
        city: "Indore",
        isVerified: false,
        patientsAppointed: 210,
    },
]

const ListofDoctors = () => {
    const [doctors, setDoctors] = useState<DoctorRecord[]>(dummyDoctors)

    const verifyDoctor = (doctorId: number) => {
        setDoctors((prev) =>
            prev.map((doctor) =>
                doctor.id === doctorId
                    ? {
                        ...doctor,
                        isVerified: true,
                    }
                    : doctor
            )
        )
    }

    return (
        <section className="space-y-4 mt-8">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-green-800">List of Doctors</h2>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    {doctors.length} Doctors
                </Badge>
            </div>

            {doctors.length === 0 ? (
                <Card className="border border-dashed border-green-300">
                    <CardContent className="py-8 text-center text-muted-foreground">
                        No doctors available.
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {doctors.map((doctor) => (
                        <Card key={doctor.id} className="border border-green-100">
                            <CardHeader>
                                <CardTitle className="text-green-800">{doctor.name}</CardTitle>
                                <CardDescription>
                                    {doctor.specialization} | {doctor.qualification}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                    <p>
                                        <span className="font-medium text-green-700">Experience:</span>{" "}
                                        {doctor.experience} years
                                    </p>
                                    <p>
                                        <span className="font-medium text-green-700">Phone:</span>{" "}
                                        {doctor.phone}
                                    </p>
                                    <p>
                                        <span className="font-medium text-green-700">Hospital:</span>{" "}
                                        {hospitalLookup[doctor.hospital] ?? `Hospital #${doctor.hospital}`}
                                    </p>
                                    <p>
                                        <span className="font-medium text-green-700">City:</span>{" "}
                                        {doctor.city ?? "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-medium text-green-700">Login Type:</span>{" "}
                                        {doctor.loginType}
                                    </p>
                                    <p>
                                        <span className="font-medium text-green-700">Patients Appointed:</span>{" "}
                                        {doctor.patientsAppointed}
                                    </p>
                                    <p>
                                        <span className="font-medium text-green-700">Password:</span>{" "}
                                        {"*".repeat(doctor.password.length)}
                                    </p>
                                </div>

                                <div>
                                    {doctor.isVerified ? (
                                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                            Verified
                                        </Badge>
                                    ) : (
                                        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                                            Not Verified
                                        </Badge>
                                    )}
                                </div>
                            </CardContent>

                            <CardFooter className="justify-end gap-2">
                                {!doctor.isVerified && (
                                    <Button
                                        size="sm"
                                        className="bg-green-600 text-white hover:bg-green-700"
                                        onClick={() => verifyDoctor(doctor.id)}
                                    >
                                        <CheckCircle2 className="size-4" />
                                        Verify Doctor
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </section>
    )
}

export default ListofDoctors