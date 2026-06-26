type Main = {
  temp: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
};

type Wind = {
  speed: number;
};

type WeatherCondition = {
  main: string;
  description: string;
  icon: string;
};

export type WeatherData = {
  name: string;
  main: Main;
  wind: Wind;
  weather: WeatherCondition[];
};
