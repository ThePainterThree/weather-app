import {
  Card,
  Text,
  Flex,
  HStack,
  VStack,
  Separator,
  Box,
} from "@chakra-ui/react";

import {
  WiDaySunny,
  WiNightClear,
  WiCloud,
  WiCloudy,
  WiFog,
  WiRain,
  WiShowers,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

import type { WeatherNow } from "../api/weather-openmeteo";

type WeatherCardProps = {
  cityName: string;
  weather: WeatherNow;
};

function getWeatherDisplay(code: number, isDay: boolean) {
  if (code === 0) {
    return {
      label: "Clear sky",
      icon: isDay ? WiDaySunny : WiNightClear,
    };
  }

  if ([1, 2].includes(code)) {
    return {
      label: "Partly cloudy",
      icon: WiCloud,
    };
  }

  if (code === 3) {
    return {
      label: "Cloudy",
      icon: WiCloudy,
    };
  }

  if ([45, 48].includes(code)) {
    return {
      label: "Foggy",
      icon: WiFog,
    };
  }

  if ([51, 53, 55, 56, 57].includes(code)) {
    return {
      label: "Drizzle",
      icon: WiShowers,
    };
  }

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return {
      label: "Rain",
      icon: WiRain,
    };
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return {
      label: "Snow",
      icon: WiSnow,
    };
  }

  if ([95, 96, 99].includes(code)) {
    return {
      label: "Thunderstorm",
      icon: WiThunderstorm,
    };
  }

  return {
    label: "Current weather",
    icon: WiCloud,
  };
}

function WeatherCard({ cityName, weather }: WeatherCardProps) {
  const weatherDisplay = getWeatherDisplay(weather.weatherCode, weather.isDay);

  const WeatherIcon = weatherDisplay.icon;

  return (
    <Card.Root
      variant="outline"
      width="100%"
      maxWidth="500px"
      marginTop="1.5rem"
      borderRadius="2xl"
      overflow="hidden"
      bg="rgba(255, 255, 255, 0.26)"
      backdropFilter="blur(10px)"
      borderColor="rgba(255, 255, 255, 0.25)"
      boxShadow="0 12px 40px rgba(0, 0, 0, 0.15)"
    >
      <Card.Header>
        <Text fontSize="sm" fontWeight="bold" color="blue.900">
          CURRENT WEATHER IN {cityName.toUpperCase()}
        </Text>
      </Card.Header>

      <Separator borderColor="rgba(255,255,255,0.4)" />

      <Card.Body>
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap="8"
        >
          <VStack gap="1">
            <Box color="blue.700">
              <WeatherIcon size={90} />
            </Box>

            <Text color="blue.900" fontWeight="medium">
              {weatherDisplay.label}
            </Text>

            <HStack align="start" gap="1">
              <Text fontSize="5xl" fontWeight="bold" color="blue.900">
                {weather.temperature}
              </Text>

              <Text fontSize="xl" color="blue.900" paddingTop="2">
                °C
              </Text>
            </HStack>
          </VStack>

          <VStack align="stretch" gap="3" width={{ base: "100%", md: "auto" }}>
            <Text fontSize="md" fontWeight="medium" color="blue.900">
              Wind speed: {weather.windSpeed} km/h
            </Text>

            <Separator />

            <Text fontSize="md" fontWeight="medium" color="blue.900">
              Humidity: {weather.humidity}%
            </Text>

            <Separator />

            <Text fontSize="md" fontWeight="medium" color="blue.900">
              Chance of rain: {weather.precipitationProbability}%
            </Text>
          </VStack>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}

export default WeatherCard;
