import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import AddMarker from "./AddMarker"

const MapComponent = ({
  //deklarasi lat dan lng awal di D gamaforce
  coordinates = { lat: -7.773648529865574, lng: 110.37838175455724 },
}) => {
  //mengisikan mapRef, mapInstance, dan markerRef dengan 0 untuk manupulasi 
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);
  const [map, setMap] = useState(null);

  // membuat hook untuk dapat menjalankan peta ke dalam webpage
  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      // Inisialisasi peta hanya satu kali karena sifat useEffect yang membuat hook dan kemungkinan ada efek samping
      mapInstance.current = L.map(mapRef.current, {
        zommControl: false
      }).setView(
        [coordinates.lat, coordinates.lng],
        13
        //13 nya untuk apa
      );
      //impor map dari openstreermap
     
L.control.zoom({
  position: 'topright'
}).addTo(mapInstance.current)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);

      setMap(mapInstance.current);
    } else if (mapInstance.current) {
      // Memperbarui posisi peta dan marker ketika koordinat berubah
      mapInstance.current.setView([coordinates.lat, coordinates.lng], 13);
    }
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [coordinates]);



  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <div ref={mapRef} className="w-full h-full">
        {map && <AddMarker map={map}/>}
      </div>     
    </div>
  );
};

export default MapComponent;
