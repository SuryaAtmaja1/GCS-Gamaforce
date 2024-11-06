import "./App.css";
import MapComponent from "./components/MapComponent";
import SideBar from "./components/SideBar";

function App() {
  return (
    <>
      <div className="overflow-hidden">
        <MapComponent /> 
      </div>
      <div className="pl-64">
        <SideBar />
      </div>
    </>
  );
}

export default App;
