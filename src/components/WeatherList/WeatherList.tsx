import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import WeatherCard from "./WeatherCard";
import { api } from "@/weather-api.ts";

type WeatherData = {
  id: number;
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  sys: {
    country: string;
  };
};

const WeatherList = () => {
  const cities = useSelector((state: RootState) => state.cities.citiesIds);
  const loadingCities = useSelector((state: RootState) => state.cities.loading);
  const cityIds = cities.map((city) => encodeURIComponent(city)).join(",");

  const [weatherListData, setWeatherListData] = useState<WeatherData[]>([]);
  // console.log("weatherListData: ", weatherListData);

  useEffect(() => {
    fetch(`${api.base}group?id=${cityIds}&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeatherListData(result.list);
      });
  }, [cityIds]);

  return (
    <div>
      {loadingCities ? (
        <p>loading</p>
      ) : weatherListData?.length ? (
        weatherListData.map((city) => (
          <WeatherCard
            key={city.id}
            city={city.name}
            temp={city.main.temp}
            tempMin={city.main.temp_min}
            tempMax={city.main.temp_max}
            country={city.sys.country}
            cityId={city.id}
          />
        ))
      ) : (
        <p>You can add your cities</p>
      )}
    </div>
  );
};

export default WeatherList;
