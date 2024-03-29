import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthHeader from "./components/AuthHeader";
import Search from "./components/Search";
import WeatherList from "./components/WeatherList";
import CityWeatherPage from "./components/CityWeatherPage";
import useCitiesUpdate from "./hooks/useCitiesUpdate";
import useUserCitiesInitialLoad from "./hooks/useUserCitiesInitialLoad";
import useCitiesInitialLoad from "./hooks/useCitiesInitialLoad";

function App() {
  useCitiesUpdate();
  useUserCitiesInitialLoad();
  const { weatherListData, updateCityWeather } = useCitiesInitialLoad();

  return (
    <Router>
      <Routes>
        <Route
          path="/weather"
          element={
            <div style={{ width: "342px" }}>
              <AuthHeader />
              <Search />
              <WeatherList
                weatherListData={weatherListData}
                updateCityWeather={updateCityWeather}
              />
            </div>
          }
        />
        <Route path="/weather/:city" element={<CityWeatherPage />} />
      </Routes>
    </Router>
  );
}

export default App;
