import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

export default function Home() {
  return (
    <main className={styles.homepage}>
      <Navigation />
      <section>
        <h1>
          Você viaja o Mundo!
          <br />O WorldWise guarda suas aventuras.
        </h1>
        <h2>
          Um mapa mundi que guarda seus passos em cada cidade que consegue
          imaginar. Jamais esqueça suas experiências maravilhosas e mostre aos
          seus amigos como você visitou o mundo.
        </h2>
        <Link to="/app" className="cta">
          Comece a salvar suas viagens!
        </Link>
      </section>
    </main>
  );
}
