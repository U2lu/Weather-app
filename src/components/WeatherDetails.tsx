const WeatherDetails = () => {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-xl font-bold">Weather Details</p>
      <p className="text-lg">Humidity: 50%</p>
      <p className="text-lg">Wind Speed: 10 km/h</p>
      <p className="text-lg">Max Temp: 30°C</p>
      <p className="text-lg">Min Temp: 20°C</p>
    </div>
  );
};

export default WeatherDetails;
