import type { Metadata } from "next";
import { Roboto } from 'next/font/google';

import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import QueryProvider from "@/components/TanStackProvider/TanStackProvider";


const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});

export const metadata: Metadata = {
  title: "NoteHub - Your notes online",
  description: "NoteHub – save, edit and organise your notes quickly and conveniently.",
  openGraph: {
    title: "NoteHub - Your notes online",
    description: "NoteHub – save, edit and organise your notes quickly and conveniently.",
    images: [{
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      alt: 'NoteHub',
      width: 1200,
      height: 630,
  }]
  }
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <QueryProvider>
        <Header/>
        {children}
        {modal}
        <Footer/>
        </QueryProvider>
        <div id="modal-root" />
        
      </body>
    </html>
  );
}
