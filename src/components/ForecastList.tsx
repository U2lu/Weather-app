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

  return( 
    <div>
      <h2>5 Day Forecast</h2>

      {dailyForecast.slice(0, 5).map((day) => (
        <div key={day.dt}>
          <p>{day.dt_txt.split(" ")[0]}</p>
          <p>{day.main.temp}°C</p>
          <p>{day.weather[0].main}</p>
        </div>
      ))}
    </div>
  );
};

export default ForecastList;
