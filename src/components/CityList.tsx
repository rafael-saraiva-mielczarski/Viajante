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
      <Message message="Add you first visited city by clicking the map!" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city: CityInterface) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
