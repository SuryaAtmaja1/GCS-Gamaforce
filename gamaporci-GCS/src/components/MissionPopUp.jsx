// MissionPopup.jsx
import React, { useState, useMemo } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaTrash, FaSearch, FaMapMarked } from "react-icons/fa";

const MissionPopup = ({ 
  setMissionClick, 
  missions = [], 
  onMissionUpdate, 
  onMissionDelete,
  currentMarkers = [], 
  onLoadMission 
}) => {
  // State untuk misi baru
  const [newMission, setNewMission] = useState({
    name: "",
    description: "",
    date: new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    }),
    path: []
  });
  
  // State untuk pencarian
  const [searchQuery, setSearchQuery] = useState("");

  // Filter misi berdasarkan pencarian
  const filteredMissions = useMemo(() => {
    return missions.filter(mission => 
      mission.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [missions, searchQuery]);

  // Handler untuk menutup modal
  const handleCloseModal = () => {
    try {
      setMissionClick(false);
      setNewMission({
        name: "",
        description: "",
        date: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric'
        }),
        path: []
      });
    } catch (error) {
      console.error('Error closing modal:', error);
    }
  };

  // Handler untuk input form
  const handleInputChange = (e) => {
    try {
      const { name, value } = e.target;
      setNewMission(prev => ({
        ...prev,
        [name]: value,
      }));
    } catch (error) {
      console.error('Error handling input change:', error);
    }
  };

  // Handler untuk input pencarian
  const handleSearchChange = (e) => {
    try {
      setSearchQuery(e.target.value);
    } catch (error) {
      console.error('Error handling search change:', error);
    }
  };

  // Handler untuk memuat misi
  const handleLoadClick = (mission) => {
    try {
      if (onLoadMission) {
        onLoadMission(mission);
      }
    } catch (error) {
      console.error('Error loading mission:', error);
      alert('Error loading mission. Please try again.');
    }
  };

  // Handler untuk submit form
  const handleSubmit = () => {
    try {
      if (newMission.name.trim() === "") {
        alert("Please enter a mission name");
        return;
      }

      // Include current markers' path in the mission
      const missionWithPath = {
        ...newMission,
        path: currentMarkers.map(marker => ({
          lat: marker.getLatLng().lat,
          lng: marker.getLatLng().lng
        }))
      };

      // Create new mission
      onMissionUpdate(missionWithPath);

      // Reset form
      setNewMission({
        name: "",
        description: "",
        date: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric'
        }),
        path: []
      });
    } catch (error) {
      console.error('Error submitting mission:', error);
      alert('Error saving mission. Please try again.');
    }
  };

  // Helper untuk memotong teks
  const truncateText = (text, maxLength = 50) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Handler untuk konfirmasi hapus
  const handleDelete = (missionId) => {
    try {
      if (window.confirm('Are you sure you want to delete this mission?')) {
        onMissionDelete(missionId);
      }
    } catch (error) {
      console.error('Error deleting mission:', error);
      alert('Error deleting mission. Please try again.');
    }
  };

  return (
    <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-[10000]">
      <div className="bg-white p-4 rounded-lg w-[600px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Mission List</h2>
          <IoCloseCircleOutline
            onClick={handleCloseModal}
            className="text-red-500 cursor-pointer"
            size={28}
          />
        </div>

        {/* Form Section */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <h3 className="text-md font-medium text-gray-900 mb-3">Add New Mission</h3>
          <div className="space-y-3">
            {/* Mission Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mission Name
              </label>
              <input
                type="text"
                name="name"
                value={newMission.name}
                onChange={handleInputChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-gray-900 text-sm"
                placeholder="Enter mission name"
              />
            </div>
            
            {/* Description Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={newMission.description}
                onChange={handleInputChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-gray-900 text-sm"
                placeholder="Enter mission description"
                rows="2"
              />
            </div>

            {/* Current Markers Info */}
            <div className="flex items-center text-sm text-gray-600">
              <FaMapMarked className="mr-2" />
              <span>{currentMarkers.length} markers in current path</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-3">
            <button
              onClick={handleSubmit}
              className="px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
            >
              Add Mission
            </button>
          </div>
        </div>

        {/* Mission List Section */}
        <div className="space-y-2">
          {/* Search Bar */}
          <div className="flex justify-between items-center mb-2">
            <div className="relative flex-1 max-w-xs">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search mission..."
                className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-md text-sm"
              />
              <FaSearch className="absolute left-2.5 top-2.5 text-gray-400" size={14} />
            </div>
          </div>

          {/* Missions Table */}
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <div className="max-h-[180px] overflow-y-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Mission Name
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Date
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Markers
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Description
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMissions.map((mission) => (
                    <tr key={mission.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {mission.name}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {mission.date}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {mission.path?.length || 0} points
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900 max-w-[200px]">
                        <div className="truncate" title={mission.description}>
                          {truncateText(mission.description)}
                        </div>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        <div className="flex space-x-2">
                          {/* Load Button */}
                          <button
                            onClick={() => handleLoadClick(mission)}
                            className="text-green-500 hover:text-green-700"
                            title="Load mission markers"
                          >
                            <FaMapMarked size={14} />
                          </button>
                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(mission.id)}
                            className="text-red-500 hover:text-red-700"
                            title="Delete mission"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {/* Empty State */}
                  {filteredMissions.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-4 py-4 text-sm text-gray-500 text-center">
                        No missions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionPopup;