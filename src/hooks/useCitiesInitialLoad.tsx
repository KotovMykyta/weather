// @ts-nocheck
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store.js";
import { api } from "@/weather-api.ts";

export type WeatherData = {
  id: number;
  name: string;
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  sys: {
    country: string;
    timezone: number;
  };
};

const useCitiesInitialLoad = () => {
  const cities = useSelector((state: RootState) => state.cities.citiesIds);
  const cityIds = cities.map((city) => encodeURIComponent(city)).join(",");

  const [weatherListData, setWeatherListData] = useState<WeatherData[]>([]);

  useEffect(() => {
    fetch(`${api.base}group?id=${cityIds}&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeatherListData(result.list);
      });
  }, [cityIds]);

  const updateCityWeather = (city: string) => {
    fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeatherListData((prev) =>
          prev.map((item) => {
            if (item.name === city) {
              item.main.temp = result.main.temp;
              item.main.temp_max = result.main.temp_max;
              item.main.temp_min = result.main.temp_min;
              item.dt = result.dt;
            }
            return item;
          })
        );
      });
  };
  return { weatherListData, updateCityWeather };
};

export default useCitiesInitialLoad;
