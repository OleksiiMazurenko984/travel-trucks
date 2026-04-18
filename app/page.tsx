import Link from 'next/link';
import css from './page.module.css';

export default function Home() {
  return (
    <section className={css.hero}>
      <div className={css.overlay}>
        <div className={css.content}>
          <h1 className={css.title}>Campers of your dreams</h1>
          <p className={css.subtitle}>
            You can find everything you want in our catalog
          </p>
          <Link className={css.view} href="/catalog">
            View Now
          </Link>
        </div>
      </div>
    </section>
  );
}
