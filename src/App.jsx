import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import WeatherContext from "./Helper/WeatherContext";
import Weather from "./Components/Weather";
import "./App.css";
import serverConfig from "./Config/server-config";

function App() {
  const { city, setCity, setCoordinates, coordinates, errorMessage, setErrormsg } = useContext(WeatherContext);
  const [input, setInput] = useState("");

  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${serverConfig.API_KEY_LOCATION}`;

  useEffect(() => {
    if (!city) return;

    const fetchCoordinates = async () => {
      try {
        const res = await axios.get(url);
        if (res.data.length != 0) {
          setCoordinates({ lat: res.data[0].lat, lon: res.data[0].lon });
          setErrormsg("");
        }
        else {
          setErrormsg("City Not Found");
          setCoordinates(null);
        }

      } catch (error) {
        setErrormsg("Internal Server Error:Try agian");
        setCity("");
      }

    };


    fetchCoordinates();
  }, [city]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const cityRegex = /^[A-Za-z]+(?:[\s-][A-Za-z]+)*$/;
    if (!cityRegex.test(input)) {
      setErrormsg("Please Enter a Valid City Name");
      setCoordinates(null);
      setCity("");
    } else {
      setCity(input);
      setErrormsg("");

    }


  };

  return (
    <div className="animated-bg min-h-screen bg-gradient-to-r from-blue-500 to-indigo-700 
                    flex flex-col items-center justify-center text-white p-6">
      <div className="bg-gray-900 bg-opacity-20 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Weather App</h1>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter city"
            className="w-full p-3 text-gray-800 bg-white/80 border border-gray-300 rounded-lg 
                       shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white"

          />
          <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md">
            Search
          </button>
        </form>

        {errorMessage && <p className="text-red-400 mt-2">{errorMessage}</p>}
        {coordinates && coordinates.lat && coordinates.lon && <Weather />}
      </div>
    </div>
  );
}

export default App;
