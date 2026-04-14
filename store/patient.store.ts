import { DOCTORTYPE, HospitalListItem } from "@/types";
import { toast } from "sonner";
import { create } from "zustand";
import { clientFetch } from "@/lib/api-client";


interface PATIENTSTORENTERFACE {
    // variables
    list: any[],
    appointment: any,
    doctorList: DOCTORTYPE[]
    hospitalList: HospitalListItem[],
    cityHospitalList: HospitalListItem[],
    
    
    // functions
    getDoctorList: () => Promise<void>;
    getHospitalList: () => Promise<void>;
    bookAppointment: (input: any) => Promise<void>;
    cancelAppointment: (input: any) => Promise<void>;
    getAppointmentList: (input: any) => Promise<void>;
    getSingleAppointment: (input: any) => Promise<void>;
    changeAppointmentStatus: (input: any) => Promise<void>;
    getCityHospitalList: (city: string) => Promise<void>;

}

export const usePatientStore = create<PATIENTSTORENTERFACE>((set, get) => ({

    list: [],
    doctorList: [],
    hospitalList: [],
    cityHospitalList: [],
    appointment: null,
    // get Doctor List
    getDoctorList: async () => {
        try {
            const response = await clientFetch<DOCTORTYPE[]>('/api/doctors?verified=true')
            set({ doctorList: response })
        } catch (error) {
            console.error(error)
        }
    },

    // get Hospital List
    getHospitalList: async () => {
        try {
            const response = await clientFetch<HospitalListItem[]>('/api/hospitals')
            set({ hospitalList: response })
        } catch (error) {
            toast.error('Unable to fetch hospital list')
        }
    },

    // book appointment
    bookAppointment: async (input) => {
        try {
            if (!(input.name && input.age && input.gender && input.address && input.problem && input.mobile && input.appointmentDate && input.hospital)) {
                alert('Please fill all the fields');
                return;
            }

            const hospitalId = Number(input.hospital)
            if (!hospitalId || Number.isNaN(hospitalId)) {
                alert('Please select a valid hospital');
                return;
            }

            await clientFetch('/api/patients/book', {
                method: 'POST',
                body: JSON.stringify({
                    ...input,
                    hospital: hospitalId,
                }),
            })
            toast.success('Appointment Booked Successfully');
        } catch (error) {
            toast.error('Something went wrong');
            console.log(error)
        }
    },

    // cancel Appointment
    cancelAppointment: async (input) => {
        try {
            await clientFetch('/api/patients/cancel', {
                method: 'DELETE',
                body: JSON.stringify({ id: input.id }),
            })
            alert('Appointment Cancelled Successfully');
        } catch (error) {
            console.log(error)
            toast.error('Unable to cancel appointment')
        }
    },

    // get appointment list
    getAppointmentList: async (input) => {
        try {
            const response = await clientFetch<any[]>(`/api/patients/list?mobile=${encodeURIComponent(input.mobile)}`)
            set({ list: response })
        } catch (error) {
            console.log(error)
            set({ list: [] })
        }
    },

    // get single appointment
    getSingleAppointment: async (input) => {
        try {
            const response = await clientFetch<any[]>(`/api/patients/single?id=${encodeURIComponent(input.id)}`)
            if (response.length > 0) {
                set({ appointment: response[0] })
            }
        } catch (error) {
            console.log(error)
        }
    },

    // change appointment status
    changeAppointmentStatus: async (input) => {
        try {
            await clientFetch('/api/patients/status', {
                method: 'PATCH',
                body: JSON.stringify(input),
            })
        } catch (error) {
            console.log(error)
        }
    },

    getCityHospitalList: async (city) => {
        try {
            const response = await clientFetch<HospitalListItem[]>(`/api/hospitals?city=${encodeURIComponent(city)}`)
            set({ cityHospitalList: response })
        } catch (error) {
            console.log(error)
            toast.error('Unable to fetch hospital list for the city')
        }
    },


}))