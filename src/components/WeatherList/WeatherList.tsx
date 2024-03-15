import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import WeatherCard from "./WeatherCard";
import { WeatherData } from "@/hooks/useCitiesInitialLoad";

const WeatherList = ({
  weatherListData,
  updateCityWeather,
}: {
  weatherListData: WeatherData[];
  updateCityWeather: (city: string) => void;
}) => {
  const loadingCities = useSelector((state: RootState) => state.cities.loading);

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
            timestamp={city.dt}
            offset={city.sys.timezone}
            updateCityWeather={updateCityWeather}
          />
        ))
      ) : (
        <p>You can add your cities</p>
      )}
    </div>
  );
};

export default WeatherList;
