import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/config'
import { Doctors } from '@/config/schema'
import { eq } from 'drizzle-orm'

export async function PATCH(request: NextRequest) {
  const body = await request.json()
  if (!body?.id) {
    return NextResponse.json({ error: 'Doctor id is required' }, { status: 400 })
  }

  await db.update(Doctors).set({ isVerified: true }).where(eq(Doctors.id, Number(body.id)))
  return NextResponse.json({ success: true })
}
