import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/config'
import { Patients } from '@/config/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: NextRequest, { params }: { params?: { action?: string } }) {
  const action = params?.action || request.nextUrl.pathname.split('/').filter(Boolean).pop() || ''
  const url = request.nextUrl

  if (action === 'list') {
    const mobile = url.searchParams.get('mobile')
    if (!mobile) {
      return NextResponse.json({ error: 'mobile query is required' }, { status: 400 })
    }
    const rows = await db.select().from(Patients).where(eq(Patients.mobile, mobile))
    return NextResponse.json(rows)
  }

  if (action === 'single') {
    const id = url.searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'id query is required' }, { status: 400 })
    }
    const rows = await db.select().from(Patients).where(eq(Patients.id, Number(id)))
    return NextResponse.json(rows)
  }

  return NextResponse.json({ error: 'Action not found' }, { status: 404 })
}

export async function POST(request: NextRequest, { params }: { params?: { action?: string } }) {
  const action = params?.action || request.nextUrl.pathname.split('/').filter(Boolean).pop() || ''
  const body = await request.json()
  console.log('POST patient action', action, body)

  if (action === 'book') {
    const requiredFields = ['name', 'age', 'gender', 'address', 'problem', 'mobile', 'appointmentDate', 'hospital']
    const missingField = requiredFields.find((field) => !body[field])
    if (missingField) {
      return NextResponse.json({ error: `Missing required field: ${missingField}` }, { status: 400 })
    }

    const hospitalId = Number(body.hospital)
    if (!hospitalId || Number.isNaN(hospitalId)) {
      return NextResponse.json({ error: 'Invalid hospital id' }, { status: 400 })
    }

    await db.insert(Patients).values({
      address: body.address,
      age: Number(body.age),
      appointmentDate: body.appointmentDate,
      gender: body.gender,
      hospital: hospitalId,
      mobile: body.mobile,
      name: body.name,
      problem: body.problem,
    }).returning()

    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'Action not found' }, { status: 404 })
}

export async function DELETE(request: NextRequest, { params }: { params?: { action?: string } }) {
  const action = params?.action || request.nextUrl.pathname.split('/').filter(Boolean).pop() || ''
  const body = await request.json()

  if (action === 'cancel') {
    if (!body?.id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }
    await db.delete(Patients).where(eq(Patients.id, Number(body.id)))
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'Action not found' }, { status: 404 })
}

export async function PATCH(request: NextRequest, { params }: { params?: { action?: string } }) {
  const action = params?.action || request.nextUrl.pathname.split('/').filter(Boolean).pop() || ''
  const body = await request.json()

  if (action === 'status') {
    if (!body?.id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    await db.update(Patients).set({
      isAppointed: body.isAppointed,
      appointedBy: body.appointedBy ?? null,
    }).where(eq(Patients.id, Number(body.id)))

    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'Action not found' }, { status: 404 })
}
