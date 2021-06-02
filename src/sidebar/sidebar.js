import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import SidebarItemComponent from "../sidebaritem/sidebarItem";

function SidebarComponent(props) {
  const [addingNote, setAddingNote] = useState(false);
  const [title, setTitle] = useState(null);

  const newNoteBtnClick = () => {
    setAddingNote(!addingNote);
    // it is changed to false to change the text on button; conditional rendering
    setTitle(null);
  };

  const { notes, classes, selectedNoteIndex } = props;

  const updateTitle = (txt) => {
    setTitle(txt);
  };

  const newNote = () => {
    //this will go to parent in app.js
    props.newNote(title);
    setTitle(null);
    setAddingNote(false);
  };
  const selectNote = (n, i) => props.selectNote(n, i); //control will go to selectnote in app.js
  const deleteNote = (note) => {
    props.deleteNote(note);
  };

  if (notes) {
    return (
      <div className={classes.sidebarContainer}>
        <Button onClick={newNoteBtnClick} className={classes.newNoteBtn}>
          {addingNote ? "Cancel" : "New Note"}
        </Button>
        {addingNote ? (
          <div>
            <input
              type="text"
              className={classes.newNoteInput}
              placeholder="Enter note title"
              onKeyUp={(e) => updateTitle(e.target.value)}
            ></input>
            <Button className={classes.newNoteSubmitBtn} onClick={newNote}>
              Submit Note
            </Button>
          </div>
        ) : null}
        <List>
          {Array.isArray(notes) &&
            notes.map((_note, _index) => {
              return (
                <div key={_index}>
                  <SidebarItemComponent
                    _note={_note}
                    _index={_index}
                    selectedNoteIndex={selectedNoteIndex}
                    selectNote={selectNote}
                    deleteNote={deleteNote}
                  ></SidebarItemComponent>
                  <Divider></Divider>
                </div>
              );
            })}
        </List>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default withStyles(styles)(SidebarComponent);
