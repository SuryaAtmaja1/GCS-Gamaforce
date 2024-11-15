import "./App.css";
import React, { useState, useEffect } from "react";
import L from "leaflet";
import MapComponent from "./components/MapComponent";
import SideBar from "./components/SideBar";
import LatLonModal from "./components/LatLonModal";
import MissionPopup from "./components/MissionPopUp";
import MarkerTable from "./components/MarkerTable";
import PathHandler from "./components/PathHandler";

function App() {
  // State Management
  const [latLonClick, setLatLonClick] = useState(false);
  const [missionClick, setMissionClick] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: -7.773648529865574,
    lng: 110.37838175455724,
  });

  const [markers, setMarkers] = useState([]);
  const [selectedMission, setSelectedMission] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize custom marker icon
  const customIcon = L.divIcon({
    className: "custom-div-icon",
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
    popupAnchor: [0, -7.5],
  });

  // Helper function to get current date
  const getCurrentDate = () => {
    return new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };

  // Initialize missions state from localStorage or defaults
  const [missions, setMissions] = useState(() => {
    try {
      const savedMissions = localStorage.getItem("missions");
      if (savedMissions) {
        return JSON.parse(savedMissions);
      }
    } catch (error) {
      console.error("Error loading missions from localStorage:", error);
    }
    // Default missions if none in localStorage
    return [
      {
        id: 1,
        name: "Misi 1",
        description: "",
        date: getCurrentDate(),
        path: [],
        originalCreationDate: getCurrentDate(),
      },
      {
        id: 2,
        name: "Misi 2",
        description: "",
        date: getCurrentDate(),
        path: [],
        originalCreationDate: getCurrentDate(),
      },
    ];
  });

  // Handler untuk menyimpan path yang diupdate
  const handleSavePath = (newPath) => {
    try {
      if (!selectedMission) return;

      // Update missions dengan path baru
      const updatedMissions = missions.map((mission) => {
        if (mission.id === selectedMission.id) {
          return {
            ...mission,
            path: newPath,
            date: getCurrentDate(),
          };
        }
        return mission;
      });

      // Update state
      setMissions(updatedMissions);
      setSelectedMission({
        ...selectedMission,
        path: newPath,
      });

      // Simpan ke localStorage
      localStorage.setItem("missions", JSON.stringify(updatedMissions));
    } catch (error) {
      console.error("Error saving path:", error);
      alert("Error saving path. Please try again.");
    }
  };

  // Handler for coordinate input changes
  const handleInputChange = (newCoordinates) => {
    try {
      setCoordinates(newCoordinates);
    } catch (error) {
      console.error("Error updating coordinates:", error);
      alert("Error updating coordinates. Please try again.");
    }
  };

  const handleLoadMission = async (mission) => {
    try {
      setIsLoading(true);

      // Step 1: Clear existing markers
      setMarkers([]); // Clear previous markers

      // Step 2: Wait a moment before adding new markers to ensure state update completes
      setTimeout(() => {
        if (mission.path && mission.path.length > 0) {
          // Create new markers from mission path
          const newMarkers = mission.path.map((point) => {
            const marker = new L.Marker([point.lat, point.lng], {
              draggable: true,
              icon: customIcon,
            });

            // Add dragend event listener
            marker.on("dragend", () => {
              setMarkers((currentMarkers) => [...currentMarkers]);
            });

            // Add popup with coordinates
            marker.bindPopup(
              `Lat: ${point.lat.toFixed(5)}<br>Lng: ${point.lng.toFixed(5)}`
            );

            return marker;
          });

          // Step 3: Update markers and selected mission
          setMarkers(newMarkers);
          setSelectedMission(mission);

          // Center map on the first marker
          setCoordinates({
            lat: mission.path[0].lat,
            lng: mission.path[0].lng,
          });
        } else {
          setSelectedMission(mission);
        }
      }, 100); // Adjust the timeout delay as needed (100ms is often enough)
    } catch (error) {
      console.error("Error loading mission:", error);
      alert("Error loading mission. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for updating a mission
  const handleMissionUpdate = (newMission) => {
    try {
      setIsLoading(true);

      // Convert current markers to path format
      const path = markers.map((marker) => {
        const latLng = marker.getLatLng();
        return {
          lat: latLng.lat,
          lng: latLng.lng,
        };
      });

      const missionWithPath = {
        ...newMission,
        path: path,
      };

      if (newMission.id) {
        // Update existing mission
        setMissions(
          missions.map((mission) =>
            mission.id === newMission.id
              ? {
                  ...missionWithPath,
                  date: getCurrentDate(),
                  originalCreationDate: mission.originalCreationDate,
                }
              : mission
          )
        );

        // Update selectedMission if it's being edited
        if (selectedMission?.id === newMission.id) {
          setSelectedMission(missionWithPath);
        }
      } else {
        // Add new mission
        const newMissionWithId = {
          ...missionWithPath,
          id: missions.length + 1,
          date: getCurrentDate(),
          originalCreationDate: getCurrentDate(),
        };
        setMissions((prevMissions) => [...prevMissions, newMissionWithId]);
      }

      // Show success message
      alert("Mission saved successfully!");
    } catch (error) {
      console.error("Error updating mission:", error);
      alert("Error saving mission. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for deleting a mission
  const handleMissionDelete = (missionId) => {
    try {
      if (window.confirm("Are you sure you want to delete this mission?")) {
        setMissions((prevMissions) =>
          prevMissions.filter((mission) => mission.id !== missionId)
        );

        // Clear markers if deleted mission was selected
        if (selectedMission?.id === missionId) {
          setMarkers([]);
          setSelectedMission(null);
        }
      }
    } catch (error) {
      console.error("Error deleting mission:", error);
      alert("Error deleting mission. Please try again.");
    }
  };

  // Handler for updating markers
  const handleMarkersUpdate = (newMarkers) => {
    try {
      setMarkers(newMarkers);
    } catch (error) {
      console.error("Error updating markers:", error);
    }
  };

  // Save missions to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("missions", JSON.stringify(missions));
    } catch (error) {
      console.error("Error saving missions to localStorage:", error);
    }
  }, [missions]);

  return (
    <>
      <div className="flex relative">
        {/* Sidebar and Modals */}
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
              currentMarkers={markers}
              onLoadMission={handleLoadMission}
            />
          )}
        </div>

        {/* Main Content */}
        <div className="relative w-screen h-screen">
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 z-[9998] flex items-center justify-center">
              <div className="text-white text-lg">Loading...</div>
            </div>
          )}

          {/* Map Component */}
          <MapComponent
            coordinates={coordinates}
            markers={markers}
            onMarkersUpdate={handleMarkersUpdate}
            selectedMission={selectedMission}
            customIcon={customIcon}
          />

          {/* Path Handler Component */}
          <PathHandler
            markers={markers}
            selectedMission={selectedMission}
            onSavePath={handleSavePath}
          />

          {/* Marker Table */}
          <div className="absolute bottom-4 left-4 right-4 z-[1000]">
            <MarkerTable markers={markers} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
