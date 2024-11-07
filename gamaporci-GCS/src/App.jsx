import "./App.css";
import MapComponent from "./components/MapComponent";
import SideBar from "./components/SideBar";

function App() {
  return (
    <>
      <div className="overflow-hidden relative">
        <MapComponent />
        <div className="z-[9999] absolute left-0 top-0 ">
          <SideBar />
        </div>
      </div>
    </>
  );
}

export default App;
