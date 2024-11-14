import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
// import lah

//deklarasi add marker dengan variable map, markers untuk simpen si array dari marker yang sudah ada, on marker update itu untuk uodate marker nya
const AddMarker = ({ map, markers, onMarkersUpdate }) => {
  //draw untuk hold drae items which marker dan garis (polylines)
  const drawnItemsRef = useRef(null);
  //markersref untuk store marker dan add ke map
  const markersRef = useRef([]);
  //untuk deklar bahwa dia defaultnya engga edit mode
  const [isMarkerMode, setIsMarkerMode] = useState(false);
  //mengandung button untuk handling click events
  const buttonContainerRef = useRef(null);


  //untuk membuat garis antara marker satu dengan marker yang lainnya
  const drawPolyline = () => {
    try {
      // Remove existing polylines first
      if (drawnItemsRef.current) {
        drawnItemsRef.current.eachLayer((layer) => {
          if (layer instanceof L.Polyline && !(layer instanceof L.Polygon)) {
            drawnItemsRef.current.removeLayer(layer);
          }
        });
      }

      // Draw new polyline if we have at least 2 markers
      if (markersRef.current.length >= 2) {
        const coordinates = markersRef.current.map(marker => marker.getLatLng());
        const polyline = L.polyline(coordinates, {
          color: '#3388ff',
          weight: 3,
          opacity: 0.8
        });
        
        drawnItemsRef.current.addLayer(polyline);
      }
    } catch (error) {
      console.error('Error drawing polyline:', error);
    }
  };

  useEffect(() => {
    if (!map) return;
    //kalo map maka dia menginisialisasikan items which marker
    try {
      // Initialize FeatureGroup if it doesn't exist
      if (!drawnItemsRef.current) {
        drawnItemsRef.current = new L.FeatureGroup();
        map.addLayer(drawnItemsRef.current);
      }

      const handleMapClick = (e) => {
        if (!isMarkerMode) return;
        //jadi ketika kita click dia di button dia tidak akan mendeteksi itu sebagai inisialisasi marker baru
        if (buttonContainerRef.current) {
          const rect = buttonContainerRef.current.getBoundingClientRect();
          if (e.originalEvent.clientX >= rect.left && 
              e.originalEvent.clientX <= rect.right && 
              e.originalEvent.clientY >= rect.top && 
              e.originalEvent.clientY <= rect.bottom) {
            return;
          }
        }
        
        //untuk dia bisa dipindah pindah yaw
        try {
          const marker = L.marker(e.latlng, {
            draggable: true
          });

          marker.on('drag dragend', () => {
            drawPolyline();
            onMarkersUpdate([...markersRef.current]);
          });

          drawnItemsRef.current.addLayer(marker);
          markersRef.current.push(marker);
          onMarkersUpdate([...markersRef.current]);
          
          // Draw polyline after adding marker
          drawPolyline();
        } catch (error) { //kalau lat dan lon nya tidak terdeteksi dan atau ada fungsi yang salah dalam program
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
  }, [map, isMarkerMode, onMarkersUpdate]);

  // Fungsi deleteMarker tanpa konfirmasi
  const deleteMarker = (index) => {
    try {
      if (index >= 0 && index < markersRef.current.length) {
        const marker = markersRef.current[index];
        drawnItemsRef.current.removeLayer(marker);
        markersRef.current = markersRef.current.filter((_, i) => i !== index);
        onMarkersUpdate([...markersRef.current]);
        drawPolyline();
      }
    } catch (error) {
      console.error('Error deleting marker:', error);
    }
  };

  const toggleMarkerMode = () => {
    setIsMarkerMode(!isMarkerMode);
    map.getContainer().style.cursor = !isMarkerMode ? 'crosshair' : '';
  };

  const clearMarkers = () => {
    if (window.confirm('Hapus semua marker?')) {
      try {
        drawnItemsRef.current.clearLayers();
        markersRef.current = [];
        onMarkersUpdate([]);
      } catch (error) {
        console.error('Error clearing markers:', error);
      }
    }
  };

  if (typeof window !== 'undefined') {
    window.deleteMarker = deleteMarker;
  }

  return (
    <div 
      style={{
        position: 'absolute',
        top: 25,
        right: 0,
        width: '200px',
        height: '150px',
        pointerEvents: 'none',
        zIndex: 1001
      }}
    >
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
  );
};

export default AddMarker;