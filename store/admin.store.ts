import { toast } from "sonner";
import { create } from "zustand";
import { clientFetch } from "@/lib/api-client";
import { HospitalFormData, HospitalListItem } from "@/types";

type RegisterHospitalInput = HospitalFormData;
type VerifyDoctorInput = { id: number };

interface ADMINSTOREINTERFACE {
    doctorList: any[]
    hospitalList: HospitalListItem[],
    getDoctorList: () => Promise<void>
    getHospitalList: () => Promise<void>
    registerHospital: (input: RegisterHospitalInput) => Promise<boolean>;
    verifyDoctors: (input: VerifyDoctorInput) => Promise<void>;
}

export const AdminStore = create<ADMINSTOREINTERFACE>((set, get) => ({
    doctorList: [],
    hospitalList: [],
    // register hospital
    registerHospital: async (input) => {
        if (!(input.name && input.registrationNumber && input.type && input.address && input.city && input.state && input.phone)) {
            toast.error('Please fill all required hospital fields')
            return false
        }

        try {
            await clientFetch('/api/hospitals', {
                method: 'POST',
                body: JSON.stringify(input),
            })

            toast.success('Hospital Registered Successfully')
            return true
        } catch (error) {
            console.log(error)
            toast.error('Failed to register hospital')
            return false
        }
    },

    // get doctors list
    getDoctorList: async () => {
        try {
            const response = await clientFetch('/api/doctors/list')
            set({ doctorList: response })
        } catch (error) {
            console.log(error)
            toast.error('Unable to fetch doctor list')
        }
    },

    // get hospitals list
    getHospitalList: async () => {
        try {
            const response = await clientFetch('/api/hospitals')
            set({ hospitalList: response })
            console.log(response)
        } catch (error) {
            console.log(error)
            toast.error('Unable to fetch hospital list')
        }
    },

    // verify doctors
    verifyDoctors: async (input) => {
        try {
            await clientFetch('/api/doctors/verify', {
                method: 'PATCH',
                body: JSON.stringify(input),
            })
        } catch (error) {
            console.log(error)
            toast.error('Unable to verify doctor')
        }
    }
}))