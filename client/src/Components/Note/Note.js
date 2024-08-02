import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Note.module.css";
import formatDateTime from "../../Utils/FormatDateTime";
import { useParams } from "react-router-dom";

function Note() {
  const { noteId } = useParams();
  const [note, setNote] = useState([]);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_HOST}/api/group/getNoteById/${noteId}`
        );
        setNote(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchNote();
  }, []);

  return (
    <div className={styles.noteCard}>
      <div className={styles.noteContent}>{note.content}</div>
      <div className={styles.noteDate}>
        <p>{formatDateTime(note.createdAt).formattedDate}</p>
        <p className={styles.bulletList}></p>
        <p>{formatDateTime(note.createdAt).formattedTime}</p>
      </div>
    </div>
  );
}

export default Note;
