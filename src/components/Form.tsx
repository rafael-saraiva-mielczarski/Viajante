// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";
import Button from "./Button";

import styles from "./Form.module.css";
import BackButton from "./ButtonBack";

export function convertToEmoji(countryCode: any) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char: any) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [date, setDate] = useState<any>(new Date());
  const [notes, setNotes] = useState("");

  return (
    <form className={styles.form}>
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
        <input
          id="date"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDate(e.target.value)
          }
          value={date}
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
        <Button
          type="primary"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Adicionar
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
