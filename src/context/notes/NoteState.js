import Notecontext from "./NoteContext";
import React from "react";
import { useState } from "react";
const Notestate =(props)=>
{
  const host = "http://localhost:5000"
    const initial = []
      const [notes, setnotes] = useState(initial)

      //Fetch all the notes.
      const getNotes=async()=>{
                // API call
        // Example POST method implementation:
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2NTIxMGY1YzVmMTkzOWJjZGJkM2E3In0sImlhdCI6MTYzNDAzOTM4OH0.KmCXKyDlqUHTVD76_yHAHmTJJZxnWMa17oxnxbAqlnU'
          }
        }); 
        const json = await response.json();
        setnotes(json)
      }


      //Add a note
      const addNote =async (title,description,tag)=>
      {
          // todo API calls
          const response = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2NTIxMGY1YzVmMTkzOWJjZGJkM2E3In0sImlhdCI6MTYzNDAzOTM4OH0.KmCXKyDlqUHTVD76_yHAHmTJJZxnWMa17oxnxbAqlnU'
            },
            
            body: JSON.stringify({title,description,tag})
          }); 

          console.log(response.json);
        const note = {
            "_id": "616576fca17a4ba773c3017b",
            "user": "6165210f5c5f1939bcdbd3a7",
            "title": title,
            "tag": tag,
            "description": description,
            "date": "2021-10-12T11:52:28.779Z",
            "__v": 0
          }
        setnotes(notes.concat(note))
      }

      //Delete a Note
      const deleteNote = async (id)=>
      {
        // todo API calls
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2NTIxMGY1YzVmMTkzOWJjZGJkM2E3In0sImlhdCI6MTYzNDAzOTM4OH0.KmCXKyDlqUHTVD76_yHAHmTJJZxnWMa17oxnxbAqlnU'
          }
        }); 
          const json =await response.json();
          console.log(json);
          console.log("deleting the user with id"+id);
          const newnotes= notes.filter((note)=>{return note._id!==id })
          setnotes(newnotes);
      }


      //Edit a Note
      const editNote =async (id,title,description,tag) =>
      {
        // API call
          const response = await fetch(`${host}/api/notes/updatenote/6165767fa17a4ba773c60173`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({title,description,tag})
          }); 

        // Logic to edit in client side.
          for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if(element._id===id){
              element.title = title;
              element.description = description;
              element.tag = tag;
            }
          }
      }


    return(
        // provides states to notecontext
        <Notecontext.Provider value ={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </Notecontext.Provider>
    )
}
export default Notestate;