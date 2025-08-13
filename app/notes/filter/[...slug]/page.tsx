import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/lib/api";
import { NoteTag } from "@/types/note";

export default async function NotesPage({ params }: { params: Promise<{ slug?: NoteTag[] | ['All'] }> }) {
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
