import "./App.css";
import React, { useState } from "react";
import MapComponent from "./components/MapComponent";
import SideBar from "./components/SideBar";
import LatLonModal from "./components/LatLonModal";

function App() {
  const [latLonClick, setLatLonClick] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: -7.773648529865574,
    lng: 110.37838175455724,
  });
  const handleInputChange = (newCoordinates) => {
    setCoordinates(newCoordinates);
  };
  return (
    <>
      <div className="flex relative">
        <div className="absolute z-[1001]">
          <SideBar latLonClick={latLonClick} setLatLonClick={setLatLonClick} />
          {latLonClick && (
            <LatLonModal
              setLatLonClick={setLatLonClick}
              coordinates={coordinates}
              onCoordinatesChange={handleInputChange}
            />
          )}
        </div>
        <MapComponent coordinates={coordinates} />
      </div>
    </>
  );
}

export default App;
