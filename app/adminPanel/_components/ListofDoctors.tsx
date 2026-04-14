"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminStore } from "@/store/admin.store";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

type DoctorRecord = {
    id: number,
  uid: number;
  name: string;
  specialization: string;
  experience: number;
  qualification: string;
  hospital: {
    id: number;
    name: string;
  };
  phone: string;
  city: string;
  isVerified: boolean;
  patientsAppointed: number;
};

const hospitalLookup: Record<number, string> = {
  1: "City General Hospital",
  2: "Apollo Medical Center",
  3: "Sunrise Health Clinic",
};

const ListofDoctors = () => {
  const { doctorList, getDoctorList } = AdminStore();
  useEffect(() => {
    doctorList.length === 0 && getDoctorList();
  }, [doctorList]);

  return doctorList && (
    <section className="space-y-4 mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-green-800">
          List of Doctors
        </h2>
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          {doctorList.length} Doctors
        </Badge>
      </div>

      {doctorList.length === 0 ? (
        <Card className="border border-dashed border-green-300">
          <CardContent className="py-8 text-center text-muted-foreground">
            No doctors available.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {doctorList.map((doctor) => (
            <Card key={doctor.id} className="border border-green-100">
              <CardHeader>
                <CardTitle className="text-green-800">{doctor.name}</CardTitle>
                <CardDescription>
                  {doctor.specialization} | {doctor.qualification}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <p>
                    <span className="font-medium text-green-700">
                      Experience:
                    </span>{" "}
                    {doctor.experience} years
                  </p>
                  <p>
                    <span className="font-medium text-green-700">Phone:</span>{" "}
                    {doctor.phone}
                  </p>
                  <p>
                    <span className="font-medium text-green-700">
                      Hospital:
                    </span>{" "}
                    {hospitalLookup[doctor.hospital.id] ??
                      `Hospital #${doctor.hospital.id}`}
                  </p>
                  <p>
                    <span className="font-medium text-green-700">City:</span>{" "}
                    {doctor.city ?? "N/A"}
                  </p>
                  <p>
                    <span className="font-medium text-green-700">
                      Patients Appointed:
                    </span>{" "}
                    {doctor.patientsAppointed}
                  </p>
                </div>

                <div>
                  {doctor.isVerified ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      Verified
                    </Badge>
                  ) : (
                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                      Not Verified
                    </Badge>
                  )}
                </div>
              </CardContent>

              <CardFooter className="justify-end gap-2">
                {!doctor.isVerified && (
                  <Button
                    size="sm"
                    className="bg-green-600 text-white hover:bg-green-700"
                    // onClick={() => verifyDoctor(doctor.id)}
                  >
                    <CheckCircle2 className="size-4" />
                    Verify Doctor
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default ListofDoctors;
