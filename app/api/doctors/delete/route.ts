import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/config'
import { Doctors } from '@/config/schema'
import { and, eq } from 'drizzle-orm'

export async function DELETE(request: NextRequest) {
  const body = await request.json()
  if (!body?.id) {
    return NextResponse.json({ error: 'Doctor id is required' }, { status: 400 })
  }

  await db.delete(Doctors).where(and(eq(Doctors.id, Number(body.id)), eq(Doctors.isVerified, false)))
  return NextResponse.json({ success: true })
}
