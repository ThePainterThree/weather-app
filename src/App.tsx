import { useEffect, useState } from "react";
import Header from "./components/Header.tsx";
import { getWeatherNow, type WeatherNow } from "./api/weather-openmeteo.ts";
import { cities } from "./data/cities.ts";
import Dropdown from "./components/Dropdown.tsx";
import WeatherCard from "./components/WeatherCard.tsx";

function App() {
  const [cityName, setCityName] = useState<string>("Cologne");
  const [weather, setWeather] = useState<WeatherNow | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const location = cities.find((city) => city.name === cityName);
  if (!location) {
    return <h5>Sorry, city not found.</h5>;
  }

  const latitude = location.latitude;
  const longitude = location.longitude;

  useEffect(() => {
    setWeather(null);
    setErrorMessage(null);

    getWeatherNow(latitude, longitude)
      .then((weatherInfo) => {
        setWeather(weatherInfo);
      })
      .catch(() => {
        setErrorMessage(
          "Opalala! There was a problem loading the data. Please try again later.",
        );
      });
  }, [latitude, longitude]);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Weather Dashboard</h1>
      <p>Tracking weather metrics in real time.</p>
      <br></br>
      <Dropdown cityName={cityName} onCityChange={setCityName} />
     
      <Header location={cityName}></Header>
      <br></br>

      {/* case1: if there is an error, display err message */}
      {errorMessage && <h4>{errorMessage}</h4>}

      {/* case2:if there is no error but the data has not been received */}
      {!errorMessage && weather === null && <h4>Loading data...</h4>}

      {!errorMessage && weather && (
        <WeatherCard cityName={cityName} weather={weather}></WeatherCard>
      )}

    </main>
  );
}

export default App;
