import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDetails from "./components/WeatherDetails";
import WeatherPanel from "./components/WeatherPanel";
import { getWeatherData } from "./services/api";
import type { WeatherData } from "./types/weather";

function App() {
  const [city, setCity] = useState("");

  const [weatherData, setWeatherData] = useState<null | WeatherData>(null);

  const handleSubmit = async () => {
    const data = await getWeatherData(city);
    setWeatherData(data);
    console.log(weatherData);
  };

  return (
    <div className="flex h-screen bg-blue-400 text-white">
      <div className="w-2/3 font-extrabold">
        <WeatherPanel
          city={weatherData?.name ?? "--"}
          temperature={weatherData?.main?.temp ?? "--"}
          condition={weatherData?.weather[0]?.main ?? "--"}
          date={new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        />
      </div>

      <div className="w-1/3 items-center flex flex-col outline">
        <SearchBar city={city} setCity={setCity} onSubmit={handleSubmit} />
        <WeatherDetails
          humidity={weatherData?.main?.humidity ?? 0}
          wind_speed={weatherData?.wind?.speed ?? 0}
          max_temp={weatherData?.main?.temp_max ?? 0}
          min_temp={weatherData?.main?.temp_min ?? 0}
        />
        {/* <button onClick={() => setcity("Abuja")} className="bg-black">Button</button> (I was testing usestate here)*/}
      </div>
    </div>
  );
}

export default App;
