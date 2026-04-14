import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config";
import { Hospitals } from "@/config/schema";
import { eq, sql } from "drizzle-orm";
import { add } from "date-fns";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const city = url.searchParams.get("city")?.trim();

    const query = db
      .select({
        id: Hospitals.id,
        name: Hospitals.name,
        city: Hospitals.city,
        registrationNumber: Hospitals.registrationNumber,
        type: Hospitals.type,
        address: Hospitals.address,
        phone: Hospitals.phone,
        pincode: Hospitals.pincode,
        email: Hospitals.email,
        website: Hospitals.website,
        description: Hospitals.description,
        ambulances: Hospitals.ambulances,
        departments: Hospitals.departments,
        emergencyAvailable: Hospitals.emergencyAvailable,
        hasBloodBank: Hospitals.hasBloodBank,
        hasCTScan: Hospitals.hasCTScan,
        hasMRI: Hospitals.hasMRI,
        hasPathologyLab: Hospitals.hasPathologyLab,
        hasPharmacy: Hospitals.hasPharmacy,
        hasUltrasound: Hospitals.hasUltrasound,
        hasXray: Hospitals.hasXray,
        icuBeds: Hospitals.icuBeds,
        numberOfBeds: Hospitals.numberOfBeds,
        oxygenCylinders: Hospitals.oxygenCylinders,
        ventilators: Hospitals.ventilators,
      })
      .from(Hospitals);

    const hospitals = city
      ? await query
          .where(sql`lower(${Hospitals.city}) = lower(${city})`)
          .orderBy(Hospitals.name)
      : await query.orderBy(Hospitals.name);

    return NextResponse.json(hospitals);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to fetch hospitals",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const input = await request.json();
    const requiredFields = [
      "name",
      "registrationNumber",
      "type",
      "address",
      "city",
      "state",
      "phone",
    ];
    const missingField = requiredFields.find((field) => !input[field]);

    if (missingField) {
      return NextResponse.json(
        { error: `Missing required field: ${missingField}` },
        { status: 400 },
      );
    }

    const existingHospital = await db
      .select({ id: Hospitals.id })
      .from(Hospitals)
      .where(eq(Hospitals.registrationNumber, input.registrationNumber));

    if (existingHospital.length > 0) {
      return NextResponse.json(
        { error: "Hospital with same registration number already exists" },
        { status: 409 },
      );
    }

    const response = await db
      .insert(Hospitals)
      .values({
        address: input.address,
        city: input.city,
        name: input.name,
        pincode: input.pincode || null,
        registrationNumber: input.registrationNumber,
        state: input.state,
        type: input.type,
        phone: input.phone,
        email: input.email || null,
        website: input.website || null,
        ambulances: Number(input.ambulances) || 0,
        departments: input.departments || [],
        description: input.description || null,
        emergencyAvailable: input.emergencyAvailable || false,
        hasBloodBank: input.hasBloodBank || false,
        hasCTScan: input.hasCTScan || false,
        hasMRI: input.hasMRI || false,
        hasPathologyLab: input.hasPathologyLab || false,
        hasPharmacy: input.hasPharmacy || false,
        hasUltrasound: input.hasUltrasound || false,
        hasXray: input.hasXray || false,
        icuBeds: Number(input.icuBeds) || 0,
        numberOfBeds: Number(input.numberOfBeds) || 0,
        operatingHours: input.operatingHours || null,
        oxygenCylinders: Number(input.oxygenCylinders) || 0,
        ventilators: Number(input.ventilators) || 0,
      })
      .returning();

    return NextResponse.json({ success: true, hospital: response[0] ?? null });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to create hospital",
      },
      { status: 500 },
    );
  }
}
