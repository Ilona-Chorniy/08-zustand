"use client";

import css from "./NoteList.module.css";
import type { Note } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import toast from "react-hot-toast";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,

    onMutate: () => {
      toast.dismiss(); 
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note deleted successfully");
    },

    onError: (error) => {
      if (error instanceof Error) {
        toast.error(`Failed to delete note: ${error.message}`);
      } else {
        toast.error("An error occurred while deleting the note. Please try again.");
      }
    },
  });

  const handleDelete = (noteId: string) => {
    const isConfirmed = confirm("Are you sure you want to delete this note?");
    if (isConfirmed) {
      mutation.mutate(noteId);
    }
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li
          key={note.id}
          className={`${css.listItem} ${
            mutation.variables === note.id && mutation.status === "pending"
              ? css.deleting
              : ""
          }`}
        >
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link 
              className={css.link} 
              href={`/notes/${note.id}`}
              scroll={false}
            >
              View details
            </Link>

            <button
              className={css.button}
              onClick={() => handleDelete(note.id)}
              disabled={
                mutation.variables === note.id &&
                mutation.status === "pending"
              }
            >
              {mutation.variables === note.id &&
              mutation.status === "pending"
                ? "Deleting..."
                : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;