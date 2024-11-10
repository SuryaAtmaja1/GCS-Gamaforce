import "./App.css";
import React, { useState } from "react";
import MapComponent from "./components/MapComponent";
import SideBar from "./components/SideBar";
import LatLonModal from "./components/LatLonModal";
import MissionPopup from "./components/MissionPopUp";

function App() {
  const [latLonClick, setLatLonClick] = useState(false);
  const [missionClick, setMissionClick] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: -7.773648529865574,
    lng: 110.37838175455724,
  });

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

  return (
    <>
      <div className="flex relative">
        <div className="absolute z-[1001]">
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
        <MapComponent coordinates={coordinates} />
      </div>
    </>
  );
}

export default App;