// @ts-nocheck
import { useParams, useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeCity } from "@/features/cities/citiesSlice";

function CityWeatherPage() {
  const { city } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { cityId, temp, country, tempMin, tempMax } = state.weatherData;

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDelete = () => {
    dispatch(removeCity(cityId));
    navigate("/weather");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IoArrowBackSharp
          onClick={handleGoBack}
          style={{ cursor: "pointer", fontSize: "20px" }}
        />
        <MdDelete
          onClick={handleDelete}
          style={{ cursor: "pointer", fontSize: "20px" }}
        />
      </div>
      <h2>
        Weather for City {city} | {country}
      </h2>
      <p>Temp: {temp}°C</p>
      <p>
        TempMin: {tempMin}°C TempMax: {tempMax}°C
      </p>
    </div>
  );
}

export default CityWeatherPage;
