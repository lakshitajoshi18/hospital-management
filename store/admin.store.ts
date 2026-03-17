import { db } from "@/config";
import { Doctors, Hospitals } from "@/config/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";
import { create } from "zustand";
import { HospitalFormData } from "@/types";

type RegisterHospitalInput = HospitalFormData;
type VerifyDoctorInput = { id: number };

interface ADMINSTOREINTERFACE {
    registerHospital: (input: RegisterHospitalInput) => Promise<boolean>;
    verifyDoctors: (input: VerifyDoctorInput) => Promise<void>;
}

export const AdminStore = create<ADMINSTOREINTERFACE>((set, get) => ({

    // register hospital
    registerHospital: async (input) => {
        if (!(input.name && input.registrationNumber && input.type && input.address && input.city && input.state && input.phone)) {
            toast.error("Please fill all required hospital fields")
            return false
        }

        try {
            const existingHospital = await db
                .select()
                .from(Hospitals)
                .where(eq(Hospitals.registrationNumber, input.registrationNumber));

            if (existingHospital.length > 0) {
                toast.error("Hospital with same registration number already exists")
                return false
            }

            const response = await db.insert(Hospitals).values({
                address: input.address,
                city: input.city,
                name: input.name,
                pincode: input.pincode || null,
                registrationNumber: input.registrationNumber,
                state: input.state,
                type: input.type,
                phone: input.phone,
                email: input.email || null,
                website: input.website || null,
                ambulances: Number(input.ambulances) || 0,
                departments: input.departments,
                description: input.description || null,
                emergencyAvailable: input.emergencyAvailable,
                hasBloodBank: input.hasBloodBank,
                hasCTScan: input.hasCTScan,
                hasMRI: input.hasMRI,
                hasPathologyLab: input.hasPathologyLab,
                hasPharmacy: input.hasPharmacy,
                hasUltrasound: input.hasUltrasound,
                hasXray: input.hasXray,
                icuBeds: Number(input.icuBeds) || 0,
                numberOfBeds: Number(input.numberOfBeds) || 0,
                operatingHours: input.operatingHours || null,
                oxygenCylinders: Number(input.oxygenCylinders) || 0,
                ventilators: Number(input.ventilators) || 0,
            }).returning();

            if (response.length > 0) {
                toast.success("Hospital Registered Successfully")
                return true
            }

            return false
        } catch (error) {
            console.log(error)
            toast.error("Failed to register hospital")
            return false
        }
    },

    // verify doctors
    verifyDoctors: async (input) => {
        await db.update(Doctors).set({
            isVerified: true
        }).where(eq(Doctors.id, input.id))
    }
}))