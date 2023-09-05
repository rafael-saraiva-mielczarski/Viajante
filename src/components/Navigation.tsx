import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import Logo from "./Logo";

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">Preço</NavLink>
        </li>
        <li>
          <NavLink to="/product">Produto</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Entrar
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
