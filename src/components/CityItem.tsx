import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import { MouseEvent } from "react";
import { flagemojiToPNG } from "../utils/flagEmojiToPng";
import { formatDate } from "../utils/formatDate";

import styles from "./CityItem.module.css";

export default function CityItem({ city }: any) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  function handleClick(e: MouseEvent<HTMLElement>) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}
