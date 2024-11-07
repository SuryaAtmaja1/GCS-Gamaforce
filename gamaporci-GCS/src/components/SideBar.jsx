import React, { useState } from "react";
import logoGama from "../assets/logoGama.png"
import { ChevronLeft, ChevronRight, LayoutDashboard, Eye, Map, Settings, LogOut } from 'lucide-react';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          <img src="/api/placeholder/32/32" alt="Logo" className="w-8 h-8 mr-3"/>
          {isOpen && <h2 className="text-lg font-semibold">Gamaforce</h2>}
        </div>
        
        <div className="mb-4">
          {isOpen && <p className="text-sm">Username</p>}
        </div>

        <nav>
          <ul className="space-y-4">
            <li>
              <button className="flex items-center p-2 w-full rounded-md hover:bg-blue-700 transition">
                <LayoutDashboard size={20} />
                {isOpen && <span className="ml-3">Dashboard</span>}
              </button>
            </li>
            <li>
              <button className="flex items-center p-2 w-full bg-blue-700 rounded-md">
                <Eye size={20} />
                {isOpen && <span className="ml-3">View</span>}
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
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-6 left-0 w-full px-6">
          <button className="flex items-center p-2 w-full rounded-md hover:bg-blue-700 transition">
            <LogOut size={20} />
            {isOpen && <span className="ml-3">Log Out</span>}
          </button>
        </div>
      </div>

      {/* Toggle button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-6 bg-blue-600 rounded-full p-1 text-white hover:bg-blue-700"
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
    </div>
  );
};

export default SideBar;