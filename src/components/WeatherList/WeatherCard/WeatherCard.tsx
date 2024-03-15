// @ts-nocheck
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { useNavigate } from "react-router-dom";
import { IoRefreshSharp } from "react-icons/io5";
import { formatTime } from "./utils";

type WeatherCardProps = {
  city: string;
  temp: number;
  tempMin: number;
  tempMax: number;
  country: string;
  cityId: number;
  timestamp: number;
  offset: number;
  updateCityWeather: (city: string) => void;
};

const WeatherCard = ({
  city,
  temp,
  tempMin,
  tempMax,
  country,
  cityId,
  timestamp,
  offset,
  updateCityWeather,
}: WeatherCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/weather/${city}`, {
      state: { weatherData: { cityId, temp, country, tempMin, tempMax } },
    });
  };

  const handleChildClick = (
    city: string,
    event: React.MouseEvent<SVGElement>
  ) => {
    event.stopPropagation();
    updateCityWeather(city);
  };

  const cityTime = new Date(timestamp * 1000 + offset * 1000);
  const fullCityTime = formatTime(cityTime);

  return (
    <Card style={{ margin: "10px 0", cursor: "pointer" }} onClick={handleClick}>
      <CardContent
        sx={{ justifyContent: "space-between", alignItems: "center" }}
        orientation="horizontal"
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {city}
        </Typography>
        <Typography
          variant="body2"
          component="p"
          style={{
            position: "absolute",
            right: "130px",
          }}
        >
          {fullCityTime}
        </Typography>
        <Typography
          variant="body2"
          component="p"
          style={{
            position: "absolute",
            right: "60px",
          }}
        >
          {temp}°C
        </Typography>
        <IoRefreshSharp
          onClick={(event) => handleChildClick(city, event)}
          style={{ cursor: "pointer", fontSize: "20px" }}
        />
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
