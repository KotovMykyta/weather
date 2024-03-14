import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthHeader from "./components/AuthHeader";
import Search from "./components/Search";
import WeatherList from "./components/WeatherList";
import CityWeatherPage from "./components/CityWeatherPage";
import useCitiesUpdate from "./hooks/useCitiesUpdate";
import useCitiesInitialLoad from "./hooks/useCitiesInitialLoad";

function App() {
  useCitiesUpdate();
  useCitiesInitialLoad();

  return (
    <Router>
      <Routes>
        <Route
          path="/weather"
          element={
            <div style={{ width: "340px" }}>
              <AuthHeader />
              <Search />
              <WeatherList />
            </div>
          }
        />
        <Route path="/weather/:city" element={<CityWeatherPage />} />
      </Routes>
    </Router>
  );
}

export default App;
