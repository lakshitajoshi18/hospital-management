'use client'
import { APPOINTMENTS } from '@/types'
import { useDoctorStore } from '@/store/doctor.store'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Spinner } from '@/components/ui/spinner'
import { useRouter } from 'next/navigation'

const TodaysAppointment = () => {
  const { getAppointmentList, appointmentList, selectPatient } = useDoctorStore()
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female' | 'other'>('all')
  const hasFetchedOnceRef = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (hasFetchedOnceRef.current) return
    hasFetchedOnceRef.current = true

    const loadAppointments = async () => {
      setIsLoading(true)
      await getAppointmentList()
      setIsLoading(false)
    }

    loadAppointments()
  }, [getAppointmentList])

  const todaysAppointments = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return (appointmentList as APPOINTMENTS[]).filter((appointment) => {
      const matchesGender =
        genderFilter === 'all' || appointment.gender?.toLowerCase() === genderFilter

      const matchesQuery =
        appointment.name?.toLowerCase().includes(normalizedQuery) ||
        appointment.mobile?.toLowerCase().includes(normalizedQuery) ||
        appointment.problem?.toLowerCase().includes(normalizedQuery)

      return matchesGender && matchesQuery
    })
  }, [appointmentList, searchQuery, genderFilter])

  const maleCount = todaysAppointments.filter(
    (appointment) => appointment.gender?.toLowerCase() === 'male'
  ).length
  const femaleCount = todaysAppointments.filter(
    (appointment) => appointment.gender?.toLowerCase() === 'female'
  ).length

  const refreshAppointments = async () => {
    setIsLoading(true)
    await getAppointmentList()
    setIsLoading(false)
  }

  const handleAppointmentClick = async (appointment: APPOINTMENTS) => {
    await selectPatient(appointment).then(() => {
      router.push(`/dashboard/patients/${appointment.id}`)
    })
  }

  const renderStatus = (isAppointed: boolean) => {
    if (isAppointed) {
      return <Badge className='bg-emerald-600 hover:bg-emerald-600'>Completed</Badge>
    }

    return (
      <Badge variant='secondary' className='bg-amber-100 text-amber-700 hover:bg-amber-100'>
        Waiting
      </Badge>
    )
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
        <div>
          <h1 className='text-2xl font-semibold tracking-tight'>Today&apos;s Appointments</h1>
          <p className='text-sm text-muted-foreground'>
            View, search, and manage all appointments scheduled for today.
          </p>
        </div>

        <Button onClick={refreshAppointments} variant='outline' disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner className='mr-2 size-4' />
              Refreshing
            </>
          ) : (
            'Refresh List'
          )}
        </Button>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        <Card>
          <CardHeader className='pb-2'>
            <CardDescription>Total for Today</CardDescription>
            <CardTitle className='text-3xl'>{todaysAppointments.length}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className='pb-2'>
            <CardDescription>Male Patients</CardDescription>
            <CardTitle className='text-3xl'>{maleCount}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className='pb-2'>
            <CardDescription>Female Patients</CardDescription>
            <CardTitle className='text-3xl'>{femaleCount}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>Filter Appointments</CardTitle>
          <CardDescription>Find patients quickly with search and gender filters.</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Input
            placeholder='Search by name, mobile, or problem...'
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />

          <div className='flex flex-wrap gap-2'>
            {(['all', 'male', 'female', 'other'] as const).map((gender) => (
              <Button
                key={gender}
                size='sm'
                variant={genderFilter === gender ? 'default' : 'outline'}
                onClick={() => setGenderFilter(gender)}
                className='capitalize'
              >
                {gender}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>Appointment List</CardTitle>
          <CardDescription>Interactive list of all today&apos;s patient appointments.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className='flex h-48 items-center justify-center gap-2 text-muted-foreground'>
              <Spinner className='size-5' />
              <span>Loading today&apos;s appointments...</span>
            </div>
          ) : todaysAppointments.length === 0 ? (
            <div className='rounded-lg border border-dashed p-8 text-center'>
              <h3 className='text-base font-semibold'>No Appointments Found</h3>
              <p className='mt-1 text-sm text-muted-foreground'>
                Try changing your filters or check back later.
              </p>
            </div>
          ) : (
            <>
              <div className='hidden md:block'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Age / Gender</TableHead>
                      <TableHead>Problem</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todaysAppointments.map((appointment) => (
                      <TableRow
                        key={appointment.id}
                        className='cursor-pointer'
                        onClick={() => handleAppointmentClick(appointment)}
                      >
                        <TableCell className='font-medium'>{appointment.name}</TableCell>
                        <TableCell>
                          {appointment.age} /{' '}
                          <span className='capitalize'>{appointment.gender}</span>
                        </TableCell>
                        <TableCell className='max-w-65 truncate'>{appointment.problem}</TableCell>
                        <TableCell>{appointment.mobile}</TableCell>
                        <TableCell>{appointment.appointmentDate}</TableCell>
                        <TableCell>{renderStatus(appointment.isAppointed)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className='grid gap-3 md:hidden'>
                {todaysAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className='cursor-pointer rounded-xl border bg-card p-4 shadow-xs'
                    onClick={() => handleAppointmentClick(appointment)}
                  >
                    <div className='flex items-start justify-between gap-3'>
                      <div>
                        <p className='text-base font-semibold leading-tight'>{appointment.name}</p>
                        <p className='text-xs text-muted-foreground'>
                          {appointment.age} years •{' '}
                          <span className='capitalize'>{appointment.gender}</span>
                        </p>
                      </div>
                      {renderStatus(appointment.isAppointed)}
                    </div>

                    <div className='mt-3 space-y-1.5 text-sm'>
                      <p>
                        <span className='text-muted-foreground'>Problem:</span> {appointment.problem}
                      </p>
                      <p>
                        <span className='text-muted-foreground'>Mobile:</span> {appointment.mobile}
                      </p>
                      <p>
                        <span className='text-muted-foreground'>Date:</span> {appointment.appointmentDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default TodaysAppointment