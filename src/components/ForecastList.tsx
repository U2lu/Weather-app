import type { ForecastData } from "../types/weather";

const weekdayFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
});

type ForecastListProps = {
  forecastData: ForecastData | null;
};

type DayForecast = {
  date: string;
  min: number;
  max: number;
  icon: string;
  description: string;
  noonDistance: number;
};

const ForecastList = ({ forecastData }: ForecastListProps) => {
  if (!forecastData) {
    return null;
  }

  // Group the 3-hourly forecast into days, taking the highs and lows across
  // each day and the condition closest to midday for the label and icon.
  const days: DayForecast[] = [];

  for (const item of forecastData.list) {
    const [date, time] = item.dt_txt.split(" ");
    const hour = Number(time.slice(0, 2));
    const noonDistance = Math.abs(hour - 12);
    const min = item.main.temp_min ?? item.main.temp;
    const max = item.main.temp_max ?? item.main.temp;

    const current = days[days.length - 1];

    if (!current || current.date !== date) {
      days.push({
        date,
        min,
        max,
        icon: item.weather[0].icon,
        description: item.weather[0].description,
        noonDistance,
      });
    } else {
      current.min = Math.min(current.min, min);
      current.max = Math.max(current.max, max);

      if (noonDistance < current.noonDistance) {
        current.noonDistance = noonDistance;
        current.icon = item.weather[0].icon;
        current.description = item.weather[0].description;
      }
    }
  }

  return (
    <section>
      <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60">
        5-day forecast
      </h2>

      <div className="flex flex-col gap-2">
        {days.slice(0, 5).map((day, index) => (
          <div
            key={day.date}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5"
          >
            <p className="w-14 shrink-0 truncate text-sm font-medium text-white/80">
              {index === 0
                ? "Today"
                : weekdayFormatter.format(new Date(`${day.date}T12:00:00`))}
            </p>

            <img
              src={`https://openweathermap.org/img/wn/${day.icon}.png`}
              alt=""
              width={50}
              height={50}
              loading="lazy"
              className="size-10 shrink-0"
            />

            <p className="min-w-0 flex-1 truncate text-sm capitalize text-white/60">
              {day.description}
            </p>

            <p className="shrink-0 text-sm font-semibold tabular-nums text-white">
              {Math.round(day.max)}°
              <span className="ml-1.5 font-normal text-white/55">
                {Math.round(day.min)}°
              </span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ForecastList;
