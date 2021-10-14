import React, {useContext, useEffect} from 'react'
import NoteContext from '../context/notes/NoteContext';
export const About = () => {
    const a = useContext(NoteContext);
    useEffect(() => {
       a.update();
       // eslint-disable-next-line 
    }, [])
    return (
        <div>
            This is About. {a.state.name} and I live in {a.state.address}
        </div>
    )
}