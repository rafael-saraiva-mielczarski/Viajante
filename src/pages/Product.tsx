import Navigation from "../components/Navigation";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <Navigation />
      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>Sobre o Viajante.</h2>
          <p>
            Explore um mundo de memórias de viagem conosco! Com recursos
            incríveis, nossa plataforma torna fácil guardar e reviver cada
            aventura:
          </p>
          <p>
            Diário de Viagem: Registre cada detalhe de suas jornadas, de lugares
            a pessoas e experiências inesquecíveis.
          </p>
          <p>
            Mapas Interativos: Veja suas viagens em mapas interativos,
            destacando os lugares que você visitou.
          </p>
          <p>
            Compartilhamento Simples: Compartilhe suas memórias com amigos e
            familiares, permitindo que eles se juntem à sua jornada.
          </p>
          <p>
            Backup Seguro: Mantenha suas memórias protegidas com backups
            automáticos e seguros.
          </p>
          <p>
            Com nosso aplicativo, suas viagens se tornam histórias cativantes
            que podem ser revividas a qualquer momento. Baixe agora e comece a
            criar seu próprio museu de aventuras!
          </p>
        </div>
      </section>
    </main>
  );
}
