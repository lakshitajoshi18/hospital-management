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