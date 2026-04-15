"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
    Ambulance,
    ArrowUpRight,
    Building2,
    Clock3,
    MapPin,
    Phone,
    Search,
    Siren,
} from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { usePatientStore } from "@/store/patient.store";

type EmergencyDialogBoxProps = {
    triggerClassName?: string;
};

type Hospital = {
    id: number;
    name: string;
    type: string;
    address: string;
    city: string;
    phone: string;
    numberOfBeds: number;
    icuBeds: number;
    oxygenCylinders: number;
    ventilators: number;
    ambulances: number;
    hasXray: boolean;
    hasMRI: boolean;
    hasUltrasound: boolean;
    hasCTScan: boolean;
    hasPathologyLab: boolean;
    hasBloodBank: boolean;
    hasPharmacy: boolean;
    emergencyAvailable: boolean;
};

const hospitals: Hospital[] = [
    {
        id: 101,
        name: "Pithoragarh District Hospital",
        type: "Government",
        address: "Kanalichhina Road, Near City Bus Stand",
        city: "pithoragarh",
        phone: "05964-224501",
        numberOfBeds: 220,
        icuBeds: 24,
        oxygenCylinders: 160,
        ventilators: 18,
        ambulances: 7,
        hasXray: true,
        hasMRI: false,
        hasUltrasound: true,
        hasCTScan: true,
        hasPathologyLab: true,
        hasBloodBank: true,
        hasPharmacy: true,
        emergencyAvailable: true,
    },
    {
        id: 102,
        name: "Himalaya LifeCare Hospital",
        type: "Private Multispeciality",
        address: "Siltham Bypass, Ward 4",
        city: "pithoragarh",
        phone: "05964-226119",
        numberOfBeds: 140,
        icuBeds: 18,
        oxygenCylinders: 120,
        ventilators: 14,
        ambulances: 5,
        hasXray: true,
        hasMRI: true,
        hasUltrasound: true,
        hasCTScan: true,
        hasPathologyLab: true,
        hasBloodBank: false,
        hasPharmacy: true,
        emergencyAvailable: true,
    },
    {
        id: 103,
        name: "Sharda Valley Trauma Center",
        type: "Emergency and Trauma",
        address: "Dhaula Devi Link Road",
        city: "pithoragarh",
        phone: "05964-221873",
        numberOfBeds: 95,
        icuBeds: 20,
        oxygenCylinders: 98,
        ventilators: 12,
        ambulances: 6,
        hasXray: true,
        hasMRI: false,
        hasUltrasound: true,
        hasCTScan: true,
        hasPathologyLab: true,
        hasBloodBank: true,
        hasPharmacy: true,
        emergencyAvailable: true,
    },
    {
        id: 104,
        name: "Kumaon City Care",
        type: "General",
        address: "Didihat Road, Civil Lines",
        city: "pithoragarh",
        phone: "05964-229311",
        numberOfBeds: 70,
        icuBeds: 9,
        oxygenCylinders: 56,
        ventilators: 6,
        ambulances: 3,
        hasXray: true,
        hasMRI: false,
        hasUltrasound: true,
        hasCTScan: false,
        hasPathologyLab: true,
        hasBloodBank: false,
        hasPharmacy: true,
        emergencyAvailable: true,
    },
    {
        id: 201,
        name: "Nainital Prime Hospital",
        type: "Private",
        address: "Mallital Main Road",
        city: "nainital",
        phone: "05942-221442",
        numberOfBeds: 130,
        icuBeds: 16,
        oxygenCylinders: 95,
        ventilators: 10,
        ambulances: 4,
        hasXray: true,
        hasMRI: true,
        hasUltrasound: true,
        hasCTScan: true,
        hasPathologyLab: true,
        hasBloodBank: true,
        hasPharmacy: true,
        emergencyAvailable: true,
    },
];

const boolLabel = (value: boolean) => (value ? "Available" : "Not available");

const normalizeCity = (value: string) => value.trim().toLowerCase();

const EmergencyDialogBox = ({ triggerClassName }: EmergencyDialogBoxProps) => {
    const {cityHospitalList, getCityHospitalList} = usePatientStore();
    const [cityInput, setCityInput] = useState("");
    const [addressInput, setAddressInput] = useState<string | null>(null);
    const [addressFilter, setAddressFilter] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);

    const addressOptions = useMemo(
        () => [...new Set(cityHospitalList.map((hospital) => hospital.address))],
        [cityHospitalList]
    );

    const filteredHospitals = useMemo(() => {
        if (!addressFilter.trim()) {
            return cityHospitalList;
        }

        const filterValue = addressFilter.trim().toLowerCase();
        return cityHospitalList.filter((hospital) =>
            hospital.address.toLowerCase().includes(filterValue) ||
            hospital.city.toLowerCase().includes(filterValue)
        );
    }, [addressFilter, cityHospitalList]);

    const searchHospitals = async () => {
        if (cityInput.trim()) {
            await getCityHospitalList(cityInput.trim());
        }
    };

    const applyAddressFilter = () => {
        if (!addressInput) {
            return;
        }

        setAddressFilter(addressInput.trim());
        setFilterOpen(false);
    };

    const clearAddressFilter = () => {
        setAddressInput(null);
        setAddressFilter("");
    };
    return (
        <Dialog>
            <DialogTrigger
                className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-11 rounded-full bg-rose-600 px-5 text-base font-semibold text-white shadow-[0_18px_40px_rgba(225,29,72,0.28)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-rose-500",
                    triggerClassName
                )}
            >
                <Ambulance className="size-5" />
                Find Emergency Hospitals
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-hidden border-cyan-100 bg-[linear-gradient(180deg,#f8fcff_0%,#f2fbff_100%)] p-0 sm:max-w-4xl">
                <DialogHeader className="border-b border-cyan-100 px-5 pb-4 pt-5 sm:px-6">
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge className="bg-rose-100 text-rose-700">
                            <Siren className="size-3.5" />
                            Emergency Finder
                        </Badge>
                        <Badge className="bg-cyan-100 text-cyan-800">
                            <Clock3 className="size-3.5" />
                            Real-time city based lookup
                        </Badge>
                    </div>
                    <DialogTitle className="pt-2 text-xl text-slate-900 sm:text-2xl">
                        Find hospitals by city and book directly
                    </DialogTitle>
                    <DialogDescription className="text-slate-600">
                        Enter your city to view emergency-ready hospitals with bed count, ICU support, oxygen stock, and critical
                        facilities.
                    </DialogDescription>

                    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <form
                            className="flex-1 flex flex-col gap-3 sm:flex-row"
                            onSubmit={(event) => {
                                event.preventDefault();
                                searchHospitals();
                            }}
                        >
                            <Input
                                value={cityInput}
                                onChange={(event) => setCityInput(event.target.value)}
                                placeholder="Enter city e.g. pithoragarh"
                                className="h-11 rounded-xl border-cyan-200 bg-white"
                            />
                            <button
                                type="submit"
                                className={cn(
                                    buttonVariants({ size: "lg" }),
                                    "h-11 rounded-xl bg-cyan-700 px-4 text-white hover:bg-cyan-800"
                                )}
                            >
                                <Search className="size-4.5" />
                                Search Hospitals
                            </button>
                        </form>

                        <Popover open={filterOpen} onOpenChange={setFilterOpen}>
                            <PopoverTrigger
                                className={cn(
                                    buttonVariants({ variant: "outline", size: "sm" }),
                                    "flex h-11 items-center gap-2 rounded-full border-cyan-200 bg-white px-4 text-sm text-cyan-700 shadow-sm hover:bg-cyan-50"
                                )}
                            >
                                <MapPin className="size-4" />
                                Address Filter
                            </PopoverTrigger>
                            <PopoverContent className="w-[min(28rem,100%)] border-cyan-100 bg-white p-4 shadow-lg" align="end">
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">Filter results by address</p>
                                        <p className="text-xs text-slate-500">Enter a street, landmark, or city area.</p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-slate-900 text-sm">Choose Address</Label>
                                        <Select value={addressInput} onValueChange={setAddressInput}>
                                            <SelectTrigger className="h-11 rounded-xl border-cyan-200 bg-slate-50 px-3 text-left text-sm text-slate-700 w-full">
                                                <SelectValue placeholder={addressOptions.length > 0 ? "Select address" : "Search city first"} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {addressOptions.length > 0 ? (
                                                    addressOptions.map((address) => (
                                                        <SelectItem key={address} value={address}>
                                                            {address}
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <SelectItem value="" disabled>
                                                        No addresses available
                                                    </SelectItem>
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                                        <button
                                            type="button"
                                            onClick={clearAddressFilter}
                                            className={cn(
                                                buttonVariants({ variant: "outline", size: "sm" }),
                                                "h-11 rounded-xl border-cyan-200 bg-white text-cyan-700 hover:bg-cyan-50"
                                            )}
                                        >
                                            Clear Filter
                                        </button>
                                        <button
                                            type="button"
                                            onClick={applyAddressFilter}
                                            className={cn(
                                                buttonVariants({ size: "sm" }),
                                                "h-11 rounded-xl bg-cyan-700 text-white hover:bg-cyan-800"
                                            )}
                                        >
                                            Apply Filter
                                        </button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </DialogHeader>

                <div className="px-5 py-4 sm:px-6">
<div className="mb-3 space-y-3">
                            <p className="text-sm text-slate-600">
                                Showing results for <span className="font-semibold text-slate-900">{cityInput || "city"}</span>:
                                <span className="font-semibold text-cyan-800"> {filteredHospitals.length}</span> hospitals found.
                            </p>
                            {addressFilter && (
                                <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-cyan-100 bg-cyan-50/80 px-4 py-3 text-sm text-slate-700">
                                    <MapPin className="size-4 text-cyan-700" />
                                    <span>
                                        <span className="font-semibold text-slate-900">Address filter:</span> {addressFilter}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={clearAddressFilter}
                                        className="rounded-full px-3 py-1 text-sm font-semibold text-cyan-700 transition-colors hover:bg-cyan-100"
                                    >
                                        Reset
                                    </button>
                                </div>
                            )}
                        </div>

                    <ScrollArea className="h-[56vh] pr-3">
                        <div className="space-y-4 pb-2">
                            {filteredHospitals.length > 0 ? (
                                filteredHospitals.map((hospital) => {
                                    const bookingParams = new URLSearchParams({
                                        hospitalId: String(hospital.id),
                                        city: hospital.city,
                                        emergency: "true",
                                    }).toString();

                                    return (
                                        <Card
                                            key={hospital.id}
                                            className="rounded-[22px] border border-cyan-100/80 bg-white/90 py-0 shadow-[0_16px_50px_rgba(14,116,144,0.10)]"
                                        >
                                            <CardHeader className="space-y-3 border-b border-cyan-100/70 pt-5">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <Badge className="bg-cyan-700 text-white">{hospital.type}</Badge>
                                                    <Badge variant="outline" className="border-emerald-200 text-emerald-700">
                                                        {hospital.emergencyAvailable ? "Emergency Available" : "Emergency Limited"}
                                                    </Badge>
                                                </div>
                                                <CardTitle className="text-xl text-slate-900">{hospital.name}</CardTitle>
                                                <div className="space-y-2 text-sm text-slate-600">
                                                    <p className="flex items-start gap-2">
                                                        <MapPin className="mt-0.5 size-4 text-cyan-700" />
                                                        {hospital.address}, {hospital.city}
                                                    </p>
                                                    <p className="flex items-center gap-2">
                                                        <Phone className="size-4 text-cyan-700" />
                                                        {hospital.phone}
                                                    </p>
                                                </div>
                                            </CardHeader>

                                            <CardContent className="space-y-4 pt-4">
                                                <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-5">
                                                    <div className="rounded-xl border border-cyan-100 bg-cyan-50/60 p-2.5">
                                                        <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Beds</p>
                                                        <p className="mt-1 font-semibold text-slate-900">{hospital.numberOfBeds}</p>
                                                    </div>
                                                    <div className="rounded-xl border border-cyan-100 bg-cyan-50/60 p-2.5">
                                                        <p className="text-xs uppercase tracking-[0.15em] text-slate-500">ICU</p>
                                                        <p className="mt-1 font-semibold text-slate-900">{hospital.icuBeds}</p>
                                                    </div>
                                                    <div className="rounded-xl border border-cyan-100 bg-cyan-50/60 p-2.5">
                                                        <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Oxygen</p>
                                                        <p className="mt-1 font-semibold text-slate-900">{hospital.oxygenCylinders}</p>
                                                    </div>
                                                    <div className="rounded-xl border border-cyan-100 bg-cyan-50/60 p-2.5">
                                                        <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Vent.</p>
                                                        <p className="mt-1 font-semibold text-slate-900">{hospital.ventilators}</p>
                                                    </div>
                                                    <div className="rounded-xl border border-cyan-100 bg-cyan-50/60 p-2.5">
                                                        <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Ambulance</p>
                                                        <p className="mt-1 font-semibold text-slate-900">{hospital.ambulances}</p>
                                                    </div>
                                                </div>

                                                <Accordion defaultValue={[hospital.id]}>
                                                    <AccordionItem
                                                        value={String(hospital.id)}
                                                        className="rounded-xl border border-cyan-100 bg-slate-50/80 px-3"
                                                    >
                                                        <AccordionTrigger className="py-3 text-slate-800 hover:no-underline">
                                                            Advanced Facilities
                                                        </AccordionTrigger>
                                                        <AccordionContent>
                                                            <div className="grid gap-2 pb-1 text-xs text-slate-700 sm:grid-cols-2 lg:grid-cols-4">
                                                                <Badge variant="outline" className="justify-start border-slate-200 bg-white px-2.5 py-1">
                                                                    X-Ray: {boolLabel(hospital.hasXray)}
                                                                </Badge>
                                                                <Badge variant="outline" className="justify-start border-slate-200 bg-white px-2.5 py-1">
                                                                    MRI: {boolLabel(hospital.hasMRI)}
                                                                </Badge>
                                                                <Badge variant="outline" className="justify-start border-slate-200 bg-white px-2.5 py-1">
                                                                    Ultrasound: {boolLabel(hospital.hasUltrasound)}
                                                                </Badge>
                                                                <Badge variant="outline" className="justify-start border-slate-200 bg-white px-2.5 py-1">
                                                                    CT Scan: {boolLabel(hospital.hasCTScan)}
                                                                </Badge>
                                                                <Badge variant="outline" className="justify-start border-slate-200 bg-white px-2.5 py-1">
                                                                    Pathology: {boolLabel(hospital.hasPathologyLab)}
                                                                </Badge>
                                                                <Badge variant="outline" className="justify-start border-slate-200 bg-white px-2.5 py-1">
                                                                    Blood Bank: {boolLabel(hospital.hasBloodBank)}
                                                                </Badge>
                                                                <Badge variant="outline" className="justify-start border-slate-200 bg-white px-2.5 py-1">
                                                                    Pharmacy: {boolLabel(hospital.hasPharmacy)}
                                                                </Badge>
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                            </CardContent>

                                            <CardFooter className="justify-end gap-2 rounded-b-[22px] border-t border-cyan-100/70 bg-cyan-50/50">
                                                <Link
                                                    href={`tel:${hospital.phone}`}
                                                    className={cn(
                                                        buttonVariants({ variant: "outline", size: "sm" }),
                                                        "rounded-full border-cyan-200 bg-white text-cyan-700 hover:bg-cyan-50"
                                                    )}
                                                >
                                                    Call Hospital
                                                </Link>
                                                <Link
                                                    href={`/login?${bookingParams}`}
                                                    className={cn(
                                                        buttonVariants({ size: "sm" }),
                                                        "rounded-full bg-slate-900 text-white hover:bg-cyan-800"
                                                    )}
                                                >
                                                    Direct Appointment Booking
                                                    <ArrowUpRight className="size-4" />
                                                </Link>
                                            </CardFooter>
                                        </Card>
                                    );
                                })
                            ) : (
                                <div className="rounded-2xl border border-dashed border-cyan-200 bg-white/85 p-8 text-center">
                                    <Building2 className="mx-auto size-8 text-cyan-700" />
                                    <h3 className="mt-3 text-lg font-semibold text-slate-900">No hospitals found</h3>
                                    <p className="mt-1 text-sm text-slate-600">
                                        Try searching for <span className="font-medium text-cyan-800">pithoragarh</span> to view demo data.
                                    </p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EmergencyDialogBox;