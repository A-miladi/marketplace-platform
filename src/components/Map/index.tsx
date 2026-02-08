"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import React from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import toast from "react-hot-toast";
import MarkIcon from "../../../public/assets/image/location.png";

const customIcon = L.icon({
  iconUrl: MarkIcon.src,
  iconSize: [25, 25],
});

const ChangeMapView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
};

const MapClickHandler = ({
  setLocation,
}: {
  setLocation: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number } | null>
  >;
}) => {
  useMapEvents({
    async click(e: { latlng: { lat: any; lng: any } }) {
      const { lat, lng } = e.latlng;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
        );
        const data = await response.json();

        if (data && data.address) {
          setLocation({ lat, lng });
        } else {
          setLocation({ lat, lng });
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Error in indicating location");
        setLocation({ lat, lng });
      }
    },
  });
  return null;
};

interface MapWithSearchProps {
  location: { lat: number; lng: number } | null;
  setLocation: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number } | null>
  >;
}

const MapWithSearch = ({ location, setLocation }: MapWithSearchProps) => {
  const defaultCenter: [number, number] = [52.52, 13.405];
  const center: [number, number] = location
    ? [location.lat, location.lng]
    : defaultCenter;

  return (
    <div className="z-0 flex flex-col justify-between overflow-hidden">
      <MapContainer
        zoomControl={false}
        center={center}
        zoom={11}
        className="h-72 w-full rounded-xl"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {location && (
          <>
            <ChangeMapView center={[location.lat, location.lng]} />
            <Marker
              position={[location.lat, location.lng]}
              icon={customIcon}
            ></Marker>
          </>
        )}
        <MapClickHandler setLocation={setLocation} />
      </MapContainer>
    </div>
  );
};

export default MapWithSearch;
