import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import PatientForm from '../shared/patientForm'

const BookAppointmentDialogBox = ({city, hospitalId} : {
    city: string
    hospitalId: number
}) => {
  return (
    <Dialog>
        <DialogTrigger className="inline-flex items-center justify-center rounded-full bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
            Book Appointment
        </DialogTrigger>
        <DialogContent className={"min-w-[90%] h-5/6 max-h-[95vh] rounded-[28px] border border-cyan-100 bg-white/95 shadow-2xl p-0 backdrop-blur-sm overflow-hidden"}>
            <div className="h-full overflow-y-auto">
                <PatientForm city={city} hospitalId={hospitalId} />
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default BookAppointmentDialogBox