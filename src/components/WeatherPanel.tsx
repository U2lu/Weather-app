type WeatherPanelProps = {
  temperature: number;
  city: string;
  condition: string;
  date: string;
};

const WeatherPanel = ({
  city,
  temperature,
  date,
  condition,
}: WeatherPanelProps) => {
  return (
    <div className=" h-full flex flex-col items-start justify-end gap-4 p-10">
      <p className="text-7xl">{temperature}°</p>
      <p className="text-4xl">{city}</p>
      <p className="text-2xl">{condition}</p>
      <p className="text-lg">{date}</p>
    </div>
  );
};

export default WeatherPanel;
