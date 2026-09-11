export type WeatherNow = {
  temperature: number;
  windSpeed: number;
  humidity: number;
  precipitationProbability: number;
  weatherCode: number;
  isDay: boolean;
};

export async function getWeatherNow(
  latitude: number,
  longitude: number,
): Promise<WeatherNow> {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=precipitation_probability&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day&timezone=auto`,
  );

  if (!response.ok) {
    throw new Error("Failed to display data. Please try again later.");
  }

  const data = await response.json();
  console.log("FULL WEATHER DATA:", data);
  console.log("IS DAY:", data.current?.is_day);
  console.log("City local time:", data.current.time);
  console.log("Weather code:", data.current.weather_code);
  console.log("Is day:", data.current.is_day);

  if (
    data.current?.temperature_2m === undefined ||
    data.current?.wind_speed_10m === undefined ||
    data.current?.relative_humidity_2m === undefined ||
    data.current?.weather_code === undefined ||
    data.current?.is_day === undefined
  ) {
    throw new Error("Weather information is not available.");
  }

  const currentHour = data.current.time?.slice(0, 13);

  const currentHourIndex = data.hourly.time.findIndex(
    (time: string) => time.slice(0, 13) === currentHour,
  );

  const precipitationProbability =
    currentHourIndex >= 0
      ? data.hourly.precipitation_probability[currentHourIndex]
      : 0;

  return {
    temperature: data.current.temperature_2m,
    windSpeed: data.current.wind_speed_10m,
    humidity: data.current.relative_humidity_2m,
    precipitationProbability,
    weatherCode: data.current.weather_code,
    isDay: data.current.is_day === 1,
  };
}
