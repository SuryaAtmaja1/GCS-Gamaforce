import L from "leaflet";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

const MapComponent = ({
  coordinates = { lat: -7.773648529865574, lng: 110.37838175455724 },
}) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      // Inisialisasi peta hanya satu kali
      mapInstance.current = L.map(mapRef.current).setView(
        [coordinates.lat, coordinates.lng],
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);

      // // Inisialisasi marker pada peta
      // markerRef.current = L.marker([coordinates.lat, coordinates.lng]).addTo(
      //   mapInstance.current
      // );
    }
    // else if (mapInstance.current && markerRef.current) {
    //   // Memperbarui posisi peta dan marker ketika koordinat berubah
    //   mapInstance.current.setView([coordinates.lat, coordinates.lng], 13);
    //   markerRef.current.setLatLng([coordinates.lat, coordinates.lng]);
    // }
  }, [coordinates]);

  return (
    <div className="w-screen h-screen overflow-hidden" ref={mapRef}>
      MapComponent
    </div>
  );
};

export default MapComponent;
