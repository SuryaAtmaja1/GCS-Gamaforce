//componen untuk menampilkan map
// import 
import {useEffect, useRef } from 'react'
import "leaflet/dist/leaflet.css"
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'


const MapComponen = () =>{
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if(mapRef.current && !mapInstance.current){
      mapInstance.current = L.map(mapRef.current).setView(
        //harus diisiset view 
        //bisa dibuat code dimana user menginputkan nilai
        //input nilai untuk menampilkan koordinat
        [-7.773648529865574, 110.37838175455724],
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);
      //add marker
      // const marker = L.marker([-7.773648529865574, 110.37838175455724]).addTo(
      //   mapInstance.current
      // );
      //add popup
      // marker.bindPopup("y").openPopup();

      //add icon
      const customItem = L.icon({
        // iconUrl: logo,
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
      });


      //gmrt
      L.marker([-7.773648529865574, 110.37838175455724], {icon: customItem})
        .addTo(mapInstance.current)
        // .bindPopup("apya")
        // .openPopup();
      } 
  }, []);
  return(
    <div className= "w-screen h-screen" ref={mapRef}>
    MapComponent</div>

  ) 
};

export default MapComponen;