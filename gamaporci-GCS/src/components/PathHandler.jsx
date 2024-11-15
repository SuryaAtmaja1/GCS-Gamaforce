import React, { useState } from 'react';
import { FaSave, FaEdit, FaMapMarked } from 'react-icons/fa';

const PathHandler = ({ markers, selectedMission, onSavePath }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSavePath = () => {
    try {
      if (!selectedMission) {
        alert('Please select a mission first');
        return;
      }

      const path = markers.map(marker => {
        const latLng = marker.getLatLng();
        return {
          lat: latLng.lat,
          lng: latLng.lng
        };
      });

      onSavePath(path);
      setIsEditing(false);
      alert('Path saved successfully!');
    } catch (error) {
      console.error('Error saving path:', error);
      alert('Error saving path. Please try again.');
    }
  };

  return (
    <div className="absolute top-4 right-2 flex flex-col items-end gap-2 z-[1000] p-2 mt-36 ">
      {/* Edit Button */}
      <button
        onClick={() => setIsEditing(!isEditing)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 ${
          isEditing 
            ? 'bg-yellow-500 hover:bg-yellow-600' 
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white`}
        title={isEditing ? 'Cancel editing' : 'Start editing path'}
      >
        <FaEdit />
        <span>{isEditing ? 'Cancel Edit' : 'Edit Path'}</span>
      </button>

      {/* Save Button */}
      {isEditing && (
        <button
          onClick={handleSavePath}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-lg transition-colors duration-200"
          title="Save current path"
        >
          <FaSave />
          <span>Save Path</span>
        </button>
      )}

      {/* Mission Info Badge */}
      <div className="bg-white shadow-lg rounded-lg px-4 py-2 text-sm flex items-center gap-2">
        <FaMapMarked className="text-blue-500" />
        {selectedMission ? (
          <div>
            <span className="font-medium">{selectedMission.name}</span>
            <span className="text-gray-500 ml-2">({markers.length} points)</span>
          </div>
        ) : (
          <span className="text-gray-500">No mission selected</span>
        )}
      </div>
    </div>
  );
};

export default PathHandler;