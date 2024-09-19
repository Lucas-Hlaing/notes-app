import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import { nanoid } from "nanoid"
import { notesCollection, db } from "./firebase"
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore"

export default function App() {
    const [notes, setNotes] = React.useState([])
    const [currentNoteId, setCurrentNoteId] = React.useState("")
    const [tempNoteText, setTempNoteText] = React.useState("")
    
    const currentNote = 
        notes.find(note => note.id === currentNoteId) 
        || notes[0]

    React.useEffect(() => {
        const unsubscribe = onSnapshot(notesCollection, (snapshot) => {
            //syncing up local notes with database (snapshot data)
            const newArr = snapshot.docs.map((doc => ({
                ...doc.data(),
                id: doc.id
            })))
            setNotes(newArr);
        })
        return unsubscribe;
    }, [])

    React.useEffect(() => {
        if(!currentNoteId) {
            setCurrentNoteId(notes[0]?.id)
        }
    }, [notes])

    React.useEffect(() => {
        if(currentNote) {
            setTempNoteText(currentNote.body)
        }
    }, [currentNote])

    React.useEffect(() => {
        const timeoutID = setTimeout(()=>{
            if(tempNoteText !== currentNote.body) {
                updateNote(tempNoteText)   
            }
        }, 500)
        return () => clearTimeout(timeoutID)
    }, [tempNoteText])

    async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        const newNoteRef = await addDoc(notesCollection, newNote)
        setCurrentNoteId(newNoteRef.id)
    }

    function compare(a, b) {
        if(a.updatedAt > b.updatedAt) {
            return -1;
        }else if (a.updatedAt < b.updatedAt) {
            return 1;
        }else {
            return 0;
        }
    }

    const sortedNotes = notes.sort(compare)

    async function updateNote(text) {
        const docRef = doc(db, "notes", currentNoteId);
        await setDoc(docRef, {body: text, updatedAt: Date.now()}, {merge: true})
    }

    async function deleteNote(noteId) {
        const docRef = doc(db, "notes", noteId);
        await deleteDoc(docRef)
    }

    return (
        <main>
            {
                notes.length > 0
                    ?
                    <Split
                        sizes={[30, 70]}
                        direction="horizontal"
                        className="split"
                    >
                        <Sidebar
                            notes={sortedNotes}
                            currentNote={currentNote}
                            setCurrentNoteId={setCurrentNoteId}
                            newNote={createNewNote}
                            deleteNote={deleteNote}
                        />
                        {
                            currentNoteId &&
                            notes.length > 0 &&
                            <Editor
                                tempNoteText={tempNoteText}
                                setTempNoteText={setTempNoteText}
                            />
                        }
                    </Split>
                    :
                    <div className="no-notes">
                        <h1>You have no notes</h1>
                        <button
                            className="first-note"
                            onClick={createNewNote}
                        >
                            Create one now
                </button>
                    </div>

            }
        </main>
    )
}
