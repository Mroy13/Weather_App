import { useContext, useEffect, useState } from "react";
import WeatherContext from "../Helper/WeatherContext";
import axios from "axios";
import serverConfig from "../Config/server-config";

function Weather() {
  const { city, setCity, coordinates, setCoordinates, errorMessage, setErrormsg } = useContext(WeatherContext);
  const [weather, setWeather] = useState(null);

 

  const url = `https://api.weatherapi.com/v1/current.json?key=${serverConfig.API_KEY_WEATHER}&q=${coordinates.lat},${coordinates.lon},${city},India`;


  //Fetch Weather Data
  useEffect(() => {
    if (!coordinates || !coordinates.lat || !coordinates.lon) return;

    const fetchWeather = async () => {
      try {
        const res = await axios.get(url);
        if (res.status == 200) {
          setWeather(res.data);
          setErrormsg("");
        } else {

          setErrormsg("invalid weatherData:Try again");
          setCity("");
          setCoordinates(null);
        }
      } catch (error) {
        setErrormsg("Internal Server Error:Try again");
        setCity("");
        setCoordinates(null);
      }
    };

    fetchWeather();
  }, [coordinates]);



  if (!weather) {
    return <p className="text-center text-white text-lg">Fetching weather details...</p>;
  }


  const { location, current } = weather;


  return (
    <div className="mt-4 bg-gray-200 bg-opacity-30 p-6 rounded-lg shadow-lg text-center text-gray-900">
      <h2 className="text-2xl font-semibold">{location.name}, {location.region}</h2>
      <p className="text-lg mb-2 font-medium">{location.country}</p>


      <div className="flex items-center justify-center space-x-4">
        <img
          src={`https:${current.condition.icon}`}
          alt={current.condition.text}
          className="w-16 h-16"
        />
        <div>
          <p className="text-4xl font-bold">{current.temp_c}°C</p>
          <p className="capitalize text-gray-800">{current.condition.text}</p>
        </div>
      </div>


      <div className="mt-4 grid grid-cols-2 gap-4 text-gray-800 text-sm">
        <div>
          <p><span className="font-semibold">Feels Like:</span> {current.feelslike_c}°C</p>
          <p><span className="font-semibold">Wind:</span> {current.wind_kph} km/h ({current.wind_dir})</p>
        </div>

        <div>
          <p><span className="font-semibold">Humidity:</span> {current.humidity}%</p>
          <p><span className="font-semibold">Visibility:</span> {current.vis_km} km</p>
        </div>
      </div>


      <div className="mt-4 text-sm text-gray-800">
        <p><span className="font-semibold">Pressure:</span> {current.pressure_mb} mb</p>
        <p><span className="font-semibold">UV Index:</span> {current.uv}</p>
        <p><span className="font-semibold">Local Time:</span> {location.localtime}</p>
      </div>


    </div>
  );
}

export default Weather;
