import React, { useState } from 'react';
import { FaSave, FaEdit } from 'react-icons/fa';

const PathHandler = ({ markers, selectedMission, onSavePath }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Handler untuk menyimpan path
  const handleSavePath = () => {
    try {
      if (!selectedMission) {
        alert('Please select a mission first');
        return;
      }

      // Konversi marker ke format path
      const path = markers.map(marker => {
        const latLng = marker.getLatLng();
        return {
          lat: latLng.lat,
          lng: latLng.lng
        };
      });

      // Panggil fungsi onSavePath dengan path baru
      onSavePath(path);
      setIsEditing(false);
      alert('Path saved successfully!');
    } catch (error) {
      console.error('Error saving path:', error);
      alert('Error saving path. Please try again.');
    }
  };

  return (
    <div className="fixed top-20 right-4 flex flex-col gap-2 z-[1000]">
      {/* Edit Button */}
      <button
        onClick={() => setIsEditing(!isEditing)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg ${
          isEditing 
            ? 'bg-yellow-500 hover:bg-yellow-600' 
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white`}
      >
        <FaEdit />
        <span>{isEditing ? 'Cancel Edit' : 'Edit Path'}</span>
      </button>

      {/* Save Button - hanya muncul saat editing */}
      {isEditing && (
        <button
          onClick={handleSavePath}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-lg"
        >
          <FaSave />
          <span>Save Path</span>
        </button>
      )}

      {/* Status Indikator */}
      <div className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
        {selectedMission ? (
          <>
            <div>Current Mission: {selectedMission.name}</div>
            <div>Markers: {markers.length}</div>
          </>
        ) : (
          <div>No mission selected</div>
        )}
      </div>
    </div>
  );
};

export default PathHandler;