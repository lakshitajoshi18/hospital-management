"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePatientStore } from "@/store/patient.store";
import { clientFetch } from "@/lib/api-client";

type EditAppointmentDialogBoxProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: any | null;
  onSaved: (appointment: any) => void;
};

const EditAppointmentDialogBox = ({
  open,
  onOpenChange,
  appointment,
  onSaved,
}: EditAppointmentDialogBoxProps) => {
  const { hospitalList, getHospitalList } = usePatientStore();
  const [appointmentDate, setAppointmentDate] = useState("");
  const [selectedHospitalId, setSelectedHospitalId] = useState("");

  const appointmentHospitalName =
    typeof appointment?.hospital === "string"
      ? appointment.hospital
      : (appointment?.hospital?.name ?? "");

  useEffect(() => {
    if (open && hospitalList.length === 0) {
      getHospitalList();
    }
  }, [getHospitalList, hospitalList.length, open]);

  useEffect(() => {
    if (!appointment) {
      setAppointmentDate("");
      setSelectedHospitalId("");
      return;
    }

    const dateValue = appointment.appointmentDate
      ? String(appointment.appointmentDate).split("T")[0]
      : appointment.date
        ? String(appointment.date).split("T")[0]
        : "";

    const hospital = hospitalList.find(
      (hospital) => hospital.name === appointmentHospitalName,
    );

    setAppointmentDate(dateValue);
    setSelectedHospitalId(hospital?.id ? String(hospital.id) : "");
  }, [appointment, appointmentHospitalName, hospitalList]);

  const { changeAppointmentData } = usePatientStore();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!appointment) return;

    const hospitalId = Number(selectedHospitalId);
    if (!hospitalId || Number.isNaN(hospitalId)) {
      alert("Please select a valid hospital.");
      return;
    }

    if (!appointmentDate) {
      alert("Please select an appointment date.");
      return;
    }

    await changeAppointmentData({
      id: appointment.id,
      hospital: hospitalId,
      appointmentDate,
    });

    const updatedHospitalName =
      hospitalList.find((hospital) => hospital.id === hospitalId)?.name ||
      appointmentHospitalName;

    onSaved({
      ...appointment,
      hospital: updatedHospitalName,
      appointmentDate,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-[28px] border border-cyan-100 bg-white/95 p-0 shadow-2xl backdrop-blur-sm">
        <DialogHeader className="border-b border-cyan-100 px-6 py-5 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-xl font-semibold text-slate-900">
                Edit Appointment
              </DialogTitle>
            </div>
            <DialogClose className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-200">
              <X className="size-4" />
            </DialogClose>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div className="space-y-1.5">
            <Label htmlFor="edit-hospital" className="text-cyan-900">
              Hospital
            </Label>
            <Select
              value={selectedHospitalId}
              onValueChange={(value) => setSelectedHospitalId(value ?? "")}
            >
              <SelectTrigger id="edit-hospital" className="w-full">
                <SelectValue placeholder="Select hospital" />
              </SelectTrigger>
              <SelectContent>
                {hospitalList.map((hospital) => (
                  <SelectItem key={hospital.id} value={String(hospital.id)}>
                    {hospital.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-date" className="text-cyan-900">
              Appointment Date
            </Label>
            <Input
              id="edit-date"
              type="date"
              value={appointmentDate}
              onChange={(event) => setAppointmentDate(event.target.value)}
              className="w-full border-cyan-200 focus-visible:border-cyan-500 focus-visible:ring-cyan-500/30"
              required
            />
          </div>

          <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-xl px-5 text-cyan-700 hover:bg-cyan-50"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-11 rounded-xl bg-cyan-700 px-5 text-white hover:bg-cyan-800"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAppointmentDialogBox;
