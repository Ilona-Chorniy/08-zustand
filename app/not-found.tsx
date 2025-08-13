import css from './Home.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "404 – Page not found",
  description: "Unfortunately, this page does not exist.",
  openGraph: {
    title: "404 – Page not found",
    description: "Unfortunately, this page does not exist.",
    url: "https://08-zustand-smoky.vercel.app/404",
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        alt: 'Page not found',
        width: 1200,
        height: 630,
      }
    ]
  }
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </>
  )
}
