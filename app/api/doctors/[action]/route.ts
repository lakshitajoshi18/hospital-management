import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/config'
import { Doctors, Hospitals, Patients } from '@/config/schema'
import { and, eq, gte, lte, asc } from 'drizzle-orm'
import bcrypt from 'bcryptjs'

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
  city: Hospitals.city,
  isVerified: Doctors.isVerified,
  patientsAppointed: Doctors.patientsAppointed,
}

const normalizeAppointments = (rows: any[]) =>
  rows
    .filter((item) => item.id !== null)
    .map((item) => ({
      id: item.id ?? 0,
      name: item.name ?? 'Unknown Patient',
      age: item.age ?? 0,
      gender: item.gender ?? 'other',
      address: item.address,
      problem: item.problem ?? 'Not specified',
      mobile: item.mobile ?? 'N/A',
      appointmentDate: item.appointmentDate ?? new Date().toISOString().split('T')[0],
      medicines: item.medicines,
      hospital: item.hospital ?? 'Unknown Hospital',
      doctor: item.doctor ?? 'Not Appointed yet',
      status: item.status ?? false,
    }))

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ action: string }> }
) {
  const params = await context.params
  const action = params?.action || request.nextUrl.pathname.split('/').pop() || ''
  const url = request.nextUrl

  if(action === 'list') {
    try {
      const isVerified = url.searchParams.get('verified');
      const response = await db.select(doctorSelect)
      .from(Doctors)
      .leftJoin(Hospitals, eq(Doctors.hospital, Hospitals.id))
      .where(isVerified === 'true' ? eq(Doctors.isVerified, true) : undefined)
      return NextResponse.json(response)
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Unable to fetch doctors' },
        { status: 500 }
      )
    }
  }
  if (action === 'me') {
    const uid = url.searchParams.get('uid')
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

  if (action === 'appointments') {
    const doctorId = Number(url.searchParams.get('doctorId'))
    const hospitalId = Number(url.searchParams.get('hospitalId'))
    const date = url.searchParams.get('date')

    if (!hospitalId || !date) {
      return NextResponse.json({ error: 'hospitalId and date are required' }, { status: 400 })
    }

    const rows = await db
      .select({
        id: Patients.id,
        name: Patients.name,
        age: Patients.age,
        gender: Patients.gender,
        address: Patients.address,
        problem: Patients.problem,
        mobile: Patients.mobile,
        appointmentDate: Patients.appointmentDate,
        medicines: Patients.medicines,
        hospital: Hospitals.name,
        doctor: Doctors.name,
        status: Patients.isAppointed,
      })
      .from(Patients)
      .fullJoin(Hospitals, eq(Patients.hospital, Hospitals.id))
      .fullJoin(Doctors, eq(Patients.appointedBy, Doctors.id))
      .where(
        and(
          eq(Patients.hospital, hospitalId),
          eq(Patients.appointmentDate, date)
        )
      )
      .orderBy(asc(Patients.isAppointed))

    return NextResponse.json(normalizeAppointments(rows))
  }

  if (action === 'appointed-patients') {
    const doctorId = Number(url.searchParams.get('doctorId'))
    const hospitalId = Number(url.searchParams.get('hospitalId'))

    if (!doctorId || !hospitalId) {
      return NextResponse.json({ error: 'doctorId and hospitalId are required' }, { status: 400 })
    }

    const rows = await db
      .select({
        id: Patients.id,
        name: Patients.name,
        age: Patients.age,
        gender: Patients.gender,
        address: Patients.address,
        problem: Patients.problem,
        mobile: Patients.mobile,
        appointmentDate: Patients.appointmentDate,
        medicines: Patients.medicines,
        hospital: Hospitals.name,
        doctor: Doctors.name,
        status: Patients.isAppointed,
      })
      .from(Patients)
      .fullJoin(Hospitals, eq(Patients.hospital, Hospitals.id))
      .fullJoin(Doctors, eq(Patients.appointedBy, Doctors.id))
      .where(
        and(
          eq(Patients.appointedBy, doctorId),
          eq(Patients.hospital, hospitalId),
          eq(Patients.isAppointed, true)
        )
      )

    return NextResponse.json(normalizeAppointments(rows))
  }

  if (action === 'weekly-appointments') {
    const hospitalId = Number(url.searchParams.get('hospitalId'))
    const start = url.searchParams.get('start')
    const end = url.searchParams.get('end')

    if (!hospitalId || !start || !end) {
      return NextResponse.json({ error: 'hospitalId, start and end are required' }, { status: 400 })
    }

    const rows = await db
      .select({ appointmentDate: Patients.appointmentDate })
      .from(Patients)
      .where(
        and(
          eq(Patients.hospital, hospitalId),
          gte(Patients.appointmentDate, start),
          lte(Patients.appointmentDate, end)
        )
      )

    return NextResponse.json(rows)
  }

  return NextResponse.json({ error: 'Action not found' }, { status: 404 })
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ action: string }> }
) {
  const params = await context.params
  const action = params?.action || request.nextUrl.pathname.split('/').pop() || ''
  const body = await request.json()

  if (action === 'signup') {
    if (!(body.name && body.hospital && body.experience && body.specialization && body.qualification && body.phone && body.password)) {
      return NextResponse.json({ error: 'Missing required doctor fields' }, { status: 400 })
    }

    const existingUser = await db
      .select({ id: Doctors.id })
      .from(Doctors)
      .where(eq(Doctors.phone, body.phone))

    if (existingUser.length > 0) {
      return NextResponse.json({ error: 'User with same phone number already exists' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(body.password, 10)
    const uid = body.phone + '-' + Date.now()
    const isVerified = process.env.NEXT_PUBLIC_ADMIN_PHONES?.split(',').includes(body.phone) || false

    await db.insert(Doctors).values({
      uid,
      hospital: Number(body.hospital),
      name: body.name,
      experience: Number(body.experience),
      specialization: body.specialization,
      qualification: body.qualification,
      phone: body.phone,
      password: hashedPassword,
      city: body.city || null,
      isVerified,
    })

    const response = await db
      .select(doctorSelect)
      .from(Doctors)
      .fullJoin(Hospitals, eq(Doctors.hospital, Hospitals.id))
      .where(eq(Doctors.phone, body.phone))
      .limit(1)

    return NextResponse.json({ user: response[0] ?? null })
  }

  if (action === 'login') {
    if (!(body.phone && body.password)) {
      return NextResponse.json({ error: 'Phone and password are required' }, { status: 400 })
    }

    const existingUser = await db
      .select({
        ...doctorSelect,
        password: Doctors.password,
      })
      .from(Doctors)
      .fullJoin(Hospitals, eq(Doctors.hospital, Hospitals.id))
      .where(eq(Doctors.phone, body.phone))
      .limit(1)

    if (existingUser.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    // if doctor is not verified, return error
    if(existingUser[0].isVerified === false) {
      return NextResponse.json({ error: 'Your account is pending verification by admin. Please wait for approval.' }, { status: 403 })
    }
    // compare password
    const isMatch = await bcrypt.compare(body.password, existingUser[0].password || '')
    if (!isMatch) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
    }

    const user = { ...existingUser[0] }
    delete (user as any).password

    return NextResponse.json({ user })
  }

  if (action === 'appoint') {
    if (!body?.id) {
      return NextResponse.json({ error: 'Patient id is required' }, { status: 400 })
    }

    await db.update(Patients).set({
      medicines: body.medicines,
      isAppointed: true,
      appointedBy: Number(body.appointedBy),
    }).where(eq(Patients.id, Number(body.id)))

    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'Action not found' }, { status: 404 })
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ action: string }> }
) {
  const params = await context.params
  const action = params?.action || request.nextUrl.pathname.split('/').pop() || ''
  const body = await request.json()

  if (action === 'profile') {
    if (!body?.id) {
      return NextResponse.json({ error: 'Doctor id is required' }, { status: 400 })
    }

    const updatePayload = { ...body }
    delete updatePayload.id

    await db.update(Doctors).set(updatePayload).where(eq(Doctors.id, Number(body.id)))

    const response = await db
      .select(doctorSelect)
      .from(Doctors)
      .fullJoin(Hospitals, eq(Doctors.hospital, Hospitals.id))
      .where(eq(Doctors.id, Number(body.id)))
      .limit(1)

    return NextResponse.json({ user: response[0] ?? null })
  }

  return NextResponse.json({ error: 'Action not found' }, { status: 404 })
}
