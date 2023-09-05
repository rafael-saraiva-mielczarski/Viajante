import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { login, signUp } = useAuth();

  function handleLogin(e: any) {
    e.preventDefault();
    if (email && password) {
      login(email, password);
      navigate("/app");
    }
  }

  function handleSignup(e: any) {
    e.preventDefault();
    if (email && password) {
      signUp(email, password);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <Navigation />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary" onClick={handleSignup}>
            Registrar
          </Button>
          <span style={{ marginRight: "20px" }}></span>
          <Button type="primary" onClick={handleLogin}>
            Entrar
          </Button>
        </div>
      </form>
    </main>
  );
}
