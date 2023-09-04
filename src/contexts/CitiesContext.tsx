import { ReactNode, useContext, useReducer } from "react";
import { createContext } from "react";
import { useEffect } from "react";
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

type initialStateType = {
  cities: CityInterface[];
  isLoading: boolean;
  currentCity?: any;
  error: string;
};

type Action =
  | { type: "loading" }
  | { type: "cities/loaded"; payload: CityInterface[] }
  | { type: "city/loaded"; payload: CityInterface }
  | { type: "city/created"; payload: CityInterface }
  | { type: "city/deleted"; payload: string | undefined }
  | { type: "rejected"; payload: string };

//Criando o Context
const CitiesContext = createContext<CitiesContextType>(null!);

const URL = "http://localhost:8000";

const initialState: initialStateType = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state: initialStateType, action: Action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unexpected Action");
  }
}

function CitiesProvider({ children }: CitiesProviderProps) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error fetching cities",
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id: string | undefined) {
    if (Number(id) === currentCity.id) return;

    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error fetching city",
      });
    }
  }

  async function createCity(newCity: CityInterface) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error fetching cities",
      });
    }
  }

  async function deleteCity(id: string | undefined) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error fetching cities",
      });
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
