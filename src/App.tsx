import { useRef, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDetails from "./components/WeatherDetails";
import WeatherPanel from "./components/WeatherPanel";
import ForecastList from "./components/ForecastList";
import { getWeatherData, getForecastData } from "./services/api";
import type { WeatherData, ForecastData } from "./types/weather";
import bgImage from "./assets/1.jpg";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const SUGGESTED_CITIES = ["London", "Tokyo", "New York", "Lagos"];

const EmptyState = ({
  onSelectCity,
}: {
  onSelectCity: (city: string) => void;
}) => (
  <div className="content-enter flex flex-1 flex-col items-center justify-center gap-3 py-14 text-center">
    <div className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white/50">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-6"
        aria-hidden="true"
      >
        <path d="M12 21s7-5.686 7-11a7 7 0 1 0-14 0c0 5.314 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    </div>
    <p className="text-sm font-medium text-white/70">No city selected</p>
    <p className="max-w-[24ch] text-sm leading-relaxed text-pretty text-white/55">
      Search above, or start with one of these.
    </p>

    <div className="mt-2 flex flex-wrap justify-center gap-2">
      {SUGGESTED_CITIES.map((suggestion) => (
        <button
          key={suggestion}
          type="button"
          onClick={() => onSelectCity(suggestion)}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 transition-[transform,background-color,border-color,color] duration-150 ease-out hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 active:scale-[0.97]"
        >
          {suggestion}
        </button>
      ))}
    </div>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div
    role="alert"
    className="content-enter flex items-start gap-3 rounded-2xl border border-rose-400/20 bg-rose-500/10 p-4 text-sm leading-relaxed break-words text-rose-100/80"
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 size-4 shrink-0"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
    <p>{message}</p>
  </div>
);

const LoadingState = () => (
  <div className="flex flex-col gap-6" aria-hidden="true">
    <div>
      <div className="mb-3 h-3 w-20 rounded bg-white/10" />
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-[88px] rounded-2xl border border-white/10 bg-white/5 motion-safe:animate-pulse"
          />
        ))}
      </div>
    </div>
    <div>
      <div className="mb-3 h-3 w-28 rounded bg-white/10" />
      <div className="flex flex-col gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-14 rounded-2xl border border-white/10 bg-white/5 motion-safe:animate-pulse"
          />
        ))}
      </div>
    </div>
  </div>
);

function App() {
  const [city, setCity] = useState("");

  const [weatherData, setWeatherData] = useState<null | WeatherData>(null);

  const [forecastData, setForecastData] = useState<ForecastData | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (query = city) => {
    const trimmed = query.trim();

    if (!trimmed) {
      setError("Enter a city name to search.");
      searchInputRef.current?.focus();
      return;
    }

    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const [data, forecast] = await Promise.all([
        getWeatherData(trimmed),
        getForecastData(trimmed),
      ]);
      setWeatherData(data);
      setForecastData(forecast);
    } catch {
      setError(
        `Couldn't load the weather for “${trimmed}”. Check the city name and your connection, then try again.`,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCity = (suggestion: string) => {
    setCity(suggestion);
    void handleSubmit(suggestion);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-950 font-sans text-white antialiased">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950"
      >
        Skip to current weather
      </a>

      <img
        src={bgImage}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1280}
        fetchPriority="high"
        className="pointer-events-none fixed inset-0 h-full w-full select-none object-cover"
      />
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/45 to-slate-950/90" />

      <div className="relative flex min-h-screen flex-col lg:flex-row">
        <main id="main-content" className="flex flex-1 flex-col">
          <WeatherPanel
            city={weatherData?.name ?? "--"}
            temperature={weatherData?.main?.temp ?? "--"}
            condition={weatherData?.weather?.[0]?.main ?? "--"}
            icon={weatherData?.weather?.[0]?.icon ?? ""}
            hasData={weatherData !== null}
            loading={loading}
            date={dateFormatter.format(new Date())}
          />
        </main>

        <aside
          aria-busy={loading}
          className="w-full shrink-0 border-t border-white/10 bg-slate-950/40 backdrop-blur-2xl lg:sticky lg:top-0 lg:h-screen lg:w-[400px] lg:border-t-0 lg:border-l xl:w-[440px]"
        >
          <div className="flex h-full flex-col gap-6 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-7 lg:overflow-y-auto lg:p-8">
            <SearchBar
              city={city}
              setCity={setCity}
              onSubmit={handleSubmit}
              loading={loading}
              inputRef={searchInputRef}
            />

            <p role="status" aria-live="polite" className="sr-only">
              {loading
                ? "Loading weather…"
                : weatherData
                  ? `Weather loaded for ${weatherData.name}`
                  : ""}
            </p>

            {loading && <LoadingState />}

            {!loading && error && <ErrorState message={error} />}

            {!loading && !error && !weatherData && (
              <EmptyState onSelectCity={handleSelectCity} />
            )}

            {!loading && weatherData && (
              <div className="content-enter flex flex-col gap-6">
                <WeatherDetails
                  humidity={weatherData.main.humidity}
                  wind_speed={weatherData.wind.speed}
                  max_temp={weatherData.main.temp_max}
                  min_temp={weatherData.main.temp_min}
                />

                <ForecastList forecastData={forecastData} />
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;
