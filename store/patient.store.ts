import { db } from "@/config";
import { Patients } from "@/config/schema";
import { eq } from "drizzle-orm";
import { create } from "zustand";

interface PATIENTSTORENTERFACE {

    // variables
    list: any[],
    appointment: any,

    // functions
    bookAppointment: (input: any) => Promise<void>;
    cancelAppointment: (input: any) => Promise<void>;
    getAppointmentList: (input: any) => Promise<void>;
    getSingleAppointment: (input: any) => Promise<void>;
    changeAppointmentStatus: (input: any) => Promise<void>;

}

export const PATIENTSTORE = create<PATIENTSTORENTERFACE>((set, get) => ({

    list: [],
    appointment: null,
    bookAppointment: async (input) => {
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
        })

        if (response) {
            alert("Appointment Booked Successfully");
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