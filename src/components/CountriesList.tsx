import Spinner from "./Spinner";
import styles from "./CountriesList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
import { CityInterface } from "../types/CityType";

export default function CountriesList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Adicione seu primiero país visitado clicando no Mapa!" />
    );

  const countries = cities.reduce((arr: any, city: CityInterface) => {
    if (!arr.map((el: any) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country: any) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
