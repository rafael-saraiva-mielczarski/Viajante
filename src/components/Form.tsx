// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, useEffect, FormEvent } from "react";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Button from "./Button";
import styles from "./Form.module.css";
import BackButton from "./ButtonBack";
import Message from "./Message";
import Spinner from "./Spinner";

export function convertToEmoji(countryCode: any) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char: any) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [date, setDate] = useState<any>(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geoCodingError, setGeocodingError] = useState("");

  useEffect(() => {
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city! Click somewhere else"
          );
        setCityName(data.city || data.locality || "");
        setCountryName(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
        console.log(convertToEmoji(data.countryCode));
      } catch (err: any) {
        setGeocodingError(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      countryName,
      date,
      notes,
      emoji,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app");
  }

  if (isLoadingGeocoding) return <Spinner />;
  if (!lat && !lng) return <Message message="Start by clicking the map!" />;
  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">Nome da Cidade</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">Quando você foi para {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Anotações sobre a viagem para {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={() => {}}>
          Adicionar
        </Button>
        <BackButton navRoute={"/app"} />
      </div>
    </form>
  );
}

export default Form;
