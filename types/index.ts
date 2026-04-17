export interface HospitalFormData {
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
    numberOfBeds: string
    icuBeds: string
    oxygenCylinders: string
    ventilators: string
    ambulances: string
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

export interface HospitalListItem {
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
    numberOfBeds: string
    icuBeds: string
    oxygenCylinders: string
    ventilators: string
    ambulances: string
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
    opertaingHours: string
}

export type DOCTORTYPE = {
    id: number | null
    name: string | null
    specialization: string | null
    experience: number | null
    qualification: string | null
    hospital: {
        id: number | null
        name: string | null
    } | null
    phone: string | null
    city: string | null
    isVerified: boolean | null
    patientsAppointed: number | null
}

export type APPOINTMENTS = {
    id: number
    name: string
    age: number
    gender: string
    address: string | null
    problem: string
    mobile: string
    appointmentDate: string
    medicines: string | null
    hospital: string;
    doctor: string | null
    status: boolean
}

export type MEDICINETYPES = {
    medicine: string
    consumption: string
    days: number
}