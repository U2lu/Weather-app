type WeatherPanelProps = {
  temperature: number | string;
  city: string;
  condition: string;
  date: string;
  icon: string;
  hasData: boolean;
  loading: boolean;
};

const WeatherPanel = ({
  city,
  temperature,
  date,
  condition,
  icon,
  hasData,
  loading,
}: WeatherPanelProps) => {
  const displayTemperature =
    typeof temperature === "number" ? `${Math.round(temperature)}°` : temperature;

  return (
    <div className="flex min-h-[45vh] h-full flex-col justify-between gap-16 px-6 pb-8 pt-[max(2rem,env(safe-area-inset-top))] sm:px-10 sm:pb-10 lg:min-h-0 lg:p-14">
      <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.35em] text-white/60">
        <span className="size-1.5 rounded-full bg-sky-300" aria-hidden="true" />
        Current weather
      </p>

      {loading && !hasData ? (
        <div
          className="flex flex-col gap-4 pb-4 motion-safe:animate-pulse"
          aria-hidden="true"
        >
          <div className="h-20 w-40 rounded-xl bg-white/10 sm:h-24 sm:w-48" />
          <div className="mt-2 h-7 w-40 rounded bg-white/10" />
          <div className="h-3 w-24 rounded bg-white/10" />
        </div>
      ) : hasData ? (
        <div className="content-enter flex max-w-2xl flex-col items-start">
          <div className="flex items-center gap-2 sm:gap-4">
            {icon && (
              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt=""
                width={100}
                height={100}
                fetchPriority="high"
                className="size-24 drop-shadow-lg sm:size-28"
              />
            )}
            <p className="text-7xl font-semibold leading-none tracking-tighter sm:text-8xl lg:text-9xl">
              {displayTemperature}
            </p>
          </div>

          <h1 className="mt-4 text-3xl font-medium tracking-tight break-words text-white sm:text-4xl">
            {city}
          </h1>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/70">
            {condition}
          </p>
          <p className="mt-5 text-sm text-white/60">{date}</p>
        </div>
      ) : (
        <div className="content-enter max-w-md pb-4">
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-balance text-white sm:text-5xl">
            Search for a city
          </h1>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-pretty text-white/60">
            See current conditions and the week ahead, anywhere in the world.
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherPanel;
