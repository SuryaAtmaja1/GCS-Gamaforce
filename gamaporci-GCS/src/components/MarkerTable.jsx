import React from 'react';
import { FaTrash } from 'react-icons/fa'; 
// Mengimpor ikon FaTrash dari react-icons


//deklarasi komponen fungsi yaitu markertable yang nantinya menerima marker onedit dll
//merker itu array yang nanti di tampilkan dalamnya
//oneditmarker itu ga guna tapi dia buat edit markernya
//ondelete marker ni jga ga guna tapi dia buat hapus marker 
const MarkerTable = ({ markers, onEditMarker, onDeleteMarker }) => {
  //deklarasi klo handel delete itu dia nanti ngapain 
  const handleDelete = (index, marker) => {
    if (window.confirm('Hapus marker ini?')) {
      // Memanggil fungsi deleteMarker yang diekspos dari AddMarker
      if (window.deleteMarker) {
        window.deleteMarker(index);
      }
    }
  };

  //bentuknya di sini ya
  return (
    <div className="absolute bottom-0 right-0 w-1/3 bg-transparent overflow-hidden">
      <div className="max-h-36 overflow-y-auto bg-transparent">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                No
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Lat
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Long
              </th>
              <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-10">
                Del
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* dia nampilin si datanya itu gimana nanti lewat sini
            dia pakai map utnuk iterasi si array markersnya itu  */}
            {markers.map((marker, index) => {
              // dia nanti mengambil koordinat lat dan long denga  marker.getlatlng()
              const latLng = marker.getLatLng();
              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                    {latLng.lat.toFixed(5)}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                    {latLng.lng.toFixed(5)}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleDelete(index, marker)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete marker"
                    >
                      <FaTrash className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
            {markers.length === 0 && (
              <tr>
                <td colSpan="4" className="px-3 py-2 text-center text-xs text-gray-500">
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