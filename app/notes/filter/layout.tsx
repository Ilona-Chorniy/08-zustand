import css from './LayoutNotes.module.css';

export default function SidebarLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className={css.container}>
      <div className={css.sidebar}>{sidebar}</div>
      <main className={css.notesWrapper}>{children}</main>
    </div>
  );
}
