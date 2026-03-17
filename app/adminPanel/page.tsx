import React from 'react'
import AddHospitalDialog from './_components/AddHospitalDialog'
import ListofHospital from './_components/ListofHospital'
import ListofDoctors from './_components/ListofDoctors'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const AdminPage = () => {
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-green-800">Admin Panel</h1>
                <AddHospitalDialog />
            </div>
            <Tabs defaultValue="account">
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
    )
}

export default AdminPage