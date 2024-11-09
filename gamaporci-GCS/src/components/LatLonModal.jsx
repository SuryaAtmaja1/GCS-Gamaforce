import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const LatLonModal = ({ setLatLonClick, coordinates, onCoordinatesChange }) => {
  const handleCloseModal = () => {
    setLatLonClick(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (/^-?\d*\.?\d*$/.test(value) || value === "") {
      onCoordinatesChange({
        ...coordinates,
        [name]: parseFloat(value) || 0,
      });
    }
  };

  return (
    <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-[10000]">
      <div className="w-1/4 h-1/4 bg-white p-4 rounded-lg">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mb-4 text-black">
            Set Latitude & Longitude
          </h2>
          <IoCloseCircleOutline
            onClick={handleCloseModal}
            className="text-red-500 cursor-pointer"
            size={35}
          />
        </div>
        <div>
          <ul>
            <li className="space-y-2">
              <div className="p-2">
                <label className="block text-sm text-black font-medium mb-1">
                  Latitude:
                </label>
                <input
                  type="text"
                  name="lat"
                  value={coordinates.lat}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1 rounded text-white text-sm"
                  placeholder="Enter Latitude"
                />
              </div>
              <div className="p-2">
                <label className="block text-sm text-black font-medium mb-1">
                  Longitude:
                </label>
                <input
                  type="text"
                  name="lng"
                  value={coordinates.lng}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1 rounded text-white text-sm"
                  placeholder="Enter Longitude"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LatLonModal;
