import "./App.css";
import MapComponent from "./components/MapComponent";
import SideBar from "./components/SideBar";
import AddMarker from "./components/AddMarker";

function App() {
  return (
    <>
      <div className="overflow-hidden relative">
        <MapComponent />
        <div className="z-[999] absolute">
          <SideBar />
        </div>
        <div className="z-[999] absolute ">
          <AddMarker />
        </div>
      </div>
    </>
  );
}

export default App;
