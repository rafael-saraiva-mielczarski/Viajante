// Uses the same styles as Product
import Navigation from "../components/Navigation";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <Navigation />
      <section>
        <div>
          <h2>
            Simples
            <br />
            Só 9R$/mês.
          </h2>
          <p>
            Guardando memórias nunca foi tão acessível e especial! Com o nosso
            Plano Mensal de 9 reais, você pode preservar momentos preciosos
            todos os meses. Não perca a oportunidade de transformar cada mês em
            uma cápsula do tempo digital. Inscreva-se agora e comece a salvar
            suas viagens!
          </p>
        </div>
        <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
