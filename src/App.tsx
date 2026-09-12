import { useEffect, useState } from "react";
import { getWeatherNow, type WeatherNow } from "./api/weather-openmeteo.ts";
import { cities } from "./data/cities.ts";
import Dropdown from "./components/Dropdown.tsx";
import WeatherCard from "./components/WeatherCard.tsx";
import WeatherBackground from "./components/WeatherBackground.tsx";

function App() {
  const [cityName, setCityName] = useState<string>("Cologne");
  const [weather, setWeather] = useState<WeatherNow | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const location = cities.find((city) => city.name === cityName);

  useEffect(() => {
    if (!location) {
      setWeather(null);
      setErrorMessage("Sorry, city not found.");
      return;
    }

    let cancelled = false;

    setWeather(null);
    setErrorMessage(null);

    getWeatherNow(location.latitude, location.longitude)
      .then((weatherInfo) => {
        if (!cancelled) {
          setWeather(weatherInfo);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setErrorMessage(
            "Opalala! There was a problem loading the data. Please try again later.",
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, [location]);

  return (
    <>
      {weather && (
        <WeatherBackground
          weatherCode={weather.weatherCode}
          isDay={weather.isDay}
        />
      )}

      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem 1rem",
          minHeight: "100vh",

          // Keeps all app content above the animated background
          position: "relative",
          zIndex: 1,
        }}
      >
        <h1>Weather Dashboard</h1>

        <p>Tracking weather metrics in real time.</p>

        <Dropdown cityName={cityName} onCityChange={setCityName} />

        {errorMessage && (
          <p role="alert" style={{ marginTop: "2rem" }}>
            {errorMessage}
          </p>
        )}

        {!errorMessage && weather === null && (
          <p style={{ marginTop: "2rem" }}>Loading weather...</p>
        )}

        {!errorMessage && weather && (
          <WeatherCard cityName={cityName} weather={weather} />
        )}
      </main>
    </>
  );
}

export default App;
