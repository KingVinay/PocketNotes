// src/GroupCard.js
import React, { useState } from "react";
import axios from "axios";
import styles from "./GroupCard.module.css";

const GroupCard = ({ group }) => {
  const [notes, setNotes] = useState(group.notes || []);
  const [newNote, setNewNote] = useState("");

  const handleAddNote = async () => {
    if (newNote.trim() === "") return;

    try {
      const response = await axios.post(
        "http://localhost:4000/api/group/addnote",
        {
          groupId: group.id,
          content: newNote,
        }
      );
      setNotes([...notes, response.data]);
      setNewNote("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div className={styles.groupCard}>
      <div className={styles.header} style={{ backgroundColor: group.color }}>
        <div className={styles.initials}>
          {group.name
            .split(" ")
            .map((word) => word[0].toUpperCase())
            .join("")
            .slice(0, 2)}
        </div>
        <span className={styles.groupName}>{group.name}</span>
      </div>
      <div className={styles.notesContainer}>
        {notes.map((note, index) => (
          <div key={index} className={styles.noteCard}>
            <div className={styles.noteContent}>{note.content}</div>
            <div className={styles.noteDate}>
              {new Date(note.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Type a note"
          className={styles.inputField}
        />
        <button
          className={styles.sendButton}
          onClick={handleAddNote}
          disabled={newNote.trim() === ""}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default GroupCard;
