import { db } from "@/config";
import { Doctors, Hospitals } from "@/config/schema";
import { eq } from "drizzle-orm";
import { create } from "zustand";

interface ADMINSTOREINTERFACE {
    registerHospital: (input: any) => Promise<void>;
    verifyDoctors: (input: any) => Promise<void>;
}

export const AdminStore = create<ADMINSTOREINTERFACE>((set, get) => ({

    // register hospital
    registerHospital: async (input) => {
        if (!(input.name && input.registrationNumber && input.type)) {
            alert("Please fill all the fields")
            return
        }

        // check hospital with same registration number
        const existingHospital = await db.select().from(Hospitals).where(eq(input.registrationNumber, Hospitals.registrationNumber));
        if (existingHospital) {
            alert("Hospital with same registration number already exists")
            return
        }

        // set values to databse
        const response = await db.insert(Hospitals).values({
            address: input.address,
            city: input.city,
            name: input.name,
            pincode: input.pincode,
            registrationNumber: input.registrationNumber,
            state: input.state,
            type: input.type,
            phone: input.phone,
            email: input.email,
            website: input.website,
            ambulances: input.ambulances,
            departments: input.departments,
            description: input.description,
            emergencyAvailable: input.emergencyAvailable,
            hasBloodBank: input.hasBloodBank,
            hasCTScan: input.hasCTScan,
            hasMRI: input.hasMRI,
            hasPathologyLab: input.hasPathologyLab,
            hasPharmacy: input.hasPharmacy,
            hasUltrasound: input.hasUltrasound,
            hasXray: input.hasXray,
            icuBeds: input.icuBeds,
            numberOfBeds: input.numberOfBeds,
            operatingHours: input.operatingHours,
            oxygenCylinders: input.oxygenCylinders,
            ventilators: input.ventilators
        })

        if (response) {
            alert("Hospital Registered Successfully")
        }
    },

    // verify doctors
    verifyDoctors: async (input) => {
        const response = await db.update(Doctors).set({
            isVerified: true
        }).where(eq(Doctors.id, input.id))
    }
}))