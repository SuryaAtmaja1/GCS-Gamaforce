import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { FaMap } from "react-icons/fa";

const SideBar = ({ onCoordinatesChange, latLonClick, setLatLonClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: "-7.773648529865574",
    lng: "110.37838175455724",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const handleLatLonOpen = () => {
      setLatLonClick(true);
    };

    // Hanya izinkan input angka, minus, dan titik
    if (/^-?\d*\.?\d*$/.test(value) || value === "") {
      const newCoordinates = {
        ...coordinates,
        [name]: value,
      };

      setCoordinates(newCoordinates);

      // Konversi ke float saat mengirim ke parent component
      onCoordinatesChange({
        ...newCoordinates,
        [name]: parseFloat(value) || 0,
      });
    }
  };

  return (
    <div className="fixed left-0 top-0 h-screen flex">
      <div
        className={`
          h-full 
          transition-all 
          duration-300 
          bg-gradient-to-b 
          from-blue-600 
          to-teal-500 
          text-white
          ${isOpen ? "w-64" : "w-20"}
          p-6
        `}
      >
        <div className="flex items-center mb-6">
          <img
            src="/src/assets/logoGama.png"
            alt="Logo"
            className="w-8 h-8 mr-3"
          />
          {isOpen && (
            <a
              href="https://gamaforce.wg.ugm.ac.id/"
              className="text-lg font-semibold"
            >
              Gamaforce
            </a>
          )}
        </div>

        <nav>
          <ul className="space-y-4">
            <li>
              <button className="flex items-center p-2 w-full rounded-md hover:bg-blue-700 transition">
                <FaUsers size={20} />
                {isOpen && (
                  <a
                    href="https://gamaforce.wg.ugm.ac.id/about-us/"
                    className="ml-3"
                  >
                    About Us
                  </a>
                )}
              </button>
            </li>

            {isOpen && (
              <li className="space-y-2">
                <div className="p-2">
                  <label className="block text-sm font-medium mb-1">
                    Latitude:
                  </label>
                  <input
                    type="text"
                    name="lat"
                    value={coordinates.lat}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 rounded text-black text-sm"
                    placeholder="Enter Latitude"
                  />
                </div>
                <div className="p-2">
                  <label className="block text-sm font-medium mb-1">
                    Longitude:
                  </label>
                  <input
                    type="text"
                    name="lng"
                    value={coordinates.lng}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 rounded text-black text-sm"
                    placeholder="Enter longitude"
                  />
                </div>
              </li>
            )}
            <li>
              <button
                onClick={setLatLonClick}
                className="flex items-center p-2 w-full rounded-md hover:bg-blue-700 transition"
              >
                <FaMap size={20} />
                {isOpen && <p className="ml-3">Set Lat & Lon</p>}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-6 bg-blue-600 rounded-full p-1 text-white hover:bg-blue-700"
      >
        {isOpen ? <MdChevronLeft size={16} /> : <MdChevronRight size={16} />}
      </button>
    </div>
  );
};

export default SideBar;
