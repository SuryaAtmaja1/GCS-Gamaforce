import React, { useState } from "react";
import logoGama from "../assets/logoGama.png"
import { ChevronLeft, ChevronRight, LayoutDashboard, Eye, Map, Settings, LogOut } from 'lucide-react';

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="relative">
      {/* Toggle button */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="static -right-3 top-6 z-10 bg-blue-600 rounded-full p-1 text-white hover:bg-blue-700"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Main sidebar */}
      <div className={`fixed left-0 top-0 h-screen transition-all duration-300 bg-gradient-to-b from-blue-600 to-teal-500 text-white ${
        collapsed ? 'w-20' : 'w-64'
      } p-6`}>
        <div className="flex items-center mb-6">
          <img src="/assets/logoGama.png" alt="Logo" className="w-8 h-8 mr-3"/>
          {!collapsed && <h2 className="text-lg font-semibold">Gamaforce</h2>}
        </div>
        
        <div className="mb-4">
          {!collapsed && <p className="text-sm">Username</p>}
        </div>

        <nav>
          <ul className="space-y-4">
            <li>
              <button className="flex items-center p-2 w-full rounded-md hover:bg-blue-700 transition">
                <LayoutDashboard size={20} />
                {!collapsed && <span className="ml-3">Dashboard</span>}
              </button>
            </li>
            <li>
              <button className="flex items-center p-2 w-full bg-blue-700 rounded-md">
                <Eye size={20} />
                {!collapsed && <span className="ml-3">View</span>}
              </button>
            </li>
            <li>
              <button className="flex items-center p-2 w-full rounded-md hover:bg-blue-700 transition">
                <Map size={20} />
                {!collapsed && <span className="ml-3">Plan</span>}
              </button>
            </li>
            <li>
              <button className="flex items-center p-2 w-full rounded-md hover:bg-blue-700 transition">
                <Settings size={20} />
                {!collapsed && <span className="ml-3">Parameter</span>}
              </button>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-6 left-0 w-full px-6">
          <button className="flex items-center p-2 w-full rounded-md hover:bg-blue-700 transition">
            <LogOut size={20} />
            {!collapsed && <span className="ml-3">Log Out</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;