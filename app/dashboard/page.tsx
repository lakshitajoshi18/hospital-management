"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useDoctorStore } from "@/store/doctor.store"
import { useEffect } from "react"

const patientStatusData = [
  { type: "Appointed", value: 132, fill: "var(--color-appointed)" },
  { type: "Non-Appointed", value: 58, fill: "var(--color-nonAppointed)" },
]

const todayAppointmentsConfig = {
  completed: {
    label: "Completed",
    color: "oklch(0.64 0.19 149)",
  },
  pending: {
    label: "Pending",
    color: "oklch(0.78 0.15 85)",
  },
  cancelled: {
    label: "Cancelled",
    color: "oklch(0.64 0.23 25)",
  },
} satisfies ChartConfig

const weeklyAppointmentsConfig = {
  appointments: {
    label: "Appointments",
    color: "oklch(0.62 0.2 260)",
  },
} satisfies ChartConfig

const patientStatusConfig = {
  appointed: {
    label: "Appointed",
    color: "oklch(0.65 0.2 190)",
  },
  nonAppointed: {
    label: "Non-Appointed",
    color: "oklch(0.75 0.13 60)",
  },
} satisfies ChartConfig

const DashboardPage = () => {

  const { weeklyAppointmentsData, getWeeklyAppointments, appointmentList, getAppointmentList } = useDoctorStore();

  useEffect(() => {
    if (weeklyAppointmentsData.length === 0) {
      getWeeklyAppointments();
    }

    if (appointmentList.length === 0) {
      getAppointmentList();
    }
  }, [weeklyAppointmentsData, appointmentList, getWeeklyAppointments, getAppointmentList])

  const statusCounts = appointmentList.reduce(
    (acc, appointment) => {
      const rawStatus = (appointment as { status?: string }).status?.toLowerCase();

      if (rawStatus === "completed") {
        acc.completed += 1;
      } else if (rawStatus === "cancelled") {
        acc.cancelled += 1;
      } else if (rawStatus === "pending") {
        acc.pending += 1;
      } else if (appointment.isAppointed) {
        acc.completed += 1;
      } else {
        acc.pending += 1;
      }

      return acc;
    },
    { completed: 0, pending: 0, cancelled: 0 }
  )

  const todayAppointmentData = [
    { status: "Completed", count: statusCounts.completed, fill: "var(--color-completed)" },
    { status: "Pending", count: statusCounts.pending, fill: "var(--color-pending)" },
    { status: "Cancelled", count: statusCounts.cancelled, fill: "var(--color-cancelled)" },
  ]

  const todayTotalAppointments = todayAppointmentData.reduce(
    (sum, item) => sum + item.count,
    0
  )

  const weeklyTotalAppointments = weeklyAppointmentsData.reduce(
    (sum, item) => sum + item.appointments,
    0
  )

  const totalPatients = patientStatusData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Doctor Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Quick insights for appointments and patient engagement.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Today\'s Appointments</CardTitle>
            <CardDescription>Status distribution for today.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={todayAppointmentsConfig} className="mx-auto max-h-65 w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="status" />} />
                <Pie
                  data={todayAppointmentData}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={88}
                  strokeWidth={4}
                >
                  {todayAppointmentData.map((entry) => (
                    <Cell key={entry.status} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartLegend content={<ChartLegendContent nameKey="status" />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Total appointments today: <span className="font-medium text-foreground">{todayTotalAppointments}</span>
            </p>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Appointment Volume</CardTitle>
            <CardDescription>Daily appointment count for the current week.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={weeklyAppointmentsConfig} className="max-h-80 w-full">
              <BarChart accessibilityLayer data={weeklyAppointmentsData} margin={{ left: 8, right: 8 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="appointments"
                  radius={[8, 8, 0, 0]}
                  fill="var(--color-appointments)"
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Total weekly appointments: <span className="font-medium text-foreground">{weeklyTotalAppointments}</span>
            </p>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Appointment Split</CardTitle>
          <CardDescription>Appointed vs non-appointed patients.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <ChartContainer config={patientStatusConfig} className="mx-auto max-h-75 w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="type" />} />
                <Pie
                  data={patientStatusData}
                  dataKey="value"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                >
                  {patientStatusData.map((entry) => (
                    <Cell key={entry.type} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartLegend content={<ChartLegendContent nameKey="type" />} />
              </PieChart>
            </ChartContainer>

            <div className="space-y-4">
              {patientStatusData.map((item) => {
                const percentage = Math.round((item.value / totalPatients) * 100)

                return (
                  <div key={item.type} className="rounded-lg border p-4">
                    <p className="text-sm text-muted-foreground">{item.type}</p>
                    <p className="text-2xl font-semibold">{item.value}</p>
                    <p className="text-xs text-muted-foreground">{percentage}% of total patients</p>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardPage