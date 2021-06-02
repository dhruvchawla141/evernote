import React, { useEffect, useState } from "react";
import "./App.css";
import projectFirestore from "./firebase/config";
import { Button, withStyles } from "@material-ui/core";
import firebase from "firebase/app";
import EditorComponent from "./editor/editor";
import SidebarComponent from "./sidebar/sidebar";

function App() {
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState(null);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);

  useEffect(() => {
    //go into firebase, grab all notes, and set state with notes
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot((serverUpdate) => {
        //onsnapshot is automatic called when notes collection is update
        const notes = serverUpdate.docs.map((_doc) => {
          const data = _doc.data();
          data["id"] = _doc.id;
          return data;
        });
        console.log(notes);
        setNotes(notes);
      });
  }, []);

  const selectNote = (note, index) => {
    setSelectedNote(note);
    setSelectedNoteIndex(index);
  };

  const noteUpdate = (id, noteObj) => {
    firebase.firestore().collection("notes").doc(id).update({
      title: noteObj.title,
      body: noteObj.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const deleteNote = async (note) => {
    const noteIndex = notes.indexOf(note);
    await setNotes(notes.filter((_note) => _note !== note));
    //if note is selected, it is necesary to deselct the note first and then resetting the state, else it will show in quill or may throw server error
    if (selectedNoteIndex === noteIndex) {
      setSelectedNoteIndex(null);
      setSelectedNote(null);
    } else {
      notes.length > 1
        ? selectNote(notes[selectedNoteIndex - 1], selectedNoteIndex - 1)
        : setSelectedNoteIndex(null);
      setSelectedNote(null);
    }

    firebase.firestore().collection("notes").doc(note.id).delete();
  };

  const newNote = async (title) => {
    //fn for making new note
    const note = {
      title: title,
      body: "",
    };

    const newFromDB = await firebase.firestore().collection("notes").add({
      title: note.title,
      body: note.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    const newID = newFromDB.id; //auto id to grab response
    await setNotes({ notes: [...notes, note] });
    //indexOf fn of array obj that finds the index of particulat item inside array and what I am doing is I am iterating with the help of filter where note.id = newId, so if I got newId in notes then I am selecting it automatically
    const newNoteIndex = notes.indexOf(
      notes.filter((_note) => _note.id === newID)[0]
    );
    setSelectedNote(notes[newNoteIndex]);
    setSelectedNoteIndex(newNoteIndex);

    // so when I want to create a new note, this will go to firebase, add new note and then it update the selected note with the one I created
  };

  return (
    <div className="App">
      <SidebarComponent
        selectedNoteIndex={selectedNoteIndex}
        notes={notes}
        deleteNote={deleteNote}
        selectNote={selectNote}
        newNote={newNote}
      ></SidebarComponent>
      {selectedNote ? (
        <EditorComponent
          key={selectedNoteIndex}
          selectedNote={selectedNote}
          selectedNoteIndex={selectedNoteIndex}
          notes={notes}
          noteUpdate={noteUpdate}
        ></EditorComponent>
      ) : null}
    </div>
  );
}

export default App;
