import { jsPDF } from "jspdf";

import type { APPOINTMENTS } from "@/types";

export const generateAppointmentReceiptPDF = (appointment: APPOINTMENTS) => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  let y = 60;

  const title = "MediStream";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text(title, pageWidth / 2, y, { align: "center" });

  y += 30;
  doc.setDrawColor(64, 167, 182);
  doc.setLineWidth(1.5);
  doc.line(margin, y, pageWidth - margin, y);

  y += 30;
  doc.setFontSize(16);
  doc.setFont("helvetica", "normal");
  doc.text("Appointment Receipt", margin, y);

  y += 24;
  doc.setFontSize(11);
  doc.setTextColor(102, 113, 122);
  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    margin,
    y,
  );

  y += 24;
  doc.setTextColor(0, 0, 0);

  const fields: Array<[string, string]> = [
    ["Patient Name", String(appointment.name ?? "-")],
    ["Mobile", String(appointment.mobile ?? "-")],
    ["Age", String(appointment.age ?? "-")],
    ["Gender", String(appointment.gender ?? "-")],
    ["Hospital", String(appointment.hospital ?? "-")],
    ["Doctor", String(appointment.doctor ?? "-")],
    ["Appointment Date", String(appointment.appointmentDate ?? "-")],
    ["Status", appointment.status === true ? "Completed" : "Pending"],
  ];

  const lineHeight = 18;
  fields.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(value, margin + 130, y);
    y += lineHeight;
  });

  y += 10;
  doc.setDrawColor(224, 242, 254);
  doc.setLineWidth(10);
  doc.line(margin, y, pageWidth - margin, y);
  y += 24;

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Problem / Diagnosis", margin, y);
  y += 20;
  doc.setFont("helvetica", "normal");
  const problemText = appointment.problem ?? "No problem description provided.";
  const problemLines = doc.splitTextToSize(problemText, contentWidth);
  doc.text(problemLines, margin, y);

  y += problemLines.length * 16 + 20;
  doc.setFont("helvetica", "bold");
  doc.text("Prescribed Medicines", margin, y);
  y += 20;
  doc.setFont("helvetica", "normal");

  const medicinesText = appointment.medicines
    ? String(appointment.medicines).replace(/\\r?\\n/g, "\n")
    : "No medicines prescribed.";
  const medicineLines = doc.splitTextToSize(medicinesText, contentWidth);
  doc.text(medicineLines, margin, y);

  y += medicineLines.length * 16 + 24;

  doc.setFontSize(10);
  doc.setTextColor(99, 115, 129);
  doc.text(
    "This document contains the appointment summary and should be kept for your records.",
    margin,
    y,
    { maxWidth: contentWidth },
  );

  const fileName = `appointment-receipt-${appointment.id ?? "receipt"}.pdf`;
  doc.save(fileName);
};
