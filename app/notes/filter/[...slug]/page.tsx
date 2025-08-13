import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/lib/api";
import { NoteTag } from "@/types/note";
import type { Metadata } from 'next';

interface NotesPageProps {
  params: Promise<{ slug?: NoteTag[] | ['All'] }>;
}

export async function generateMetadata({ params }: NotesPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tag = resolvedParams.slug?.[0] === 'All' ? 'All notes' : resolvedParams.slug?.[0] ?? 'Unknown filter';

  return {
    title: `NoteHub – Notes with filter: ${tag}`,
    description: `Review notes filtered by tag: ${tag}`,
    openGraph: {
      title: `NoteHub – Notes with filter: ${tag}`,
      description: `Review notes filtered by tag: ${tag}`,
      url: `https://08-zustand-smoky.vercel.app/notes/filter/${resolvedParams.slug?.join('/') ?? ''}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          alt: `Notes filtered by ${tag}`,
          width: 1200,
          height: 630
        }
      ]
    }
  };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const resolvedParams = await params;
  let tag = resolvedParams.slug?.[0];

  if (tag === "All") {
    tag = undefined;
  }

  let initialData: FetchNotesResponse;

  try {
    initialData = await fetchNotes({
      page: 1,
      perPage: 12,
      ...(tag ? { tag } : {})
    });
  } catch {
    initialData = {
      notes: [],
      totalPages: 0
    };
  }

  return <NotesClient initialData={initialData} tag={tag} />;
}
