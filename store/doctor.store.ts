import { Doctors } from "@/config/schema";
import bcrypt from 'bcryptjs';
import { eq } from "drizzle-orm";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { toast } from "sonner";
import { create } from "zustand";
import { db } from "../config/index";

interface DoctorSignupInput {
    name: string;
    hospital: number;
    experience: number;
    specialization: string;
    qualification: string;
    phone: string;
    password: string;
    city?: string;
}

interface DoctorLoginInput {
    phone: string;
    password: string;
}

interface DOCTORSTOREINTERFACE {
    user: any,
    token: string | null,
    signup: (input: DoctorSignupInput) => Promise<void>;
    login: (input: DoctorLoginInput) => Promise<void>;
    checkAuth: () => void;
    isAdmin: boolean;
    isCheckingUser: boolean;
    logout: () => void;
}

const authMiddleware = async () => {
    const token = localStorage.getItem("doctorToken");
    if (!token) return null;
    const decoded = jwt.decode(token) as JwtPayload;

    const user = await db.select({

    }).from(Doctors).where(eq(Doctors.id, decoded.id));

    if (!user) return null;
    return user[0];
}

export const useDoctorStore = create<DOCTORSTOREINTERFACE>((set, get) => ({
    user: null,
    token: null,
    isAdmin: false,
    isCheckingUser: true,
    // signup controller
    signup: async (input: DoctorSignupInput) => {
        try {
            if (!(input.name && input.hospital && input.experience && input.specialization && input.qualification && input.phone && input.password)) {
                toast.error("Please fill all the fields");
                return;
            }

            const existingUser = await db.select().from(Doctors).where(eq(Doctors.phone, input.phone));
            if (existingUser.length > 0) {
                toast.error("User with same phone number already exists");
                return;
            }

            const hashedPassword = await bcrypt.hash(input.password, 10);

            const response = await db.insert(Doctors).values({
                hospital: input.hospital,
                name: input.name,
                experience: input.experience,
                specialization: input.specialization,
                qualification: input.qualification,
                phone: input.phone,
                password: hashedPassword,
                city: input.city,
            } as any).returning();

            if (response.length > 0) {
                const token = jwt.sign({ id: response[0].id }, process.env.NEXT_PUBLIC_JWT_SECRET!);
                if (token) {
                    set({ token });
                    localStorage.setItem('doctorToken', token);
                }
                toast.success("Doctor Registered Successfully");
                set({ user: response[0] })
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error)
        }
    },
    // login controller
    login: async (input: DoctorLoginInput) => {
        try {
            if (!(input.phone && input.password)) {
                toast.warning("Please fill all the fields")
                return;
            }

            // find user in the database
            const existingUser = await db.select().from(Doctors).where(eq(
                Doctors.phone, input.phone
            ));
            if (existingUser.length === 0) {
                toast.error("User not found");
                return
            }

            // compare the password of user and input
            const isMatch = await bcrypt.compare(input.password, existingUser[0].password);
            if (!isMatch) {
                toast.error("Incorrect Password");
                return
            }

            // creating the jwt token
            const token = jwt.sign({ id: existingUser[0].id }, process.env.NEXT_PUBLIC_JWT_SECRET!);
            if (token) {
                set({ token });
                localStorage.setItem('doctorToken', token);
            }
            set({ user: existingUser[0] });
        }
        catch (error) {
            toast.error("Something went wrong");
            console.log(error)
        }
    },
    // check-authcontroller
    checkAuth: async () => {
        try {
            set({ isCheckingUser: true })
            const user = await authMiddleware();
            // check for admin 
            // if (user?.phone === process.env.NEXT_PUBLIC_ADMIN_PHONE) set({ isAdmin: true });
            if (user) {
                set({ user, isCheckingUser: false });
            }
        } catch (error) {

        }
        finally {
            set({ isCheckingUser: false })
        }
    },
    // logout controller
    logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem('doctorToken');
    },
}))