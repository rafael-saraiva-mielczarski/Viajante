import CityItem from "./CityItem.js";
import styles from "./CityList.module.css";
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import { useCities } from "../contexts/CitiesContext.jsx";
import { CityInterface } from "../types/CityType.js";

export default function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Adicione seu primiero país visitado clicando no Mapa!" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city: CityInterface) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
