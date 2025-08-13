'use client'
import Link from 'next/link';
import css from './TagsMenu.module.css'
import type { NoteTag } from "@/types/note";
import { useState } from 'react';


export default function TagsMenu(){

const tags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
const [isOpen, setOpen] = useState(false)
    return(
        <div className={css.menuContainer}>
    <button className={css.menuButton} onClick={() => setOpen(!isOpen)}>
    Notes ▾
    </button>
    {isOpen && (
    <ul className={css.menuList}>
        <li className={css.menuItem}>
        <Link href="/notes/filter/All" className={css.menuLink} 
        onClick={() => setOpen(false)}>
            All 
        </Link>
        </li>
        {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink} onClick={() => setOpen(false)}>
            {tag}
            </Link>
        </li>
        ))}
    </ul>
    )}
</div>
    )
}