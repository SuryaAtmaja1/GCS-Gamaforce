//componen untuk menampilkan map
// import
import L, { map } from "leaflet";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
// import LogoGama from './assets/LogoGama';

const MapComponent = ({ coordinates = { lat: -7.773648529865574, lng: 110.37838175455724} }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView(
        //harus diisiset view
        //bisa dibuat code dimana user menginputkan nilai
        //input nilai untuk menampilkan koordinat
        [coordinates.lat, coordinates,lng],
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);


      // //add marker
      // const marker = L.marker([-7.773648529865574, 110.37838175455724]).addTo(
      //   mapInstance.current
      // );
      // // add popup
      // marker.bindPopup("y").openPopup();

      //add icon
      const customItem = L.icon({
        iconUrl:
          "/src/assets/logoGama.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [-3, -76],
      });

      //gmrt
      markerRef.current = L.marker([coordinates.lat, coordinates.lng], {
        icon: customItem,
      })
        .addTo(mapInstance.current)
        .bindPopup("apya")
        .openPopup();
    }
    if(mapInstance.current && markerRef.current){
      markerRef.current.setLatLng([coordinates.lat, coordinates.lng]);
      mapInstance.current.setView([coordinates.lat, coordinates.lng], 13);
      markerRef.current.bindPopup(`Lat: ${coordinates.lat}, Lng: ${coordinates.lng}`).openPopup();
    }
  }, [coordinates]);
  return (
    <div className="w-screen h-screen overflow-hidden" ref={mapRef}>
      MapComponent
    </div>
  );
};

export default MapComponent;