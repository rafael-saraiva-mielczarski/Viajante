import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";
import { app } from "../libs/firebase";
import { ReactNode, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextType = {
  login: (email: string, password: string) => void;
  signUp: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>(null!);

function AuthProvider({ children }: AuthProviderProps) {
  const userRef = ref(getDatabase(app));
  const auth = getAuth();
  getDatabase(app);
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  function signUp(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const newUserRef = push(userRef);
        console.log(isAuthenticated);
        set(newUserRef, {
          userId: userCredential.user.uid,
          name: userCredential.user.displayName,
          email: userCredential.user.email,
        });
        setIsAuthenticated(true);
        navigate("/app");
      })
      .catch((error) => {
        setIsAuthenticated(false);
        switch (error.code) {
          case "auth/email-already-in-use":
            return alert("Email já esta sendo usado!");
          case "auth/invalid-email":
            return alert("Email inválido!");
          default:
            throw alert("Erro desconhecido");
        }
      });
  }

  function login(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        setIsAuthenticated(true);
        navigate("/app");
      })
      .catch((error) => {
        setIsAuthenticated(false);
        switch (error.code) {
          case "auth/wrong-password":
            return alert("Senha Errada!");
          case "auth/user-not-found":
            return alert("Usuário não encontrado!");
          case "auth/user-disabled":
            return alert("Usuário desabilitado!");
          default:
            throw alert("Erro desconhecido");
        }
      });
  }

  function logout() {
    signOut(auth)
      .then(() => {
        console.log(isAuthenticated);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <AuthContext.Provider value={{ login, signUp, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Auth Context usado fora do Provider");
  return context;
}

export { AuthProvider, useAuth };
