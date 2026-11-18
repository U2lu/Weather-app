import type { ReactNode } from "react";

type WeatherDetailsProps = {
  humidity: number;
  wind_speed: number;
  max_temp: number;
  min_temp: number;
};

const StatIcon = ({ children }: { children: ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-4 shrink-0"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const WeatherDetails = ({
  humidity,
  wind_speed,
  max_temp,
  min_temp,
}: WeatherDetailsProps) => {
  const stats = [
    {
      label: "Humidity",
      value: Math.round(humidity),
      unit: "%",
      icon: (
        <StatIcon>
          <path d="M12 3.5c3.2 3.6 5.5 6.4 5.5 9.1a5.5 5.5 0 1 1-11 0c0-2.7 2.3-5.5 5.5-9.1Z" />
        </StatIcon>
      ),
    },
    {
      label: "Wind",
      value: wind_speed.toFixed(1),
      unit: "m/s",
      icon: (
        <StatIcon>
          <path d="M3 8h11a3 3 0 1 0-3-3" />
          <path d="M3 12h15a3 3 0 1 1-3 3" />
          <path d="M3 16h8" />
        </StatIcon>
      ),
    },
    {
      label: "High",
      value: Math.round(max_temp),
      unit: "°C",
      icon: (
        <StatIcon>
          <path d="M12 19V5" />
          <path d="m5 12 7-7 7 7" />
        </StatIcon>
      ),
    },
    {
      label: "Low",
      value: Math.round(min_temp),
      unit: "°C",
      icon: (
        <StatIcon>
          <path d="M12 5v14" />
          <path d="m19 12-7 7-7-7" />
        </StatIcon>
      ),
    },
  ];

  return (
    <section>
      <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60">
        Details
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <div className="flex items-center gap-2 text-white/55">
              {stat.icon}
              <span className="text-[11px] font-medium uppercase tracking-[0.12em]">
                {stat.label}
              </span>
            </div>
            <p className="mt-3 text-xl font-semibold tabular-nums text-white">
              {stat.value}
              <span
                className={`text-sm font-normal text-white/60 ${
                  stat.unit === "%" ? "ml-0.5" : "ml-1"
                }`}
              >
                {stat.unit}
              </span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WeatherDetails;
