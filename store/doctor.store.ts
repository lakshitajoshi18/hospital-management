import { Doctors, Hospitals, Patients } from "@/config/schema";
import bcrypt from 'bcryptjs';
import { and, eq } from "drizzle-orm";
import { toast } from "sonner";
import { create } from "zustand";
import { db } from "../config/index";
import { APPOINTMENTS, DOCTORTYPE } from "@/types";

const DOCTOR_TOKEN_KEY = "doctorToken";

const createDoctorToken = (doctorId: string | null) => {
    if (!doctorId) return null;
    return String(doctorId);
}

const parseDoctorIdFromToken = (token: string) => {
    const doctorId = (token);
    return doctorId;
}

const generateUUID = () => {
    if (typeof globalThis !== "undefined" && globalThis.crypto?.randomUUID) {
        return globalThis.crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

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
    user: DOCTORTYPE | null,
    token: string | null,
    isAdmin: boolean;
    isCheckingUser: boolean;
    appointedPaitentsList: APPOINTMENTS[],
    appointmentList: APPOINTMENTS[];
    selectedPatient: APPOINTMENTS | null;
    signup: (input: DoctorSignupInput) => Promise<void>;
    login: (input: DoctorLoginInput) => Promise<void>;
    checkAuth: () => void;
    logout: () => void;
    getAppointmentList: () => Promise<void>;
    selectPatient: (patient: APPOINTMENTS) => Promise<void>;
    appointPatient: (id: string, medicines: string) => Promise<void>;
    updateProfile: (input: any) => Promise<void>;
    getAppointedPatientList: () => Promise<void>;
}

const authMiddleware = async () => {
    const token = localStorage.getItem(DOCTOR_TOKEN_KEY);
    if (!token) return null;
    const doctorId = parseDoctorIdFromToken(token);
    if (!doctorId) return null;

    const user = await db.select({
        uid: Doctors.uid,
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
    }).from(Doctors)
        .fullJoin(Hospitals, eq(Doctors.hospital, Hospitals.id))
        .where(eq(Doctors.uid, doctorId));

    if (!user) return null;
    return user[0];
}

export const useDoctorStore = create<DOCTORSTOREINTERFACE>((set, get) => ({
    user: null,
    token: null,
    isAdmin: false,
    isCheckingUser: true,
    appointmentList: [],
    appointedPaitentsList: [],
    selectedPatient: null,
    // signup controller
    signup: async (input: DoctorSignupInput) => {
        try {
            if (!(input.name && input.hospital && input.experience && input.specialization && input.qualification && input.phone && input.password)) {
                toast.error("Please fill all the fields");
                return;
            }

            const existingUser = await db.select({
                id: Doctors.id,
                phone: Doctors.phone
            }).from(Doctors).where(eq(Doctors.phone, input.phone));
            if (existingUser.length > 0) {
                toast.error("User with same phone number already exists");
                return;
            }

            const hashedPassword = await bcrypt.hash(input.password, 10);
            const uid = generateUUID();

            // check if user id in the list of admin ids
            const isAdminId = process.env.NEXT_PUBLIC_ADMIN_PHONES?.split(',').includes(input.phone);

            await db.insert(Doctors).values({
                uid: uid,
                hospital: input.hospital,
                name: input.name,
                experience: input.experience,
                specialization: input.specialization,
                qualification: input.qualification,
                phone: input.phone,
                password: hashedPassword,
                city: input.city,
                isVerified: isAdminId ? true : false
            }).then(async () => {
                const response = await db.select({
                    uid: Doctors.uid,
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
                    .from(Doctors)
                    .fullJoin(Hospitals, eq(Doctors.hospital, Hospitals.id))
                    .where(eq(Doctors.phone, input.phone))
                    .limit(1);

                // if User get the response
                if (response.length > 0) {
                    const token = createDoctorToken(response[0].uid);

                    if (token) {
                        set({ token });
                        localStorage.setItem(DOCTOR_TOKEN_KEY, token);
                    }
                    toast.success("Doctor Registered Successfully");
                    set({ user: response[0], isAdmin: isAdminId });
                }
            });

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
            const existingUser = await db.select({
                uid: Doctors.uid,
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
                patientsAppointed: Doctors.patientsAppointed,
                password: Doctors.password
            }).from(Doctors)
                .fullJoin(Hospitals, eq(Doctors.hospital, Hospitals.id))
                .where(eq(
                    Doctors.phone, input.phone
                ))
                .limit(1);

            if (existingUser.length === 0) {
                toast.error("User not found");
                return
            }

            // compare the password of user and input
            const isMatch = await bcrypt.compare(input.password, existingUser[0].password!);
            if (!isMatch) {
                toast.error("Incorrect Password");
                return
            }

            // create a client-safe auth token from doctor id
            const token = createDoctorToken(existingUser[0].uid);
            if (token) {
                set({ token });
                localStorage.setItem(DOCTOR_TOKEN_KEY, token);
            }
            if (existingUser[0]) {
                const isAdminId = process.env.NEXT_PUBLIC_ADMIN_PHONES?.split(',').includes(existingUser[0].phone!);
                console.log(isAdminId === true)
                set({
                    user: existingUser[0],
                    isAdmin: isAdminId
                });
            }
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
            if (user) {
                set({ user, isCheckingUser: false });
                const isAdminId = process.env.NEXT_PUBLIC_ADMIN_PHONES?.split(',').includes(user.phone!);
                set({ isAdmin: isAdminId });
            }
        } catch (error) {
        }
        finally {
            set({ isCheckingUser: false })
        }
    },
    // logout controller
    logout: () => {
        set({ user: null, token: null, isAdmin: false });
        localStorage.removeItem(DOCTOR_TOKEN_KEY);
    },
    // get appointment list 
    getAppointmentList: async () => {
        try {
            if (!get().user) return;
            const response = await db.select({
                id: Patients.id,
                name: Patients.name,
                age: Patients.age,
                gender: Patients.gender,
                address: Patients.address,
                problem: Patients.problem,
                mobile: Patients.mobile,
                appointmentDate: Patients.appointmentDate,
                medicines: Patients.medicines,
                hospital: {
                    id: Hospitals.id,
                    name: Hospitals.name
                },
                appointedBy: {
                    id: Doctors.id,
                    name: Doctors.name
                },
                isAppointed: Patients.isAppointed
            })
                .from(Patients)
                .fullJoin(Hospitals, eq(Patients.hospital, Hospitals.id))
                .fullJoin(Doctors, eq(Patients.appointedBy, Doctors.id))
                .where(
                    and(
                        eq(Patients.hospital, Number(get().user?.hospital?.id)),
                        eq(Patients.isAppointed, false),
                        eq(Patients.appointmentDate, new Date().toISOString().split('T')[0])
                    )
                );
            const normalizedAppointments: APPOINTMENTS[] = response
                .filter((item) => item.id !== null)
                .map((item) => ({
                    id: item.id ?? 0,
                    name: item.name ?? "Unknown Patient",
                    age: item.age ?? 0,
                    gender: item.gender ?? "other",
                    address: item.address,
                    problem: item.problem ?? "Not specified",
                    mobile: item.mobile ?? "N/A",
                    appointmentDate: item.appointmentDate ?? new Date().toISOString().split('T')[0],
                    medicines: item.medicines,
                    hospital: {
                        id: item.hospital?.id ?? 0,
                        name: item.hospital?.name ?? "Unknown Hospital"
                    },
                    appointedBy: item.appointedBy?.id
                        ? {
                            id: item.appointedBy.id,
                            name: item.appointedBy.name ?? "Unknown Doctor"
                        }
                        : null,
                    isAppointed: item.isAppointed ?? false,
                }))

            set({ appointmentList: normalizedAppointments })
        } catch (error) {
            console.log(error);
        }
    },
    // select patient
    selectPatient: async (APPOINTMENTS) => {
        try {
            set({ selectedPatient: APPOINTMENTS })
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error)
        }
    },
    // appoint Patient
    appointPatient: async (id, medicines) => {
        try {
            const response = await db.update(Patients)
                .set({
                    medicines: medicines,
                    isAppointed: true,
                })
                .where(eq(Patients.id, Number(id)))
                .returning()

            if (response) {
                set({ selectedPatient: null })
                toast.success("Patient Appointed Successfully")
            }
        } catch (error) {
            console.log(error)
        }
    },
    // update Profile
    updateProfile: async (input) => {
        try {
            await db.update(Doctors)
                .set(input)
                .where(eq(Doctors.id, Number(get().user?.id)))
                .returning().then(async () => {
                    const res = await db.select({
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
                    }).from(Doctors)
                        .fullJoin(Hospitals, eq(Doctors.hospital, Hospitals.id))
                        .where(eq(Doctors.id, Number(get().user?.id))).limit(1);
                    if (res) {
                        set({ user: res[0] })
                        toast.success("Profile Updated Successfully");
                    }
                })
        } catch (error) {
            console.log(error)
        }
    },
    // get appointed Patients
    getAppointedPatientList: async () => {
        try {
            const response = await db.select({
                id: Patients.id,
                name: Patients.name,
                age: Patients.age,
                gender: Patients.gender,
                address: Patients.address,
                problem: Patients.problem,
                mobile: Patients.mobile,
                appointmentDate: Patients.appointmentDate,
                medicines: Patients.medicines,
                hospital: {
                    id: Hospitals.id,
                    name: Hospitals.name
                },
                appointedBy: {
                    id: Doctors.id,
                    name: Doctors.name
                },
                isAppointed: Patients.isAppointed
            })
                .from(Patients)
                .fullJoin(Hospitals, eq(Patients.hospital, Hospitals.id))
                .fullJoin(Doctors, eq(Patients.appointedBy, Doctors.id))
                .where(
                    and(
                        eq(Patients.appointedBy, Number(get().user?.id)),
                        eq(Patients.hospital, Number(get().user?.hospital?.id)),
                        eq(Patients.isAppointed, true)
                    )
                );
            const normalizedAppointments: APPOINTMENTS[] = response
                .filter((item) => item.id !== null)
                .map((item) => ({
                    id: item.id ?? 0,
                    name: item.name ?? "Unknown Patient",
                    age: item.age ?? 0,
                    gender: item.gender ?? "other",
                    address: item.address,
                    problem: item.problem ?? "Not specified",
                    mobile: item.mobile ?? "N/A",
                    appointmentDate: item.appointmentDate ?? new Date().toISOString().split('T')[0],
                    medicines: item.medicines,
                    hospital: {
                        id: item.hospital?.id ?? 0,
                        name: item.hospital?.name ?? "Unknown Hospital"
                    },
                    appointedBy: item.appointedBy?.id
                        ? {
                            id: item.appointedBy.id,
                            name: item.appointedBy.name ?? "Unknown Doctor"
                        }
                        : null,
                    isAppointed: item.isAppointed ?? false,
                }))

            set({ appointedPaitentsList: normalizedAppointments })
        } catch (error) {
            console.log(error);
        }
    },

}))