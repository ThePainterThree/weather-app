import { useEffect, useState } from "react";
import Header from "./Header"
import {getTemperatureNow } from "./api/weather-openmeteo.ts"
import { cities } from "./data/cities.ts";

function App() {
  const cityName = "Cologne"
  const location = cities.find((city) => city.name === cityName)
  if (!location) {
  return <h5>Sorry, city not found. Try again later.</h5>
}
  const latitude = location.latitude
  const longitude = location.longitude

  const [temperature, setTemperature] = useState<number | null> (null);

  useEffect(() => {
    getTemperatureNow(latitude, longitude).then((temperatura: number) => {
      setTemperature(temperatura)
    });
  }, []);

  return(
    <main>
      <h1>Weather Dashboard</h1>
      <p>Tracking weather metrics in real time.</p><br></br>
      <Header location={location.name}></Header>

      <h3>
        {temperature === null ? "Loading data..." : `${temperature}°C`}
      </h3>
  
    </main>
  )
}

export default App