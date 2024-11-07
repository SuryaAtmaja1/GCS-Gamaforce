import React, { useState } from "react";
import logoGama from "../assets/logoGama.png"
import { RiDashboardLine } from "react-icons/ri";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: -7.773648529865574,
    lng: 110.37838175455724,
  });

  

  return (
    <div className="fixed left-0 top-0 h-screen flex">
      {/* Main sidebar */}
      <div 
        className={`
          h-full 
          transition-all 
          duration-300 
          bg-gradient-to-b 
          from-blue-600 
          to-teal-500 
          text-white
          ${isOpen ? 'w-64' : 'w-20'}
          p-6
        `}
      >
        <div className="flex items-center mb-6">
          <img src="/src/assets/logoGama.png" alt="Logo" className="w-8 h-8 mr-3"/>
          {isOpen && <a href="https://gamaforce.wg.ugm.ac.id/" className="text-lg font-semibold">Gamaforce</a>}
        </div>
        
        {/* <div className="mb-4">
          {isOpen && <FaUsers>
            tesss
            </FaUsers>}
        </div> */}

        <nav>
          <ul className="space-y-4">
            <li>
              <button className="flex items-center p-2 w-full rounded-md hover:bg-blue-700 transition">
                <FaUsers size={20} />
                {isOpen && <a href="https://gamaforce.wg.ugm.ac.id/about-us/" className="ml-3"> About Us</a>} 
                {/* gsnti pan jdi <a href=""></a> */}
              </button>
            </li>

            {/* input koordinat */}
            {isOpen && (
              <li className="space-y-2">
                <div className="p-2">
                  <label className="block text-sm font-medium mb-1">
                    Latitude: 
                  </label>
                  <input 
                  type="number" 
                  step="any" 
                  name="lat"
                  value={coordinates}
                  >
                  </input>
                </div>
              </li>
            )

            }

            {/* <li>
              <button className="flex items-center p-2 w-full bg-blue-700 rounded-md">
                <Eye size={20} />
                {isOpen && <span className="ml-3"></span>}
              </button>
            </li>
            <li>
              <button className="flex items-center p-2 w-full rounded-md hover:bg-blue-700 transition">
                <Map size={20} />
                {isOpen && <span className="ml-3">Plan</span>}
              </button>
            </li>
            <li>
              <button className="flex items-center p-2 w-full rounded-md hover:bg-blue-700 transition">
                <Settings size={20} />
                {isOpen && <span className="ml-3">Parameter</span>}
              </button>
            </li> */}
          </ul>
        </nav>

        {/* <div className="absolute bottom-6 left-0 w-full px-6">
          <button className="flex items-center p-2 w-full rounded-md hover:bg-blue-700 transition">
            <LogOut size={20} />
            {isOpen && <span className="ml-3">Log Out</span>}
          </button>
        </div> */}
      </div>

      {/* Toggle button */}
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