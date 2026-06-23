import SearchBar from "./components/SearchBar";
import WeatherDetails from "./components/WeatherDetails";
import WeatherPanel from "./components/WeatherPanel";

const App = () => {
  return (
    <div className="flex h-screen bg-blue-400 text-white">
      <div className="w-2/3 font-bold">
        <WeatherPanel />
      </div>

      <div className="w-1/3 items-center flex flex-col outline">
        <SearchBar />
        <WeatherDetails />
      </div>
    </div>
  );
};

export default App;
