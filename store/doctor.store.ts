import { toast } from "sonner";
import { create } from "zustand";
import { clientFetch } from "@/lib/api-client";
import { APPOINTMENTS, DOCTORTYPE } from "@/types";

const DOCTOR_TOKEN_KEY = "doctorToken";

const createDoctorToken = (doctorId: string | null) => {
    if (!doctorId) return null;
    return String(doctorId);
}

const parseDoctorIdFromToken = (token: string) => token;

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

interface WeeklyAppointments {
    day: string;
    appointments: number
}

interface DOCTORSTOREINTERFACE {
    // variables
    user: DOCTORTYPE | null,
    token: string | null,
    isAdmin: boolean;
    isCheckingUser: boolean;
    appointedPaitentsList: APPOINTMENTS[],
    appointmentList: APPOINTMENTS[];
    selectedPatient: APPOINTMENTS | null;
    weeklyAppointmentsData: WeeklyAppointments[];
    // functions
    signup: (input: DoctorSignupInput) => Promise<void>;
    login: (input: DoctorLoginInput) => Promise<void>;
    checkAuth: () => void;
    logout: () => void;
    getAppointmentList: () => Promise<void>;
    selectPatient: (patient: APPOINTMENTS) => Promise<void>;
    appointPatient: (id: string, medicines: string) => Promise<void>;
    updateProfile: (input: any) => Promise<void>;
    getAppointedPatientList: () => Promise<void>;
    getWeeklyAppointments: () => Promise<void>;
}

const authMiddleware = async () => {
    const token = localStorage.getItem(DOCTOR_TOKEN_KEY);
    if (!token) return null;
    const doctorId = parseDoctorIdFromToken(token);
    if (!doctorId) return null;

    try {
        const response = await clientFetch(`/api/doctors/me?uid=${encodeURIComponent(doctorId)}`)
        return response || null
    } catch (error) {
        console.error(error)
        return null
    }
}

export const useDoctorStore = create<DOCTORSTOREINTERFACE>((set, get) => ({
    user: null,
    token: null,
    isAdmin: false,
    isCheckingUser: true,
    appointmentList: [],
    appointedPaitentsList: [],
    weeklyAppointmentsData: [],
    selectedPatient: null,
    // signup controller
    signup: async (input: DoctorSignupInput) => {
        try {
            if (!(input.name && input.hospital && input.experience && input.specialization && input.qualification && input.phone && input.password)) {
                toast.error('Please fill all the fields');
                return;
            }

            const response = await clientFetch('/api/doctors/signup', {
                method: 'POST',
                body: JSON.stringify(input),
            })

            if (response.user) {
                const token = createDoctorToken(response.user.uid);
                if (token) {
                    set({ token });
                    localStorage.setItem(DOCTOR_TOKEN_KEY, token);
                }
                const isAdminId = process.env.NEXT_PUBLIC_ADMIN_PHONES?.split(',').includes(input.phone);
                set({ user: response.user, isAdmin: isAdminId });
                toast.success('Doctor Registered Successfully');
            }
        } catch (error) {
            toast.error('Something went wrong');
            console.log(error)
        }
    },
    // login controller
    login: async (input: DoctorLoginInput) => {
        try {
            if (!(input.phone && input.password)) {
                toast.warning('Please fill all the fields')
                return;
            }

            const response = await clientFetch('/api/doctors/login', {
                method: 'POST',
                body: JSON.stringify(input),
            })

            if (response?.user) {
                const token = createDoctorToken(response.user.uid);
                if (token) {
                    set({ token });
                    localStorage.setItem(DOCTOR_TOKEN_KEY, token);
                }
                const isAdminId = process.env.NEXT_PUBLIC_ADMIN_PHONES?.split(',').includes(response.user.phone);
                set({
                    user: response.user,
                    isAdmin: isAdminId,
                });
            }
        }
        catch (error) {
            toast.error('Something went wrong');
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
            const currentUser = get().user;
            if (!currentUser?.id || !currentUser?.hospital?.id) {
                console.warn('getAppointmentList skipped because user or hospital data is missing', currentUser);
                set({ appointmentList: [] });
                return;
            }

            const response = await clientFetch<APPOINTMENTS[]>(
                `/api/doctors/appointments?doctorId=${encodeURIComponent(String(currentUser.id))}&hospitalId=${encodeURIComponent(String(currentUser.hospital.id))}&date=${encodeURIComponent(new Date().toISOString().split('T')[0])}`
            )

            set({ appointmentList: response })
        } catch (error) {
            console.log(error);
            set({ appointmentList: [] });
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
            const medicineInput = JSON.stringify(medicines);
            await clientFetch('/api/doctors/appoint', {
                method: 'POST',
                body: JSON.stringify({
                    id: Number(id),
                    medicines: medicineInput,
                    appointedBy: get().user?.id,
                }),
            })
            toast.success('Patient Appointed Successfully')
        } catch (error) {
            console.log(error)
        }
    },
    // update Profile
    updateProfile: async (input) => {
        try {
            const response = await clientFetch('/api/doctors/profile', {
                method: 'PATCH',
                body: JSON.stringify({
                    id: get().user?.id,
                    ...input,
                }),
            })

            if (response?.user) {
                set({ user: response.user })
                toast.success('Profile Updated Successfully');
            }
        } catch (error) {
            console.log(error)
        }
    },
    // get appointed Patients
    getAppointedPatientList: async () => {
        try {
            const currentUser = get().user;
            if (!currentUser?.id || !currentUser?.hospital?.id) {
                console.warn('getAppointedPatientList skipped because user or hospital data is missing', currentUser);
                set({ appointedPaitentsList: [] });
                return;
            }

            const response = await clientFetch<APPOINTMENTS[]>(
                `/api/doctors/appointed-patients?doctorId=${encodeURIComponent(String(currentUser.id))}&hospitalId=${encodeURIComponent(String(currentUser.hospital.id))}`
            )

            set({ appointedPaitentsList: response })
        } catch (error) {
            console.log(error);
            set({ appointedPaitentsList: [] });
        }
    },

    getWeeklyAppointments: async () => {
        try {
            const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
            const emptyWeekData: WeeklyAppointments[] = dayLabels.map((day) => ({ day, appointments: 0 }));
            const currentUser = get().user;

            if (!currentUser?.id || !currentUser?.hospital?.id) {
                set({ weeklyAppointmentsData: emptyWeekData });
                return;
            }

            const now = new Date();
            const startOfWeek = new Date(now);
            const mondayOffset = (startOfWeek.getDay() + 6) % 7;
            startOfWeek.setDate(startOfWeek.getDate() - mondayOffset);
            startOfWeek.setHours(0, 0, 0, 0);

            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(endOfWeek.getDate() + 6);
            endOfWeek.setHours(23, 59, 59, 999);

            const response = await clientFetch<{ appointmentDate: string }[]>(
                `/api/doctors/weekly-appointments?hospitalId=${encodeURIComponent(String(currentUser.hospital.id))}&start=${encodeURIComponent(startOfWeek.toISOString().split('T')[0])}&end=${encodeURIComponent(endOfWeek.toISOString().split('T')[0])}`
            );

            const appointmentsPerDay = [0, 0, 0, 0, 0, 0, 0];

            response.forEach((item) => {
                if (!item.appointmentDate) return;
                const appointmentDate = new Date(item.appointmentDate as unknown as string);
                if (Number.isNaN(appointmentDate.getTime())) return;

                const dayIndex = (appointmentDate.getDay() + 6) % 7;
                appointmentsPerDay[dayIndex] += 1;
            });

            const weeklyAppointmentsData: WeeklyAppointments[] = dayLabels.map((day, index) => ({
                day,
                appointments: appointmentsPerDay[index],
            }));

            set({ weeklyAppointmentsData });
        } catch (error) {
            console.log(error);
        }
    }

}))