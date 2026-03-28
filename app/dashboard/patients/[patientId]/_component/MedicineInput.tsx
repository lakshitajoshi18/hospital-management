import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { consumption } from '@/constants';
import { toast } from 'sonner';
import { MEDICINETYPES } from '@/types';

const InputMedicines = ({ medicines, setMedicines }: {
    medicines: MEDICINETYPES[],
    setMedicines: React.Dispatch<React.SetStateAction<MEDICINETYPES[]>>
}) => {
    const [input, setInput] = useState({
        medicine: '',
        consumption: '',
        days: ''
    })
    const handlePush = () => {
        if (!input.medicine || !input.consumption || !input.days) {
            toast.error("Fill all the fields");
            return;
        }

        const parsedDays = Number(input.days);
        if (Number.isNaN(parsedDays) || parsedDays <= 0) {
            toast.error("Days should be greater than 0");
            return;
        }

        setMedicines([
            ...medicines,
            { medicine: input.medicine, consumption: input.consumption, days: parsedDays }
        ])

        setInput({
            medicine: '',
            consumption: '',
            days: ''
        })
    }
    return (
        <div className='w-full rounded-xl border border-cyan-200 bg-white p-4 md:p-5'>
            <div className='mb-4'>
                <p className='text-sm font-semibold text-cyan-900'>Add New Medicine</p>
                <p className='text-xs text-cyan-800/70'>Fill the details and press Add Medicine.</p>
            </div>

            <div className='grid items-end gap-4 md:grid-cols-2 xl:grid-cols-4'>
                <div className='space-y-2'>
                    <Label>Medicine Name</Label>
                    <Input
                        placeholder='Enter medicine name'
                        className='border-cyan-200'
                        value={input.medicine}
                        onChange={(e) => setInput({ ...input, medicine: e.target.value })}
                    />
                </div>

                <div className='space-y-2'>
                    <Label>Consumption</Label>
                    <Select onValueChange={(e) => e && setInput({ ...input, consumption: e.toString() })} value={input.consumption || ''}>
                        <SelectTrigger className='border-cyan-200'>
                            <SelectValue placeholder="Select pattern" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                consumption.map((item, idx) => (
                                    <SelectItem key={idx} value={item}>{item}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>

                <div className='space-y-2'>
                    <Label>Time Period</Label>
                    <Input
                        placeholder='Number of days'
                        type='number'
                        className='border-cyan-200'
                        min={1}
                        value={input.days}
                        onChange={(e) => setInput({ ...input, days: e.target.value })}
                    />
                </div>

                <div className='w-full'>
                    <Button onClick={handlePush} size='sm' className='w-full bg-cyan-700 text-white hover:bg-cyan-800'>Add Medicine</Button>
                </div>
            </div>
        </div>
    )
}

export default InputMedicines