import React from 'react'
import { useContext,useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import { NoteItem } from './NoteItem';
import { Addnote } from "./Addnote";


export const Notes = () => {
    const context = useContext(NoteContext);

    //addnote from the notestate to notecontext
    const {notes, getNotes}= context;
    useEffect(() => {
     getNotes();
     // eslint-disable-next-line
    }, [])
    return (
        <>
        <Addnote/>
        <div className="row mx-3 my-3">
        {notes.map((note)=>
        {
          return <NoteItem key={note._id} note={note} updateNote={updatenote}/>
        })}
      </div>
      </>
    )
}
