import Link from 'next/link';
import Image from 'next/image';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <Link className={css.logo} href="/">
        <Image
          alt="TravelTrucks logo"
          src="/logo.svg"
          height={16}
          width={136}
        />
      </Link>

      <nav className={css.nav}>
        <Link className={css.link} href="/">
          Home
        </Link>
        <Link className={css.link} href="/catalog">
          Catalog
        </Link>
      </nav>
    </header>
  );
}
