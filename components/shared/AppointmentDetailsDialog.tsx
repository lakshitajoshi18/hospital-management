"use client";

import {
  CalendarDays,
  CheckCircle2,
  MapPin,
  Phone,
  UserRound,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

type AppointmentDetailsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // Using a loose type here to stay compatible with the
  // current API response shape from the patient store.
  appointment: any | null;
};

const AppointmentDetailsDialog = ({
  open,
  onOpenChange,
  appointment,
}: AppointmentDetailsDialogProps) => {
  const status = appointment?.status ?? false;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[90vh] max-h-[95vh] w-[100vw] max-w-[100vw] border-cyan-100 bg-[linear-gradient(180deg,#f9fdff_0%,#f2faff_100%)] p-0">
        <DialogHeader className="border-b border-cyan-100 px-5 pb-4 pt-5 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <DialogTitle className="flex items-center gap-2 text-xl text-slate-900 sm:text-2xl">
                <UserRound className="size-5 text-cyan-700" />
                {appointment?.name ?? "Patient details"}
              </DialogTitle>
              <DialogDescription className="text-sm text-slate-600">
                Appointment ID: <span className="font-medium text-slate-900">{appointment?.id ?? "-"}</span>
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

        <ScrollArea className="h-[calc(90vh-80px)] px-5 pb-6 pt-4 sm:px-8">
          {appointment ? (
            <div className="mx-auto flex max-w-5xl flex-col gap-6">
              <section className="grid gap-4 rounded-2xl border border-cyan-100 bg-white/90 p-4 sm:grid-cols-2 sm:p-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Patient Information
                  </h3>
                  <div className="space-y-1 text-sm text-slate-700">
                    <p>
                      <span className="font-medium text-slate-900">Name:</span> {appointment.name ?? "-"}
                    </p>
                    <p>
                      <span className="font-medium text-slate-900">Age / Gender:</span> {appointment.age ?? "-"} / {appointment.gender ?? "-"}
                    </p>
                    <p className="flex items-start gap-2">
                      <MapPin className="mt-0.5 size-4 text-cyan-700" />
                      <span className="text-slate-700 whitespace-pre-line">
                        {appointment.address ?? "No address provided"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Appointment Details
                  </h3>
                  <div className="space-y-1 text-sm text-slate-700">
                    <p>
                      <span className="font-medium text-slate-900">Hospital:</span> {appointment.hospital ?? "-"}
                    </p>
                    <p>
                      <span className="font-medium text-slate-900">Doctor:</span> {appointment.doctor ?? "-"}
                    </p>
                    <p className="flex items-center gap-2">
                      <CalendarDays className="size-4 text-cyan-700" />
                      <span className="text-slate-700">{appointment.appointmentDate ?? appointment.date ?? "-"}</span>
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-cyan-100 bg-white/90 p-4 sm:p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Problem / Diagnosis
                </h3>
                <p className="mt-2 text-sm text-slate-700 whitespace-pre-line">
                  {appointment.problem ?? "No problem description provided"}
                </p>
              </section>

              {appointment.medicines && (
                <section className="rounded-2xl border border-cyan-100 bg-white/90 p-4 sm:p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Prescribed Medicines
                  </h3>
                  <pre className="mt-2 whitespace-pre-wrap rounded-xl bg-cyan-50/80 p-3 text-xs text-slate-800">
                    {String(appointment.medicines).replace(/^"|"$/g, "")}
                  </pre>
                </section>
              )}
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