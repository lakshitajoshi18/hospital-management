'use client'

import React, { useState } from 'react'
import { DOCTORTYPE } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useDoctorStore } from '@/store/doctor.store'
import { qualifications, specializations } from '@/constants'

const ProfilePage = () => {
  // Mock doctor data - You can replace this with actual API call
  const { user } = useDoctorStore();
  const [doctor, setDoctor] = useState<DOCTORTYPE>(user as DOCTORTYPE);

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<DOCTORTYPE>(doctor as DOCTORTYPE);

  const handleInputChange = (field: keyof DOCTORTYPE, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleHospitalChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      hospital: prev.hospital ? {
        ...prev.hospital,
        [field]: field === 'id' ? parseInt(value) : value
      } : { id: parseInt(value), name: value }
    }))
  }

  const handleSave = () => {
    setDoctor(formData)
    setIsEditing(false)
    // TODO: Make API call to update doctor profile
    console.log('Updated doctor data:', formData)
  }

  const handleCancel = () => {
    setFormData(doctor)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl">Doctor Profile</CardTitle>
                <CardDescription>Manage your professional information</CardDescription>
              </div>
              <div className="flex gap-2">
                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Edit Profile
                  </Button>
                )}
                {isEditing && (
                  <>
                    <Button
                      onClick={handleSave}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Save Changes
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Header Info Section */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ID - Read Only */}
                <div className="space-y-2">
                  <Label htmlFor="id" className="text-sm font-medium">Doctor ID</Label>
                  <Input
                    id="id"
                    value={formData.id || ''}
                    disabled
                    className="bg-gray-100"
                  />
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-100' : ''}
                    placeholder="Enter full name"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-100' : ''}
                    placeholder="Enter phone number"
                  />
                </div>

                {/* City */}
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-medium">City</Label>
                  <Input
                    id="city"
                    value={formData.city || ''}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-100' : ''}
                    placeholder="Enter city"
                  />
                </div>
              </div>
            </div>

            {/* Professional Info Section */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold mb-4">Professional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Specialization */}
                <div className="space-y-2">
                  <Label htmlFor="specialization" className="text-sm font-medium">Specialization</Label>
                  {isEditing ? (
                    <Select value={formData.specialization || ''} onValueChange={(value) => handleInputChange('specialization', value)}>
                      <SelectTrigger id="specialization" className={"w-full"}>
                        <SelectValue placeholder="Select specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        {specializations.map(spec => (
                          <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id="specialization"
                      value={formData.specialization || ''}
                      disabled
                      className="bg-gray-100"
                    />
                  )}
                </div>

                {/* Qualification */}
                <div className="space-y-2">
                  <Label htmlFor="qualification" className="text-sm font-medium">Qualification</Label>
                  {isEditing ? (
                    <Select value={formData.qualification || ''} onValueChange={(value) => handleInputChange('qualification', value)}>
                      <SelectTrigger id="qualification" className={"w-full"}>
                        <SelectValue placeholder="Select qualification" />
                      </SelectTrigger>
                      <SelectContent>
                        {qualifications.map(qual => (
                          <SelectItem key={qual} value={qual}>{qual}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id="qualification"
                      value={formData.qualification || ''}
                      disabled
                      className="bg-gray-100"
                    />
                  )}
                </div>

                {/* Experience */}
                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-sm font-medium">Years of Experience</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={formData.experience || ''}
                    onChange={(e) => handleInputChange('experience', parseInt(e.target.value) || null)}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-100' : ''}
                    placeholder="Enter years of experience"
                  />
                </div>

                {/* Hospital Name - Read Only */}
                <div className="space-y-2">
                  <Label htmlFor="hospital" className="text-sm font-medium">Hospital</Label>
                  <Input
                    id="hospital"
                    value={formData.hospital?.name || ''}
                    disabled
                    className="bg-gray-100"
                  />
                  <p className="text-xs text-gray-500">Contact administrator to change hospital</p>
                </div>
              </div>
            </div>

            {/* Status Section */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold mb-4">Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Verification Status */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Verification Status</Label>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={formData.isVerified ? "default" : "secondary"}
                      className={formData.isVerified ? "bg-green-600 hover:bg-green-700" : "bg-yellow-600 hover:bg-yellow-700"}
                    >
                      {formData.isVerified ? '✓ Verified' : 'Pending Verification'}
                    </Badge>
                  </div>
                </div>

                {/* Patients Appointed - Read Only */}
                <div className="space-y-2">
                  <Label htmlFor="patientsAppointed" className="text-sm font-medium">Total Patients Appointed</Label>
                  <Input
                    id="patientsAppointed"
                    type="number"
                    value={formData.patientsAppointed || ''}
                    disabled
                    className="bg-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                📝 All information marked as read-only is managed by the system administrator.
                For any changes to these fields, please contact the support team.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProfilePage