import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/config'
import { Doctors, Hospitals } from '@/config/schema'
import { eq } from 'drizzle-orm'

const doctorSelect = {
  uid: Doctors.uid,
  id: Doctors.id,
  name: Doctors.name,
  specialization: Doctors.specialization,
  experience: Doctors.experience,
  qualification: Doctors.qualification,
  hospital: {
    id: Hospitals.id,
    name: Hospitals.name,
  },
  phone: Doctors.phone,
  city: Doctors.city,
  isVerified: Doctors.isVerified,
  patientsAppointed: Doctors.patientsAppointed,
}

export async function GET(request: NextRequest) {
  const uid = request.nextUrl.searchParams.get('uid')

  if (!uid) {
    return NextResponse.json({ error: 'uid is required' }, { status: 400 })
  }

  try {
    const users = await db
      .select(doctorSelect)
      .from(Doctors)
      .leftJoin(Hospitals, eq(Doctors.hospital, Hospitals.id))
      .where(eq(Doctors.uid, uid))
      .limit(1)

    return NextResponse.json(users[0] ?? null)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to fetch doctor' },
      { status: 500 }
    )
  }
}
