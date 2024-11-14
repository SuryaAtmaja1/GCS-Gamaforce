import React, { useState, useMemo } from "react";
//impor dari react icon untuk icon di side bar
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";


//deklarasi mission popup 
//set misi untuk clode modal
//missions itu array dari missi yang udah ada deaflutnya array kosong tapi disini ku edit agar dia bisa nampilin array lat lng yang dibutuihn untuk load file nantinyaa
//on mission update ya update dan delete ya untuk delete
const MissionPopup = ({ setMissionClick, missions = [], onMissionUpdate, onMissionDelete }) => {
  const [newMission, setNewMission] = useState({
    //seharusnya nanti di gabungin sama backend untuk save dan load file misi
    name: "",
    description: "",
    //dengan nama month dan yearnya dibuat auto tanpa perlu diinputkan satu satu
    //dengan local data string sebagai salam satu format
    date: new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    })
  });
  
  //deklarasi serch query
  const [searchQuery, setSearchQuery] = useState("");
  const [editMode, setEditMode] = useState(null);

  // Filter missions based on search query
  //pakai use memo agar optimal
  const filteredMissions = useMemo(() => {
    return missions.filter(mission =>     mission.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [missions, searchQuery]);

  //reset edit dan close modal
  const handleCloseModal = () => {
    setEditMode(null);
    setMissionClick(false);
  };

  //untuk new mission
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMission({
      ...newMission,
      [name]: value,
    });
  };

  //nah si query kepake disini
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  //edit misi yang sebelumnya udah ada disini
  const handleEditClick = (mission) => {
    setEditMode(mission.id);
    setNewMission({
      id: mission.id,
      name: mission.name,
      description: mission.description || "",
      date: mission.date
    });
  };

  // untuk deskripsi misi jika dia lebih dari 50 karakter dia akan .... gitu
  const truncateText = (text, maxLength = 50) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  //untuk submit si misinya
  const handleSubmit = () => {
    if (newMission.name.trim() === "") {
      alert("Please enter a mission name");
      return;
    }

    // ini kalau edit
    if (editMode) {
      onMissionUpdate({
        ...newMission,
        id: editMode
      });
      setEditMode(null);
    } else {
      onMissionUpdate(newMission);
    }

    // ini kalau buat
    setNewMission({
      name: "",
      description: "",
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      })
    });
  };

  return (
    //semuanya untuk bentuknya aja
    <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-[10000]">
      <div className="bg-white p-4 rounded-lg w-[600px]">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">
            {editMode ? 'Edit Mission' : 'Mission List'}
          </h2>
          <IoCloseCircleOutline
            onClick={handleCloseModal}
            className="text-red-500 cursor-pointer"
            size={28}
          />
        </div>

        {/* Input Section */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <h3 className="text-md font-medium text-black mb-3">
            {editMode ? 'Edit Mission' : 'Add New Mission'}
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mission Name
              </label>
              <input
                type="text"
                name="name"
                value={newMission.name}
                onChange={handleInputChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-white text-sm"
                placeholder="Enter mission name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={newMission.description}
                onChange={handleInputChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-white text-sm"
                placeholder="Enter mission description"
                rows="2"
              />
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <button
              onClick={handleSubmit}
              className="px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
            >
              {editMode ? 'Update Mission' : 'Add Mission'}
            </button>
          </div>
        </div>

        {/* Search and Table Section */}
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

          {/* Table */}
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
                      <td className="px-4 py-2 text-sm text-gray-900 max-w-[200px]">
                        <div className="truncate" title={mission.description}>
                          {truncateText(mission.description)}
                        </div>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => onMissionDelete(mission.id)}
                            className="text-red-500 hover:text-red-700"
                            title="Delete mission"
                          >
                            <FaTrash size={14} />
                          </button>
                          <button
                            onClick={() => handleEditClick(mission)}
                            className="text-blue-500 hover:text-blue-700"
                            title="Edit mission"
                          >
                            <FaEdit size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
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