//componen untuk menampilkan map
// import
import L, { map } from "leaflet";
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
      mapInstance.current = L.map(mapRef.current).setView(
        //harus diisiset view
        //bisa dibuat code dimana user menginputkan nilai
        //input nilai untuk menampilkan koordinat
        [coordinates.lat, coordinates.lng],
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
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaYtTmIxIyYVEbkj2HOeLrg2XbOX6UCWz89g&s",
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
      });
    }
  }, [coordinates]);
  return (
    <div className="w-screen h-screen overflow-hidden" ref={mapRef}>
      MapComponent
    </div>
  );
};

export default MapComponent;
