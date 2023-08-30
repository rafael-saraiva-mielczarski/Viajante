import { ReactNode, useContext } from "react";
import { createContext } from "react";
import { useState, useEffect } from "react";

type CitiesProviderProps = {
  children: ReactNode;
};

type CitiesContextType = {
  cities: any;
  isLoading: boolean;
};

//Criando o Context
const CitiesContext = createContext<CitiesContextType>(null!);

const URL = "http://localhost:8000";

//Passando o children como prop e adicionando toda a lógica relacionada com a busca de dados de cidades na API
function CitiesProvider({ children }: CitiesProviderProps) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  //Retornando o CitiesContext.Provider e os values que queremos que a aplicação tenha acesso, dentro passamos o children pois essa func/componente vai englobar todo o App component
  return (
    <CitiesContext.Provider value={{ cities, isLoading }}>
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
