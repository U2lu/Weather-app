const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
import type { WeatherData, ForecastData } from "../types/weather";

export const getWeatherData = async (city: string): Promise<WeatherData> => {
  const response = await fetch(
    `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = (await response.json()) as WeatherData;
  return data;
};

export const getForecastData = async (city: string): Promise<ForecastData> => {
  const response = await fetch(
    `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`,
  );
  if (!response.ok) {
    throw new Error("Could not fetch forecast");
  }

  const data = (await response.json()) as ForecastData;
  return data;
};

/*
export const fetchWeatherData = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};*/
