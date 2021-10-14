import Notecontext from "./NoteContext";
import { useState } from "react";
import React from "react";
const Notestate =(props)=>
{
    const s1 = {
        "name" : "yogesh",
        "address" : "butwal"
    }
    const [state, setstate] = useState(s1);
    const update= ()=>{
        setTimeout(() => {
            setstate(
                {
                    "name" : "pandu",
                    "address" : "kathmandu"
                }
            )
        }, 2000);
    }
    return(
        // provides states to notecontext
        <Notecontext.Provider value ={{state,update}}>
            {props.children}
        </Notecontext.Provider>
    )
}
export default Notestate;