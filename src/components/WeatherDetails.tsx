type WeatherDetailsProps = {
  humidity: number;
  wind_speed: number;
  max_temp: number;
  min_temp: number;
};

const WeatherDetails = ({
  humidity,
  wind_speed,
  max_temp,
  min_temp,
}: WeatherDetailsProps) => {
  return (
    <div className="flex flex-col gap-6 items-center p-4">
      <p className="text-xl font-bold">Weather Details</p>
      <p className="text-lg">Humidity: {humidity}%</p>
      <p className="text-lg">WInd Speed: {wind_speed}km/h</p>
      <p className="text-lg">Max Temp: {max_temp}°</p>
      <p className="text-lg">Min Temp: {min_temp}°</p>
    </div>
  );
};

export default WeatherDetails;
