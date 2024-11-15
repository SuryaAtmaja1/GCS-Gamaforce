// MapComponent.jsx

import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import AddMarker from "./AddMarker";

// Custom marker icon with blue color and white border
const blueIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `
    <div style="
      background-color: #3b82f6;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 4px rgba(0,0,0,0.3);
    "></div>
  `,
  iconSize: [15, 15],
  iconAnchor: [7.5, 7.5],
  popupAnchor: [0, -7.5]
});

const MapComponent = ({
  coordinates = { lat: -7.773648529865574, lng: 110.37838175455724 },
  markers,
  onMarkersUpdate,
  selectedMission
}) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [map, setMap] = useState(null);

  // Initialize map
  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      // Create map instance
      mapInstance.current = L.map(mapRef.current, {
        zoomControl: false,
        minZoom: 4,
        maxZoom: 18
      }).setView(
        [coordinates.lat, coordinates.lng],
        13
      );

      // Add zoom control
      L.control.zoom({
        position: 'topright'
      }).addTo(mapInstance.current);

      // Add base map layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
      }).addTo(mapInstance.current);

      setMap(mapInstance.current);
    } else if (mapInstance.current) {
      // Update view if map exists
      mapInstance.current.setView([coordinates.lat, coordinates.lng], 13);
    }

    // Cleanup on unmount
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [coordinates]);

  // Update map view when markers change
  useEffect(() => {
    if (mapInstance.current && markers && markers.length > 0) {
      const markerLatLngs = markers.map(marker => marker.getLatLng());
      const bounds = L.latLngBounds(markerLatLngs);
      mapInstance.current.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 15
      });
    }
  }, [markers]);

  // Update map when selected mission changes
  useEffect(() => {
    if (selectedMission && mapInstance.current) {
      if (selectedMission.path?.[0]) {
        mapInstance.current.setView(
          [selectedMission.path[0].lat, selectedMission.path[0].lng],
          13
        );
      }
    }
  }, [selectedMission]);

  return (
    <div className="w-full h-full relative">
      {/* Map container */}
      <div 
        ref={mapRef} 
        className="w-full h-full"
        style={{ backgroundColor: '#f3f4f6' }}
      >
        {map && (
          <AddMarker 
            map={map}
            markers={markers}
            onMarkersUpdate={onMarkersUpdate}
            selectedMission={selectedMission}
            customIcon={blueIcon}
          />
        )}
      </div>

      {/* Loading indicator */}
      {!map && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-gray-600">Loading map...</div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;