"use client"

import React, { useEffect, useState } from 'react'
import AddHospitalDialog from './_components/AddHospitalDialog'
import ListofHospital from './_components/ListofHospital'
import ListofDoctors from './_components/ListofDoctors'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AdminPasswordDialog from './_components/AdminPasswordDialog'
import { AdminStore } from '@/store/admin.store'

const AdminPage = () => {
    const [isAuthorized, setIsAuthorized] = useState(false)

    const handleVerified = () => {
        setIsAuthorized(true)
    }

    const { getDoctorList } = AdminStore();
    useEffect(() => {
        if (!isAuthorized) return
        getDoctorList();
    }, [isAuthorized, getDoctorList])

    return (
        <>
            <AdminPasswordDialog open={!isAuthorized} onVerified={handleVerified} />

            {isAuthorized ? (
                <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold text-green-800">Admin Panel</h1>
                        <AddHospitalDialog />
                    </div>
                    <Tabs defaultValue="doctors">
                        <TabsList className={"items-center mx-auto"}>
                            <TabsTrigger value={"doctors"} >Doctors</TabsTrigger>
                            <TabsTrigger value={"hospitals"}>Hospitals</TabsTrigger>
                        </TabsList>
                        <TabsContent value={"doctors"}>
                            <ListofDoctors />
                        </TabsContent>
                        <TabsContent value={"hospitals"}>
                            <ListofHospital />
                        </TabsContent>
                    </Tabs>
                </div>
            ) : null}
        </>
    )
}

export default AdminPage