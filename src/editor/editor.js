import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import debounce from "../helpers";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

function EditorComponent(props) {
  const [text, setText] = useState("");
  const [title, setTitle] = useState(props.selectedNote.title);
  const [id, setId] = useState(props.selectedNote.id);
  const classes = props;

  const updateBody = (val) => {
    props.noteUpdate(id, {
      title: title,
      body: val,
    });

    setText(val);
  };

  const debounce = (func, delay) => {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(null, args), delay);
    };
  };

  useEffect(() => {
    setText(props.selectedNote.body);
    setTitle(props.selectedNote.title);
    setId(props.selectedNote.id);
  }, []);

  useEffect(() => {
    if (props.selectedNote.id !== id) {
      setText(props.selectedNote.body);
      setTitle(props.selectedNote.title);
      setId(props.selectedNote.id);
    }
  }, []);

  const updateTitle = async (txt) => {
    await setTitle(txt);
  };

  return (
    <div className={classes.editorContainer}>
      <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
      <input
        className={classes.titleInput}
        placeholder="Note title...."
        value={title ? title : ""}
        onChange={(e) => updateTitle(e.target.value)}
      ></input>

      <ReactQuill
        value={text}
        onChange={debounce(updateBody, 1500)}
      ></ReactQuill>
    </div>
  );
}

export default withStyles(styles)(EditorComponent);
