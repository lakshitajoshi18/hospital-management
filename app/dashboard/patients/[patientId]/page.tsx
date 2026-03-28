'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useDoctorStore } from '@/store/doctor.store'
import { APPOINTMENTS, MEDICINETYPES } from '@/types'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import InputMedicines from './_component/MedicineInput'
import { toast } from 'sonner'

const PatientInfo = () => {
    const { selectedPatient, appointPatient, appointmentList, getAppointmentList, selectPatient, user } = useDoctorStore()
    const params = useParams<{ patientId: string }>()
    const router = useRouter()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [medicines, setMedicines] = useState<MEDICINETYPES[]>([]);

    const patientId = useMemo(() => Number(params.patientId), [params.patientId])

    useEffect(() => {
        const syncSelectedPatient = async () => {
            if (selectedPatient?.id === patientId) return

            const localPatient = (appointmentList as APPOINTMENTS[]).find((item) => item.id === patientId)
            if (localPatient) {
                await selectPatient(localPatient)
                return
            }

            await getAppointmentList()
            const freshPatient = (useDoctorStore.getState().appointmentList as APPOINTMENTS[]).find(
                (item) => item.id === patientId
            )
            if (freshPatient) {
                await selectPatient(freshPatient)
            }
        }

        syncSelectedPatient()
    }, [selectedPatient?.id, patientId, appointmentList, getAppointmentList, selectPatient])

    const activePatient = selectedPatient?.id === patientId ? selectedPatient : null

    const medicinesPayload = useMemo(
        () => medicines
            .map((item, index) => `${index + 1}. ${item.medicine} - ${item.consumption} - ${item.days} day(s)`)
            .join('\n'),
        [medicines]
    )

    const handleAppointPatient = async () => {
        if (!activePatient) return
        if (medicines.length === 0) {
            toast.error('Add at least one medicine before saving')
            return
        }

        setIsSubmitting(true)
        await appointPatient(String(activePatient.id), medicinesPayload)
        setIsSubmitting(false)
        router.push('/dashboard/todays-appointments')
    }

    if (!activePatient) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Patient Record Not Available</CardTitle>
                    <CardDescription>
                        This patient is not in today&apos;s pending appointment list.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => router.push('/dashboard/todays-appointments')}>
                        Back To Today&apos;s Appointments
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className='space-y-6'>
            <Card className='overflow-hidden border-slate-200/90'>
                <CardHeader className='border-b bg-slate-50/70 pb-4'>
                    <div className='flex flex-col gap-2'>
                        <Badge className='w-fit bg-cyan-700 text-white hover:bg-cyan-700'>Medical Report</Badge>
                        <CardTitle className='text-2xl tracking-tight'>{activePatient.hospital.name}</CardTitle>
                        <CardDescription>Patient consultation note</CardDescription>
                    </div>
                </CardHeader>

                <CardContent className='space-y-6 p-5 md:p-6'>
                    <div className='space-y-4 rounded-xl border border-slate-200 bg-white p-4 md:p-5'>
                        <div className='grid gap-3 md:grid-cols-2'>
                            <div>
                                <p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>Patient Name</p>
                                <p className='mt-1 text-base font-semibold'>{activePatient.name}</p>
                            </div>
                            <div>
                                <p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>Appointment Date</p>
                                <p className='mt-1 text-base font-semibold'>{activePatient.appointmentDate}</p>
                            </div>
                        </div>

                        <div className='grid gap-3 md:grid-cols-2'>
                            <div>
                                <p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>Patient Info</p>
                                <p className='mt-1 text-sm text-slate-700 capitalize'>
                                    {activePatient.age} years, {activePatient.gender}, {activePatient.mobile}
                                </p>
                            </div>
                            <div>
                                <p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>Appointed By</p>
                                <p className='mt-1 text-sm text-slate-700'>
                                    {activePatient.appointedBy?.name || user?.name || 'Doctor'}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>Symptoms / Notes</p>
                            <p className='mt-1 text-sm leading-6 text-slate-700'>{activePatient.problem}</p>
                        </div>
                    </div>

                    <div className='rounded-xl border border-cyan-200 bg-cyan-50/35 p-4 md:p-5'>
                        <p className='mb-3 text-sm font-semibold text-cyan-900'>Medicines</p>
                        <p className='mb-3 text-xs text-cyan-800/80'>Add medicines using the fields below.</p>

                        <InputMedicines medicines={medicines} setMedicines={setMedicines} />

                        <div className='mt-4 space-y-2 rounded-lg border border-cyan-200 bg-white p-3'>
                            <p className='text-xs font-medium uppercase tracking-wide text-cyan-900'>Added Medicines</p>
                            {medicines.length === 0 ? (
                                <p className='text-sm text-cyan-800/70'>No medicines added yet.</p>
                            ) : (
                                <ul className='space-y-1 text-sm text-slate-700'>
                                    {medicines.map((item, index) => (
                                        <li key={`${item.medicine}-${item.consumption}-${item.days}-${index}`}>
                                            {index + 1}. {item.medicine} - {item.consumption} - {item.days} day(s)
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className='mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end'>
                            <Button variant='outline' onClick={() => router.push('/dashboard/todays-appointments')}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleAppointPatient}
                                disabled={isSubmitting || medicines.length === 0}
                                className='bg-cyan-700 text-white hover:bg-cyan-800'
                            >
                                {isSubmitting ? 'Saving...' : 'Save Medicines & Mark Appointed'}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default PatientInfo