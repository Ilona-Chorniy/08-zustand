"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import css from './NotePreview.module.css';
import Modal from "@/components/Modal/Modal";

export default function NotePreviewClient() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note, Error>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id!),
    enabled: Boolean(id),
    refetchOnMount: false,
  });

  if (isLoading) return (
    <Modal onClose={() => router.back()}>
      <p>Loading, please wait...</p>
    </Modal>
  );

  if (error || !note) return (
    <Modal onClose={() => router.back()}>
      <p>Something went wrong.</p>
    </Modal>
  );

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            Created: {new Date(note.createdAt).toLocaleDateString()}
          </p>
          <button className={css.backBtn} onClick={() => router.back()}>Закрити</button>
        </div>
      </div>
    </Modal>
  );
}
