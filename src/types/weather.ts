type Main = {
  temp: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
};

type Wind = {
  speed: number;
};

export type WeatherCondition = {
  main: string;
  description: string;
  icon: string;
};

type ForecastItem = {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: WeatherCondition[];
};

export type ForecastData = {
  list: ForecastItem[];
};

export type WeatherData = {
  name: string;
  main: Main;
  wind: Wind;
  weather: WeatherCondition[];
};
