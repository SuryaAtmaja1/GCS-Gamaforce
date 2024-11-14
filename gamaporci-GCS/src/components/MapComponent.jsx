import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import AddMarker from "./AddMarker";

const MapComponent = ({
  coordinates = { lat: -7.773648529865574, lng: 110.37838175455724 },
  markers,
  onMarkersUpdate
}) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        zoomControl: false
      }).setView(
        [coordinates.lat, coordinates.lng],
        13
      );

      L.control.zoom({
        position: 'topright'
      }).addTo(mapInstance.current);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);

      setMap(mapInstance.current);
    } else if (mapInstance.current) {
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
    <div className="w-full h-full">
      <div ref={mapRef} className="w-full h-full">
        {map && (
          <AddMarker 
            map={map}
            markers={markers}
            onMarkersUpdate={onMarkersUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default MapComponent;