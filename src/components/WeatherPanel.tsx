type WeatherPanelProps = {
  temperature: number | string;
  city: string;
  condition: string;
  date: string;
  icon: string;
};

const WeatherPanel = ({
  city,
  temperature,
  date,
  condition,
  icon,
}: WeatherPanelProps) => {
  return (
    <div className=" h-full flex flex-col items-start justify-end gap-4 p-10">
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={condition} className="w-20 h-20" />
      <p className="text-7xl">{temperature}°</p>
      <p className="text-4xl">{city}</p>
      <p className="text-2xl">{condition}</p>
      <p className="text-lg">{date}</p>
    </div>
  );
};

export default WeatherPanel;
