import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';

const AddMarker = ({ map }) => {
  const drawnItemsRef = useRef(null);
  const polylineRef = useRef(null);
  const markersRef = useRef([]);
  const [isMarkerMode, setIsMarkerMode] = useState(false);
  const buttonContainerRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    try {
      // Create layer for drawn items if it doesn't exist
      if (!drawnItemsRef.current) {
        drawnItemsRef.current = new L.FeatureGroup();
        map.addLayer(drawnItemsRef.current);
      }

      // Initialize empty polyline if it doesn't exist
      if (!polylineRef.current) {
        polylineRef.current = L.polyline([], {
          color: 'blue',
          weight: 3,
          smoothFactor: 1,
          opacity: 0.8
        });
        map.addLayer(polylineRef.current);
      }

      // Function to update polyline
      const updatePolyline = () => {
        try {
          if (markersRef.current.length > 0) {
            const validPoints = markersRef.current
              .map(marker => marker.getLatLng())
              .filter(point => point && point.lat && point.lng);

            if (validPoints.length > 0) {
              polylineRef.current.setLatLngs(validPoints);
            }
          } else {
            polylineRef.current.setLatLngs([]);
          }
        } catch (error) {
          console.error('Error updating polyline:', error);
        }
      };

      // Handle map click for adding markers
      const handleMapClick = (e) => {
        if (!isMarkerMode) return;

        // Check if click is within button container
        if (buttonContainerRef.current) {
          const rect = buttonContainerRef.current.getBoundingClientRect();
          if (e.originalEvent.clientX >= rect.left && 
              e.originalEvent.clientX <= rect.right && 
              e.originalEvent.clientY >= rect.top && 
              e.originalEvent.clientY <= rect.bottom) {
            return; // Don't add marker if click is within button container
          }
        }
        
        try {
          const marker = L.marker(e.latlng, {
            draggable: true
          }).addTo(drawnItemsRef.current);

          // Add marker to our reference array
          markersRef.current.push(marker);

          // Update polyline with proper coordinates
          updatePolyline();

          // Add drag events to marker
          marker.on('drag', updatePolyline);
          marker.on('dragend', updatePolyline);

          // Add click handler to marker for deletion
          marker.on('click', (event) => {
            L.DomEvent.stopPropagation(event);
            
            if (window.confirm('Hapus marker ini?')) {
              drawnItemsRef.current.removeLayer(marker);
              markersRef.current = markersRef.current.filter(m => m !== marker);
              updatePolyline();
            }
          });
        } catch (error) {
          console.error('Error adding marker:', error);
        }
      };

      map.on('click', handleMapClick);

      return () => {
        map.off('click', handleMapClick);
      };
    } catch (error) {
      console.error('Error initializing marker control:', error);
    }
  }, [map, isMarkerMode]);

  const toggleMarkerMode = () => {
    setIsMarkerMode(!isMarkerMode);
    map.getContainer().style.cursor = !isMarkerMode ? 'crosshair' : '';
  };

  const clearMarkers = () => {
    if (window.confirm('Hapus semua marker?')) {
      if (drawnItemsRef.current) {
        drawnItemsRef.current.clearLayers();
      }
      if (polylineRef.current) {
        polylineRef.current.setLatLngs([]);
      }
      markersRef.current = [];
    }
  };

  return (
    <>
      {/* Transparent overlay to prevent map interaction behind buttons */}
      <div 
        style={{
          position: 'absolute',
          top: 25,
          right: 0,
          width: '200px',  // Adjust based on your needs
          height: '150px', // Adjust based on your needs
          pointerEvents: 'none',
          zIndex: 999
        }}
      >
        {/* Button container with pointer events enabled */}
        <div 
          ref={buttonContainerRef}
          style={{
            position: 'absolute',
            top: '50px',
            right: '10px',
            pointerEvents: 'auto',
            backgroundColor: 'transparent'
          }}
        >
          <div className="flex flex-col gap-2 p-1">
            <button
              type="button"
              onClick={toggleMarkerMode}
              className={`px-3 py-1.5 rounded text-sm font-medium shadow-sm ${
                isMarkerMode 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              {isMarkerMode ? '🚫 Stop' : '📍 Add Location'}
            </button>
            <button
              type="button"
              onClick={clearMarkers}
              className="px-3 py-1.5 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm"
            >
              🗑️ Clear Map
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMarker;