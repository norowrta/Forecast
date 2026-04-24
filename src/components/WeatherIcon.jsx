import sprite from "../assets/icons/weather-sprite.svg";

export default function Icon({
  name,
  width = "64",
  height = "64",
  className = "",
}) {
  return (
    <svg className={`icon ${className}`} width={width} height={height}>
      <use href={`${sprite}#${name}`}></use>
    </svg>
  );
}
