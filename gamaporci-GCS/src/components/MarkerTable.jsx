import React from "react";
import { FaTrash } from "react-icons/fa";

const MarkerTable = ({ markers }) => {
  const handleDelete = (index) => {
    if (window.confirm("Hapus marker ini?")) {
      if (window.deleteMarker) {
        window.deleteMarker(index);
      }
    }
  };

  return (
    <div className="absolute bottom-2 right-2 w-52 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="max-h-32 overflow-y-auto">
        <table className="w-full divide-y divide-gray-200 text-xs">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="w-6 py-1 text-center font-medium text-gray-500">
                NO
              </th>
              <th className="py-1 text-left font-medium text-gray-500">
                LAT
              </th>
              <th className="py-1 text-left font-medium text-gray-500">
                LONG
              </th>
              <th className="w-6 py-1 text-center font-medium text-gray-500">
                DEL
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {markers.map((marker, index) => {
              const latLng = marker.getLatLng();
              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-1 text-center text-gray-900">
                    {index + 1}
                  </td>
                  <td className="py-1 pl-1 whitespace-nowrap text-gray-500">
                    {latLng.lat.toFixed(4)}
                  </td>
                  <td className="py-1 pl-1 whitespace-nowrap text-gray-500">
                    {latLng.lng.toFixed(4)}
                  </td>
                  <td className="py-1 text-center">
                    <button
                      onClick={() => handleDelete(index, marker)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete marker"
                    >
                      <FaTrash className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              );
            })}
            {markers.length === 0 && (
              <tr>
                <td colSpan="4" className="px-2 py-1 text-center text-gray-500">
                  No markers yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarkerTable;