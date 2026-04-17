"use client";

import {
  CalendarDays,
  CheckCircle2,
  MapPin,
  Phone,
  UserRound,
  X,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePatientStore } from "@/store/patient.store";
import { APPOINTMENTS } from "@/types";

type AppointmentDetailsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // Using a loose type here to stay compatible with the
  // current API response shape from the patient store.
  appointment: APPOINTMENTS | null;
  onEdit?: (appointment: any) => void;
};

const AppointmentDetailsDialog = ({
  open,
  onOpenChange,
  appointment,
  onEdit,
}: AppointmentDetailsDialogProps) => {
  const status = appointment?.status ?? false;
  const { cancelAppointment, getAppointmentList } = usePatientStore();
  const canEdit = appointment?.status === false;

  const downloadReceipt = () => {
    if (!appointment) return;

    const receiptLines = [
      "Appointment Receipt",
      "====================",
      `Appointment ID: ${appointment.id ?? "-"}`,
      `Name: ${appointment.name ?? "-"}`,
      `Age / Gender: ${appointment.age ?? "-"} / ${appointment.gender ?? "-"}`,
      `Mobile: ${appointment.mobile ?? "-"}`,
      `Hospital: ${appointment.hospital ?? "-"}`,
      `Doctor: ${appointment.doctor ?? "-"}`,
      `Appointment Date: ${appointment.appointmentDate ?? appointment.appointmentDate ?? "-"}`,
      `Problem: ${appointment.problem ?? "-"}`,
      `Status: ${appointment.status === true ? "Appointed" : "Pending"}`,
      "",
      "Thank you for choosing our hospital portal.",
    ];

    const blob = new Blob([receiptLines.join("\n")], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `appointment-${appointment.id ?? "receipt"}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleEdit = () => {
    if (!appointment) return;
    if (onEdit) {
      onEdit(appointment);
      return;
    }

    alert("Edit functionality is not configured yet.");
  };

  const handleCancelAppointment = async () => {
    if (!appointment) return;

    await cancelAppointment({ id: appointment.id });
    onOpenChange(false);
    if (appointment.mobile) {
      await getAppointmentList({ mobile: appointment.mobile });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[90vh] max-h-[95vh] min-w-[min(1200px,calc(100vw-2rem))] rounded-[28px] border border-cyan-100 bg-white/95 shadow-2xl p-0 backdrop-blur-sm">
        <DialogHeader className="border-b border-cyan-100 bg-cyan-50/70 px-6 py-5 shadow-sm sm:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <DialogTitle className="flex flex-wrap items-center gap-2 text-xl font-semibold text-slate-900 sm:text-2xl">
                <UserRound className="size-5 text-cyan-700" />
                {appointment?.name ?? "Patient details"}
              </DialogTitle>
              <DialogDescription className="text-sm text-slate-600">
                Appointment ID:{" "}
                <span className="font-medium text-slate-900">
                  {appointment?.id ?? "-"}
                </span>
              </DialogDescription>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-cyan-100 text-cyan-800">
                <Phone className="mr-1 size-3.5" />
                {appointment?.mobile ?? "-"}
              </Badge>
              {status === true && (
                <Badge className="bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="mr-1 size-3.5" />
                  Completed
                </Badge>
              )}
              {status === false && (
                <Badge className="bg-amber-100 text-amber-700">
                  <XCircle className="mr-1 size-3.5" />
                  Pending
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-96px)] overflow-hidden px-6 pb-6 pt-4 sm:px-8">
          {appointment ? (
            <div className="mx-auto flex max-w-6xl flex-col gap-6">
              <section className="grid gap-4 rounded-[26px] border border-cyan-100 bg-slate-50/90 p-5 shadow-sm sm:grid-cols-2 sm:p-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Patient Information
                  </h3>
                  <div className="space-y-3 text-sm text-slate-700">
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <p className="text-slate-900">
                        <span className="font-medium">Name:</span>{" "}
                        {appointment.name ?? "-"}
                      </p>
                      <p className="mt-1 text-slate-600">
                        <span className="font-medium">Age / Gender:</span>{" "}
                        {appointment.age ?? "-"} / {appointment.gender ?? "-"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <p className="flex items-start gap-2 text-slate-700">
                        <MapPin className="mt-0.5 size-4 text-cyan-700" />
                        <span className="text-slate-700 whitespace-pre-line">
                          {appointment.address ?? "No address provided"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Appointment Details
                  </h3>
                  <div className="space-y-3 text-sm text-slate-700">
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <p className="text-slate-900">
                        <span className="font-medium">Hospital:</span>{" "}
                        {appointment.hospital ?? "-"}
                      </p>
                      <p className="mt-1 text-slate-600">
                        <span className="font-medium">Doctor:</span>{" "}
                        {appointment.doctor ?? "Not Appointed yet"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <p className="flex items-center gap-2 text-slate-700">
                        <CalendarDays className="size-4 text-cyan-700" />
                        <span>
                          {appointment.appointmentDate ??
                            appointment.appointmentDate ??
                            "-"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-[26px] border border-cyan-100 bg-white/95 p-5 shadow-sm sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Problem / Diagnosis
                  </h3>
                  <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-700">
                    {appointment.status === true ? "Resolved" : "Open"}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-700 whitespace-pre-line">
                  {appointment.problem ?? "No problem description provided"}
                </p>
              </section>

              {appointment.medicines && (
                <section className="rounded-[26px] border border-cyan-100 bg-white/95 p-5 shadow-sm sm:p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Prescribed Medicines
                  </h3>
                  <div className="mt-3 rounded-3xl bg-cyan-50/80 p-4 text-sm text-slate-800">
                    {String(appointment.medicines)
                      .replace(/\\n/g, "\n")
                      .split(/\r?\n/)
                      .filter((line) => line.trim().length > 0)
                      .map((line: string, index: number) => (
                        <p key={index} className="mb-2 last:mb-0">
                          {line}
                        </p>
                      ))}
                  </div>
                </section>
              )}
              <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  className="h-11 rounded-xl bg-cyan-700 px-5 text-white hover:bg-cyan-800"
                  onClick={downloadReceipt}
                >
                  Download Receipt
                </Button>
                {canEdit && (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-11 rounded-xl px-5 text-cyan-700 hover:bg-cyan-50"
                      onClick={handleEdit}
                    >
                      Edit
                    </Button>

                    <Button
                      type="button"
                      variant="destructive"
                      className="h-11 rounded-xl px-5 text-white bg-red-500 hover:bg-red-600"
                      onClick={handleCancelAppointment}
                    >
                      Cancel Appointment
                    </Button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-500">
              No appointment selected.
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDetailsDialog;
