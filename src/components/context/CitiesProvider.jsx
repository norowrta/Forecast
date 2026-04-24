import React, { createContext, useState, useEffect, useContext } from "react";

const CitiesContext = createContext();

export default function CitiesProvider({ children }) {
  const [cities, setCities] = useState(() => {
    const saved = localStorage.getItem("favoriteCities");
    return saved ? JSON.parse(saved) : [];
  });

  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    localStorage.setItem("favoriteCities", JSON.stringify(cities));
  }, [cities]);

  const forceRefresh = () => {
    setLastUpdate(Date.now());
  };

  const addCity = (cityName) => {
    if (!cities.includes(cityName)) {
      setCities((prev) => [...prev, cityName]);

      setSelectedCity(cityName);
    }
  };

  const removeCity = (cityName) => {
    const newCities = cities.filter((city) => city !== cityName);

    setCities(newCities);

    if (cityName === selectedCity) {
      setSelectedCity(newCities.length > 0 ? newCities[0] : null);
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        addCity,
        removeCity,
        selectedCity,
        setSelectedCity,
        lastUpdate,
        forceRefresh,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export const useCities = () => {
  return useContext(CitiesContext);
};
