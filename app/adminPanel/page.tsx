import React from 'react'
import AddHospitalDialog from './_components/AddHospitalDialog'

const AdminPage = () => {
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-green-800">Admin Panel</h1>
                <AddHospitalDialog />
            </div>
        </div>
    )
}

export default AdminPage