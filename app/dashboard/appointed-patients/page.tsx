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

const AppointedPatients = () => {
  const { getAppointedPatientList, appointedPaitentsList, selectPatient } = useDoctorStore()
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female' | 'other'>('all')
  const hasFetchedOnceRef = useRef(false)
  const router = useRouter()

  useEffect(() => {
    if (hasFetchedOnceRef.current) return
    hasFetchedOnceRef.current = true

    const loadAppointedPatients = async () => {
      setIsLoading(true)
      await getAppointedPatientList()
      setIsLoading(false)
    }

    loadAppointedPatients()
  }, [getAppointedPatientList])

  const filteredAppointedPatients = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return (appointedPaitentsList as APPOINTMENTS[]).filter((patient) => {
      const matchesGender =
        genderFilter === 'all' || patient.gender?.toLowerCase() === genderFilter

      const matchesQuery =
        patient.name?.toLowerCase().includes(normalizedQuery) ||
        patient.mobile?.toLowerCase().includes(normalizedQuery) ||
        patient.problem?.toLowerCase().includes(normalizedQuery)

      return matchesGender && matchesQuery
    })
  }, [appointedPaitentsList, searchQuery, genderFilter])

  const maleCount = filteredAppointedPatients.filter(
    (patient) => patient.gender?.toLowerCase() === 'male'
  ).length
  const femaleCount = filteredAppointedPatients.filter(
    (patient) => patient.gender?.toLowerCase() === 'female'
  ).length

  const refreshPatients = async () => {
    setIsLoading(true)
    await getAppointedPatientList()
    setIsLoading(false)
  }

  const handlePatientClick = async (patient: APPOINTMENTS) => {
    await selectPatient(patient)
    router.push(`/dashboard/patients/${patient.id}`)
  }

  const renderStatus = (appointmentDate: string) => {
    const today = new Date().toISOString().split('T')[0]
    if (appointmentDate === today) {
      return <Badge className='bg-blue-600 hover:bg-blue-600'>Today</Badge>
    }

    return (
      <Badge variant='secondary' className='bg-slate-100 text-slate-700 hover:bg-slate-100'>
        {appointmentDate}
      </Badge>
    )
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
        <div>
          <h1 className='text-2xl font-semibold tracking-tight'>Appointed Patients</h1>
          <p className='text-sm text-muted-foreground'>
            View and manage all patients you have appointed.
          </p>
        </div>

        <Button onClick={refreshPatients} variant='outline' disabled={isLoading}>
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
            <CardDescription>Total Appointed</CardDescription>
            <CardTitle className='text-3xl'>{filteredAppointedPatients.length}</CardTitle>
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
          <CardTitle className='text-lg'>Search & Filter</CardTitle>
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
          <CardTitle className='text-lg'>Patient Records</CardTitle>
          <CardDescription>All patients you have consulted and appointed.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className='flex h-48 items-center justify-center gap-2 text-muted-foreground'>
              <Spinner className='size-5' />
              <span>Loading appointed patients...</span>
            </div>
          ) : filteredAppointedPatients.length === 0 ? (
            <div className='rounded-lg border border-dashed p-8 text-center'>
              <h3 className='text-base font-semibold'>No Appointed Patients Found</h3>
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
                      <TableHead>Medicines</TableHead>
                      <TableHead>Appointment Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAppointedPatients.map((patient) => (
                      <TableRow
                        key={patient.id}
                        className='cursor-pointer'
                        onClick={() => handlePatientClick(patient)}
                      >
                        <TableCell className='font-medium'>{patient.name}</TableCell>
                        <TableCell>
                          {patient.age} /{' '}
                          <span className='capitalize'>{patient.gender}</span>
                        </TableCell>
                        <TableCell className='max-w-65 truncate'>{patient.problem}</TableCell>
                        <TableCell>{patient.mobile}</TableCell>
                        <TableCell className='max-w-64 truncate text-xs'>
                          {patient.medicines || 'N/A'}
                        </TableCell>
                        <TableCell>{renderStatus(patient.appointmentDate)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className='grid gap-3 md:hidden'>
                {filteredAppointedPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className='cursor-pointer rounded-xl border bg-card p-4 shadow-xs'
                    onClick={() => handlePatientClick(patient)}
                  >
                    <div className='flex items-start justify-between gap-3'>
                      <div>
                        <p className='text-base font-semibold leading-tight'>{patient.name}</p>
                        <p className='text-xs text-muted-foreground'>
                          {patient.age} years •{' '}
                          <span className='capitalize'>{patient.gender}</span>
                        </p>
                      </div>
                      {renderStatus(patient.appointmentDate)}
                    </div>

                    <div className='mt-3 space-y-1.5 text-sm'>
                      <p>
                        <span className='text-muted-foreground'>Problem:</span> {patient.problem}
                      </p>
                      <p>
                        <span className='text-muted-foreground'>Mobile:</span> {patient.mobile}
                      </p>
                      <p>
                        <span className='text-muted-foreground'>Medicines:</span>{' '}
                        <span className='text-xs'>
                          {patient.medicines ? patient.medicines.substring(0, 50) + (patient.medicines.length > 50 ? '...' : '') : 'N/A'}
                        </span>
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

export default AppointedPatients