"use client"

import { useEffect } from "react"
import L from "leaflet"
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet"

type Coordinates = {
    latitude: string
    longitude: string
}

type HospitalLocationMapProps = {
    value: Coordinates
    onChange: (coordinates: Coordinates) => void
}

const defaultCenter: [number, number] = [20.5937, 78.9629]

const mapUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

const initializeLeafletIcons = () => {
    delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: markerIcon2x.src,
        iconUrl: markerIcon.src,
        shadowUrl: markerShadow.src,
    })
}

const LocationMarker = ({ onChange }: { onChange: (coordinates: Coordinates) => void }) => {
    useMapEvents({
        click(event) {
            onChange({
                latitude: event.latlng.lat.toFixed(6),
                longitude: event.latlng.lng.toFixed(6),
            })
        },
    })

    return null
}

const HospitalLocationMap = ({ value, onChange }: HospitalLocationMapProps) => {
    useEffect(() => {
        initializeLeafletIcons()
    }, [])

    const hasLatitude = value.latitude.trim() !== ""
    const hasLongitude = value.longitude.trim() !== ""
    const latitude = hasLatitude ? Number(value.latitude) : Number.NaN
    const longitude = hasLongitude ? Number(value.longitude) : Number.NaN
    const hasCoordinates = hasLatitude && hasLongitude && Number.isFinite(latitude) && Number.isFinite(longitude)
    const center: [number, number] = hasCoordinates ? [latitude, longitude] : defaultCenter

    return (
        <div className="space-y-3">
            <div className="overflow-hidden rounded-xl border border-green-200">
                <MapContainer center={center} zoom={hasCoordinates ? 14 : 5} className="h-80 w-full">
                    <TileLayer attribution='&copy; OpenStreetMap contributors' url={mapUrl} />
                    <LocationMarker onChange={onChange} />
                    {hasCoordinates ? <Marker position={center} /> : null}
                </MapContainer>
            </div>
            <p className="text-sm text-green-700">
                Click anywhere on the map to drop a pin and capture the coordinates.
            </p>
        </div>
    )
}

export default HospitalLocationMap