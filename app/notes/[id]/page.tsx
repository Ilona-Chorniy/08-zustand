import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const { id } = await params;
    const note = await fetchNoteById(id);

    const shortDescription = note.content.length > 150
      ? note.content.substring(0, 150).trim() + "..."
      : note.content;

    const pageUrl = `https://08-zustand-smoky.vercel.app/notes/${id}`;

    return {
      title: note.title,
      description: shortDescription,
      openGraph: {
        title: note.title,
        description: shortDescription,
        url: pageUrl,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: note.title,
          },
        ],
        type: "article",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);

    return {
      title: "Note not found",
      description: "The requested note does not exist or has been deleted",
      openGraph: {
        title: "Note not found",
        description: "The requested note does not exist or has been deleted",
        url: "https://08-zustand-smoky.vercel.app/notes",
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "NoteHub",
          },
        ],
      },
    };
  }
}

export default async function NotePage({ params }: { params: Promise<{ id: string }> }) {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
