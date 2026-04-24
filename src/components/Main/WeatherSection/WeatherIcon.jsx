import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudHail,
  CloudLightning,
  CloudMoon,
  CloudMoonRain,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  CloudSun,
  CloudSunRain,
  Cloudy,
  Haze,
  Sun,
  MoonStar,
  Thermometer,
  Droplet,
  Wind,
} from "lucide-react";

export const weatherIconMap = {
  cloud: (props) => <Cloud {...props} />,
  cloudDrizzle: (props) => <CloudDrizzle {...props} />,
  cloudFog: (props) => <CloudFog {...props} />,
  cloudHail: (props) => <CloudHail {...props} />,
  cloudLightning: (props) => <CloudLightning {...props} />,
  cloudMoon: (props) => <CloudMoon {...props} />,
  cloudMoonRain: (props) => <CloudMoonRain {...props} />,
  cloudRain: (props) => <CloudRain {...props} />,
  cloudRainWind: (props) => <CloudRainWind {...props} />,
  cloudSnow: (props) => <CloudSnow {...props} />,
  cloudSun: (props) => <CloudSun {...props} />,
  cloudSunRain: (props) => <CloudSunRain {...props} />,
  cloudy: (props) => <Cloudy {...props} />,
  haze: (props) => <Haze {...props} />,
  sun: (props) => <Sun {...props} />,
  moonStar: (props) => <MoonStar {...props} />,
};

export const getCustomIcon = (owmIconCode, customClass) => {
  const mapping = {
    "01d": weatherIconMap.sun,
    "01n": weatherIconMap.moonStar,
    "02d": weatherIconMap.cloudSun,
    "02n": weatherIconMap.cloudMoon,
    "03d": weatherIconMap.cloudy,
    "03n": weatherIconMap.cloudy,
    "04d": weatherIconMap.cloud, // Похмуро
    "04n": weatherIconMap.cloud,
    "09d": weatherIconMap.cloudRain, // Злива
    "09n": weatherIconMap.cloudRain,
    "10d": weatherIconMap.cloudSunRain, // Легкий дощ вдень
    "10n": weatherIconMap.cloudMoonRain, // Легкий дощ вночі
    "11d": weatherIconMap.cloudLightning,
    "11n": weatherIconMap.cloudLightning,
    "13d": weatherIconMap.cloudSnow,
    "13n": weatherIconMap.cloudSnow,
    "50d": weatherIconMap.cloudFog,
    "50n": weatherIconMap.cloudFog,
  };

  const IconComponent = mapping[owmIconCode] || weatherIconMap.cloud;

  return <IconComponent className={customClass} />;
};
