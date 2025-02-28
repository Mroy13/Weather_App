import { createContext, useState } from "react";

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [city, setCity] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lon: null });
  const [errorMessage,setErrormsg]=useState("");

  return (
    <WeatherContext.Provider value={{ city, setCity, coordinates, setCoordinates,errorMessage,setErrormsg}}>
      {children}
    </WeatherContext.Provider>
  );
}

export default WeatherContext;
