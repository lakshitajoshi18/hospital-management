import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/config'
import { Doctors, Hospitals } from '@/config/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  const verified = request.nextUrl.searchParams.get('verified') === 'true'

  if (verified) {
    const doctors = await db
      .select({
        id: Doctors.id,
        name: Doctors.name,
        uid: Doctors.uid,
        specialization: Doctors.specialization,
        qualification: Doctors.qualification,
        experience: Doctors.experience,
        hospital: {
          id: Hospitals.id,
          name: Hospitals.name,
        },
        phone: Doctors.phone,
        loginType: Doctors.loginType,
        city: Doctors.city,
        isVerified: Doctors.isVerified,
        patientsAppointed: Doctors.patientsAppointed,
      })
      .from(Doctors)
      .leftJoin(Hospitals, eq(Doctors.hospital, Hospitals.id))
      .where(eq(Doctors.isVerified, true))

    return NextResponse.json(doctors)
  }

  const doctors = await db
    .select({
      id: Doctors.id,
      name: Doctors.name,
      uid: Doctors.uid,
      specialization: Doctors.specialization,
      qualification: Doctors.qualification,
      experience: Doctors.experience,
      hospital: {
        id: Hospitals.id,
        name: Hospitals.name,
      },
      phone: Doctors.phone,
      loginType: Doctors.loginType,
      city: Doctors.city,
      isVerified: Doctors.isVerified,
      patientsAppointed: Doctors.patientsAppointed,
    })
    .from(Doctors)
    .leftJoin(Hospitals, eq(Doctors.hospital, Hospitals.id))

  return NextResponse.json(doctors)
}
