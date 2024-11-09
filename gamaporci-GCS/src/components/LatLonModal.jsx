import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const LatLonModal = ({ setLatLonClick }) => {
  const handleCloseModal = () => {
    setLatLonClick(false);
  };

  return (
    <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-[10000]">
      <div className="w-1/4 h-1/4 bg-white p-4 rounded-lg flex justify-between">
        <h2 className="text-lg font-semibold mb-4 text-black">
          Set Latitude & Longitude
        </h2>
        <IoCloseCircleOutline
          onClick={handleCloseModal}
          className="text-red-500"
          size={35}
        />
      </div>
      z
    </div>
  );
};

export default LatLonModal;
