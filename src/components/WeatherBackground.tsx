type WeatherBackgroundProps = {
  weatherCode: number;
  isDay: boolean;
};

function getWeatherType(code: number) {
  if (code === 0) {
    return "clear";
  }

  if ([1, 2].includes(code)) {
    return "partly-cloudy";
  }

  if (code === 3) {
    return "cloudy";
  }

  if ([45, 48].includes(code)) {
    return "fog";
  }

  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return "rain";
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return "snow";
  }

  if ([95, 96, 99].includes(code)) {
    return "storm";
  }

  return "cloudy";
}

function WeatherBackground({ weatherCode, isDay }: WeatherBackgroundProps) {
  const weatherType = getWeatherType(weatherCode);

  const backgroundClass = `weather-${weatherType}-${isDay ? "day" : "night"}`;

  return (
    <div className={`weather-background ${backgroundClass}`} aria-hidden="true">
      {/* CLEAR DAY */}
      {weatherType === "clear" && isDay && <div className="sun-glow" />}

      {/* CLEAR NIGHT */}
      {weatherType === "clear" && !isDay && (
        <>
          <div className="moon" />

          <div className="stars">
            {Array.from({ length: 35 }).map((_, index) => (
              <span
                key={index}
                style={{
                  left: `${(index * 37) % 100}%`,
                  top: `${(index * 23) % 75}%`,
                  animationDelay: `${(index % 7) * -0.5}s`,
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* PARTLY CLOUDY DAY */}
      {weatherType === "partly-cloudy" && isDay && (
        <>
          <div className="sun-glow" />

          <div className="cloud cloud-one" />
          <div className="cloud cloud-two" />
        </>
      )}

      {/* PARTLY CLOUDY NIGHT */}
      {weatherType === "partly-cloudy" && !isDay && (
        <>
          <div className="moon moon-muted" />

          <div className="stars">
            {Array.from({ length: 20 }).map((_, index) => (
              <span
                key={index}
                style={{
                  left: `${(index * 37) % 100}%`,
                  top: `${(index * 23) % 75}%`,
                  animationDelay: `${(index % 7) * -0.5}s`,
                }}
              />
            ))}
          </div>

          <div className="cloud cloud-one" />
          <div className="cloud cloud-two" />
        </>
      )}

      {/* CLOUDY */}
      {weatherType === "cloudy" && (
        <>
          {!isDay && <div className="moon moon-muted" />}

          <div className="cloud cloud-one" />
          <div className="cloud cloud-two" />
          <div className="cloud cloud-three" />
        </>
      )}

      {/* RAIN */}
      {weatherType === "rain" && (
        <>
          {!isDay && <div className="moon moon-muted" />}

          <div className="cloud cloud-one" />
          <div className="cloud cloud-two" />

          <div className="rain">
            {Array.from({ length: 30 }).map((_, index) => (
              <span
                key={index}
                style={{
                  left: `${(index * 17) % 100}%`,
                  animationDelay: `${(index % 10) * -0.15}s`,
                  animationDuration: `${0.7 + (index % 5) * 0.08}s`,
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* SNOW */}
      {weatherType === "snow" && (
        <div className="snow">
          {Array.from({ length: 25 }).map((_, index) => (
            <span
              key={index}
              style={{
                left: `${(index * 23) % 100}%`,
                animationDelay: `${(index % 10) * -0.4}s`,
                animationDuration: `${5 + (index % 5)}s`,
              }}
            >
              •
            </span>
          ))}
        </div>
      )}

      {/* FOG */}
      {weatherType === "fog" && (
        <>
          <div className="fog fog-one" />
          <div className="fog fog-two" />
          <div className="fog fog-three" />
        </>
      )}

      {/* THUNDERSTORM */}
      {weatherType === "storm" && (
        <>
          <div className="cloud cloud-one" />
          <div className="cloud cloud-two" />

          <div className="lightning" />

          <div className="rain">
            {Array.from({ length: 35 }).map((_, index) => (
              <span
                key={index}
                style={{
                  left: `${(index * 17) % 100}%`,
                  animationDelay: `${(index % 10) * -0.12}s`,
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default WeatherBackground;
