import { Card } from "@chakra-ui/react"
import type { WeatherNow } from "../api/weather-openmeteo"

type WeatherCardProps = {
    cityName: string,
    weather: WeatherNow
}

function WeatherCard({ cityName, weather } : WeatherCardProps){
  return (
    <Card.Root variant="outline" width="320px">
      <Card.Body gap="2">
        <Card.Title>{cityName}</Card.Title>
        <Card.Description>
          Temperature: {weather.temperature} °C
          <br></br>
          Wind Speed: {weather.windSpeed} km/h
          <br></br>
          Humidity: {weather.humidity} %
          <br></br>
          Chance of rain: {weather.precipitationProbability} %
        </Card.Description>
      </Card.Body>
    </Card.Root>
  )
}

  export default WeatherCard