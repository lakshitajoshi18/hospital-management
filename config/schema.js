import { boolean, date, integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const Doctors = pgTable("doctors",
    {
        id: serial("id").primaryKey(),
        name: text("name").notNull(),
        uid: varchar("uuid").notNull().unique(),
        specialization: text("specialization").notNull(),
        qualification: text("qualification").notNull(),
        experience: integer("experience").notNull().default(0),
        hospital: integer("hospital").notNull().references(() => Hospitals.id),
        phone: varchar("phone").notNull().unique(),
        password: varchar("password").notNull(),
        loginType: varchar("loginType").notNull().default("doctor"),
        city: varchar("city"),
        isVerified: boolean("isVerified").notNull().default(false),
        patientsAppointed: integer("patientsAppointed").notNull().default(0)
    }
)

export const Hospitals = pgTable("hospitals",
    {
        id: serial("id").primaryKey(),
        name: text("name").notNull(),
        registrationNumber: varchar("registrationNumber").notNull().unique(),
        type: varchar("type").notNull(),
        address: text("address").notNull(),
        city: varchar("city").notNull(),
        state: varchar("state").notNull(),
        pincode: varchar("pincode"),
        phone: varchar("phone").notNull().unique(),
        email: varchar("email").unique(),
        website: varchar("website"),
        numberOfBeds: integer("numberOfBeds").notNull().default(0),
        icuBeds: integer("icuBeds").notNull().default(0),
        oxygenCylinders: integer("oxygenCylinders").notNull().default(0),
        ventilators: integer("ventilators").notNull().default(0),
        ambulances: integer("ambulances").notNull().default(0),
        hasXray: boolean("hasXray").notNull().default(false),
        hasMRI: boolean("hasMRI").notNull().default(false),
        hasUltrasound: boolean("hasUltrasound").notNull().default(false),
        hasCTScan: boolean("hasCTScan").notNull().default(false),
        hasPathologyLab: boolean("hasPathologyLab").notNull().default(false),
        hasBloodBank: boolean("hasBloodBank").notNull().default(false),
        hasPharmacy: boolean("hasPharmacy").notNull().default(false),
        departments: text("departments").array(),
        operatingHours: varchar("operatingHours"),
        emergencyAvailable: boolean("emergencyAvailable").notNull().default(false),
        description: text("description"),
    }
)

export const Patients = pgTable("patients",
    {
        id: serial("id").primaryKey(),
        name: text("name").notNull(),
        age: integer("age").notNull(),
        gender: text("gender").notNull(),
        address: text("address").notNull(),
        problem: varchar("problem").notNull(),
        mobile: varchar("mobile").notNull(),
        appointmentDate: date("appointmentDate").notNull(),
        medicines: varchar("medicines"),
        hospital: integer('hospital').notNull().references(() => Hospitals.id),
        isAppointed: boolean("isAppointed").notNull().default(false),
        appointedBy: integer('appointedBy').references(() => Doctors.id)
    }
)