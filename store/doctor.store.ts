import { create } from "zustand"
import { db } from "../config/index";
import { Doctors } from "@/config/schema";
import bcrypt from 'bcryptjs'
import { eq } from "drizzle-orm";
interface DOCTORSTOREINTERFACE {
    user: any,
    signup: (input: any) => void;
    login: (input: any) => void;
}

export const useDoctorStore = create<DOCTORSTOREINTERFACE>((set, get) => ({
    user: null,
    signup: async (input: any) => {
        if (!(input.name && input.hospital && input.experience && input.specialization && input.qualification && input.phone && input.password && input.confirmPassword)) {
            alert("Please fill all the fields")
            return;
        }

        // hash the password of the user
        const hashedPassword = bcrypt.hash(input.password, 10);
        console.log(hashedPassword);

        // handle signup logic and save user value to database
        const response = await db.insert(Doctors).values({
            hospital: input.hospital,
            name: input.name,
            experience: input.experience,
            specialization: input.specialization,
            qualification: input.qualification,
            phone: input.phone,
            password: hashedPassword,
            city: input.city,
        } as any)

        if (response) {
            alert("User Registered Successfully");
            set({ user: response })
        }
    },
    login: async (input: any) => {
        if (!(input.phone && input.password)) {
            alert("Please fill all the fields")
            return;
        }

        // find user in the database
        const existingUser = await db.select().from(Doctors).where(eq(
            input.phone, Doctors.phone
        ));
        if (!existingUser) {
            alert("User not found");
            return
        }

        // compare the password of user and input
        if (await bcrypt.compare(input.password, existingUser[0].password)) {
            alert("Login Successfull");
            set({ user: existingUser[0] })
        }

    },
}))