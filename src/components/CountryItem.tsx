import styles from "./CountryItem.module.css";
import { flagemojiToPNG } from "../utils/flagEmojiToPng";

function CountryItem({ country }: any) {
  return (
    <li className={styles.countryItem}>
      <span>{flagemojiToPNG(country.emoji)}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
