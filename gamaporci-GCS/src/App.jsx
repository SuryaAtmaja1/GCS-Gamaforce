import "./App.css";
import React, { useState } from "react";
import MapComponent from "./components/MapComponent";
import SideBar from "./components/SideBar";
import LatLonModal from "./components/LatLonModal";
import MissionPopup from "./components/MissionPopUp";
import MarkerTable from "./components/MarkerTable";

function App() {
  const [latLonClick, setLatLonClick] = useState(false);
  const [missionClick, setMissionClick] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: -7.773648529865574,
    lng: 110.37838175455724,
  });
  
  // Add markers state
  const [markers, setMarkers] = useState([]);

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
  };

  const [missions, setMissions] = useState([
    {
      id: 1,
      name: "Misi 1",
      description: "",
      date: getCurrentDate(),
      //path : [[marker 1], [marker n]]
    },
    {
      id: 2,
      name: "Misi 2",
      description: "",
      date: getCurrentDate(),
    },
  ]);

  const handleInputChange = (newCoordinates) => {
    setCoordinates(newCoordinates);
  };

  const handleMissionUpdate = (newMission) => {
    if (newMission.id) {
      // Update existing mission
      setMissions(missions.map(mission => 
        mission.id === newMission.id ? { ...newMission, date: getCurrentDate() } : mission
      ));
    } else {
      // Add new mission
      setMissions([
        ...missions,
        {
          ...newMission,
          id: missions.length + 1,
          date: getCurrentDate()
        }
      ]);
    }
  };

  const handleMissionDelete = (missionId) => {
    setMissions(missions.filter(mission => mission.id !== missionId));
  };

  // Add marker handlers
  const handleMarkersUpdate = (newMarkers) => {
    setMarkers(newMarkers);
  };

  const handleEditMarker = (index, marker) => {
    // You can implement edit functionality here
    // For example, you could set coordinates and open the LatLonModal
    console.log('Edit marker:', index, marker.getLatLng());
  };

  const handleDeleteMarker = (index, marker) => {
    if (window.confirm('Hapus marker ini?')) {
      const updatedMarkers = markers.filter((_, i) => i !== index);
      setMarkers(updatedMarkers);
    }
  };

  return (
    <>
      <div className="flex relative">
        <div className="absolute z-[9999]">
          <SideBar 
            latLonClick={latLonClick} 
            setLatLonClick={setLatLonClick}
            missionClick={missionClick}
            setMissionClick={setMissionClick}
          />
          {latLonClick && (
            <LatLonModal
              setLatLonClick={setLatLonClick}
              coordinates={coordinates}
              onCoordinatesChange={handleInputChange}
            />
          )}
          {missionClick && (
            <MissionPopup
              setMissionClick={setMissionClick}
              missions={missions}
              onMissionUpdate={handleMissionUpdate}
              onMissionDelete={handleMissionDelete}
            />
          )}
        </div>
        <div className="relative w-screen h-screen">
          <MapComponent 
            coordinates={coordinates} 
            markers={markers}
            onMarkersUpdate={handleMarkersUpdate}
          />
          {/* Marker Table */}
          <div className="absolute bottom-4 left-4 right-4 z-[1000]">
            <MarkerTable 
              markers={markers}
              onEditMarker={handleEditMarker}
              onDeleteMarker={handleDeleteMarker}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;