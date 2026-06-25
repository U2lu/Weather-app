import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDetails from "./components/WeatherDetails";
import WeatherPanel from "./components/WeatherPanel";

function App() {
  const [city, setCity] = useState("");

  const handleSubmit = () => {
    console.log(city);
  };

  return (
    <div className="flex h-screen bg-blue-400 text-white">
      <div className="w-2/3 font-extrabold">
        <WeatherPanel
          city={city}
          temperature={25}
          condition="Cloudy"
          date="24th, June 2026"
        />
      </div>

      <div className="w-1/3 items-center flex flex-col outline">
        <SearchBar city={city} setCity={setCity} onSubmit={handleSubmit} />
        <WeatherDetails
          humidity={50}
          wind_speed={10}
          max_temp={40}
          min_temp={20}
        />
        {/* <button onClick={() => setcity("Abuja")} className="bg-black">Button</button> (I was testing usestate here)*/}
      </div>
    </div>
  );
}

export default App;
