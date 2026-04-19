import css from './layout.module.css';

interface FilterLayoutProps {
  children: React.ReactNode;
  filters: React.ReactNode;
}

export default function FilterLayout({
  children,
  filters,
}: Readonly<FilterLayoutProps>) {
  return (
    <div className={css.container}>
      <div>{filters}</div>
      <div>{children}</div>
    </div>
  );
}
