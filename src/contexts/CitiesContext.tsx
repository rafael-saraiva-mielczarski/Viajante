import { ReactNode, useContext } from "react";
import { createContext } from "react";
import { useState, useEffect } from "react";
import { CityInterface } from "../types/CityInterface";

type CitiesProviderProps = {
  children: ReactNode;
};

type CitiesContextType = {
  cities: CityInterface[];
  isLoading: boolean;
  currentCity: CityInterface;
  getCity: (id: string | undefined) => void;
  createCity: (newCity: CityInterface) => void;
  deleteCity: (id: string) => void;
};

//Criando o Context
const CitiesContext = createContext<CitiesContextType>(null!);

const URL = "http://localhost:8000";

//Passando o children como prop e adicionando toda a lógica relacionada com a busca de dados de cidades na API
function CitiesProvider({ children }: CitiesProviderProps) {
  const [cities, setCities] = useState<CityInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState<any>({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("Error fetching data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id: string | undefined) {
    try {
      setIsLoading(true);
      const res = await fetch(`${URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity: CityInterface) {
    try {
      setIsLoading(true);
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch {
      alert("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id: string | undefined) {
    try {
      setIsLoading(true);
      await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      alert("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  }

  //Retornando o CitiesContext.Provider e os values que queremos que a aplicação tenha acesso, dentro passamos o children pois essa func/componente vai englobar todo o App component
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

//criando o hook para fornecer os dados para os componentes filhos e centralizar essa lógica aqui, evitando a escrita de código desnecessário
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities Context was used outside Context Provider ");
  return context;
}

export { CitiesProvider, useCities };
