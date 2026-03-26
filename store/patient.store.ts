import { db } from "@/config";
import { Doctors, Hospitals, Patients } from "@/config/schema";
import { DOCTORTYPE } from "@/types";
import { id } from "date-fns/locale";
import { eq, sql } from "drizzle-orm";
import { toast } from "sonner";
import { create } from "zustand";

type HospitalListItem = {
    id: number;
    name: string;
}

interface PATIENTSTORENTERFACE {
    // variables
    list: any[],
    appointment: any,
    doctorList: DOCTORTYPE[]
    hospitalList: HospitalListItem[]

    // functions
    getDoctorList: () => Promise<void>;
    getHospitalList: () => Promise<void>;
    bookAppointment: (input: any) => Promise<void>;
    cancelAppointment: (input: any) => Promise<void>;
    getAppointmentList: (input: any) => Promise<void>;
    getSingleAppointment: (input: any) => Promise<void>;
    changeAppointmentStatus: (input: any) => Promise<void>;

}

export const usePatientStore = create<PATIENTSTORENTERFACE>((set, get) => ({

    list: [],
    doctorList: [],
    hospitalList: [],
    appointment: null,
    // get Doctor List
    getDoctorList: async () => {
        try {
            const response = await db.select({
                id: Doctors.id,
                name: Doctors.name,
                specialization: Doctors.specialization,
                experience: Doctors.experience,
                qualification: Doctors.qualification,
                hospital: {
                    id: Hospitals.id,
                    name: Hospitals.name
                },
                phone: Doctors.phone,
                city: Doctors.city,
                isVerified: Doctors.isVerified,
                patientsAppointed: Doctors.patientsAppointed
            })
                .from(Doctors).fullJoin(Hospitals, eq(Doctors.hospital, Hospitals.id))
                .where(eq(Doctors.isVerified, true))
                .orderBy(sql`RANDOM()`)
                .limit(12);
            set({ doctorList: response })
        } catch (error) {
        }
    },

    // get Hospital List
    getHospitalList: async () => {
        try {
            const response = await db.select({
                id: Hospitals.id,
                name: Hospitals.name,
            })
                .from(Hospitals)
                .orderBy(Hospitals.name);

            set({ hospitalList: response })
        } catch (error) {
            toast.error("Unable to fetch hospital list")
        }
    },

    // book appointment
    bookAppointment: async (input) => {
        try {
            if (!(input.name && input.age && input.gender && input.address && input.problem && input.mobile && input.appointmentDate)) {
                alert("Please fill all the fields");
                return;
            }

            // save appointment to database
            const response = await db.insert(Patients).values({
                address: input.address,
                age: input.age,
                appointmentDate: input.appointmentDate,
                gender: input.gender,
                hospital: input.hospital,
                mobile: input.mobile,
                name: input.name,
                problem: input.problem,
            }).returning();

            if (response) {
                toast.success("Appointment Booked Successfully");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    },

    // cancel Appointment
    cancelAppointment: async (input) => {
        const response = await db.delete(Patients).where(eq(Patients.id, input.id));
        if (response) {
            alert("Appointment Cancelled Successfully");
        }
    },

    // get appointment list
    getAppointmentList: async (input) => {
        const response = await db.select().from(Patients).where(eq(Patients.mobile, input.mobile))
        set({ list: response })
    },

    // get single appointment
    getSingleAppointment: async (input) => {
        const response = (await db.select().from(Patients).where(
            eq(Patients.id, input.id)
        ));

        if (response) {
            set({ appointment: response[0] })
        }
    },

    // change appointment status
    changeAppointmentStatus: async (input) => {
        const response = await db.update(Patients).set({
            isAppointed: input.isAppointed,
            appointedBy: input.appointedBy
        }).where(eq(Patients.id, input.id))
    },


}))