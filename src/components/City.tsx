import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import { flagemojiToPNG } from "../utils/flagEmojiToPng";
import { formatDate } from "../utils/formatDate";

import BackButton from "./ButtonBack";
import styles from "./City.module.css";
import Spinner from "./Spinner";

export default function City() {
  const { id } = useParams();
  const { currentCity, getCity, isLoading } = useCities();
  const { cityName, emoji, date, notes } = currentCity;
  const [isCurrentCityStale, setIsCurrentCityStale] = useState(true);

  useEffect(() => {
    getCity(id);
    setIsCurrentCityStale(false);
    return () => setIsCurrentCityStale(true);
  }, [id]);

  if (isCurrentCityStale) return;
  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>Nome da cidade {id}</h6>
        <h3>
          <span>{emoji ? flagemojiToPNG(emoji) : ""}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>Você foi para {cityName} em</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Anotações</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Descubra mais</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Olhe sobre {cityName} na Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton navRoute={"/app"} />
      </div>
    </div>
  );
}
