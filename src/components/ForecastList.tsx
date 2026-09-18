import type { ForecastData } from "../types/weather";

type ForecastListProps = {
  forecastData: ForecastData | null;
};

const ForecastList = ({ forecastData }: ForecastListProps) => {
  if (!forecastData) {
    return <p>No forecast data available</p>;
  }

  const dailyForecast = forecastData.list.filter((item, index, array) => {
    const date = item.dt_txt.split(" ")[0];

    return (
      index ===
      array.findIndex((forecast) => forecast.dt_txt.split(" ")[0] === date)
    );
  });

  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-bold mb-4">5 Day Forecast</h2>
      <div className="flex flex-col gap-3">
        {dailyForecast.slice(0, 5).map((day) => (
          <div
            key={day.dt}
            className="flex justify-between items-center bg-white/20 p-4 rounded-xl shadow-md"
          >
            <p>
              {new Date(day.dt_txt).toLocaleDateString("en-US", {
                weekday: "long",
              })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
            />
            <p>{Math.round(day.main.temp)}°C</p>
            <p>{day.weather[0].main}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastList;
