import NoteCard from "../components/NoteCard";
import { db } from "../appwrite/databases";
import { useEffect, useState } from "react";

const NotesPage = () => {
    const [notes, setNotes] = useState(null);
    
    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        const response = await db.notes.list();
        setNotes(response.documents);
    }

    return (
        <div>
            {notes?.map(note => <NoteCard key={note.$id} note={note}/>)}
        </div>
    );
}

export default NotesPage;
