import { NextResponse } from 'next/server'
import { db } from '@/config'
import { Doctors } from '@/config/schema'

// Simple DB healthcheck endpoint. It runs a lightweight query
// so that Neon wakes up the database (or reports an error if it cannot).
export async function GET() {
    try {
        // Any cheap query will do; we just care that a round‑trip succeeds.
        await db.select({ id: Doctors.id }).from(Doctors).limit(1)

        return NextResponse.json({ ok: true })
    } catch (error) {
        console.error('DB healthcheck failed', error)
        return NextResponse.json(
            { ok: false, error: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        )
    }
}
