import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./GroupCard.module.css";
import SendImg from "../../Assets/send.png";
import ShareImg from "../../Assets/share.png";
import formatDateTime from "../../Utils/FormatDateTime";

const GroupCard = ({ group }) => {
  const [notes, setNotes] = useState(group.notes || []);
  const [newNote, setNewNote] = useState("");

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/group/${group._id}/fetchnotes`
      );
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
    setNewNote("");
  }, [group]);

  const handleAddNote = async () => {
    if (newNote.trim() === "") return;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}/api/group/${group._id}/addNote`,
        {
          content: newNote,
        }
      );

      setNotes([...notes, response.data.savedNote]);
      setNewNote("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleGroupShare = async (groupId) => {
    try {
      const response = await axios(
        `${process.env.REACT_APP_BACKEND_HOST}/api/group/shareGroup/${groupId}`
      );
      navigator.clipboard.writeText(response.data.shareableLink);
    } catch (error) {
      console.error("Error sharing quiz:", error);
    }
  };

  const handleNoteShare = async (noteId) => {
    try {
      const response = await axios(
        `${process.env.REACT_APP_BACKEND_HOST}/api/group/shareNote/${noteId}`
      );
      navigator.clipboard.writeText(response.data.shareableLink);
    } catch (error) {
      console.error("Error sharing quiz:", error);
    }
  };

  return (
    <div className={styles.groupCard}>
      <div className={styles.header}>
        <div
          className={styles.initials}
          style={{ backgroundColor: group.groupColor }}
        >
          {group.groupName
            .split(" ")
            .map((word) => word[0].toUpperCase())
            .join("")
            .slice(0, 2)}
        </div>
        <span className={styles.groupName}>{group.groupName}</span>
        <img
          src={ShareImg}
          className={styles.shareGroupImg}
          alt="share"
          onClick={() => handleGroupShare(group._id)}
        />
      </div>
      <div className={styles.notesContainer}>
        {notes.map((note, index) => (
          <div key={index} className={styles.noteCard}>
            <div className={styles.noteContent}>{note.content}</div>
            <div className={styles.noteDate}>
              <img
                src={ShareImg}
                className={styles.shareNoteImg}
                alt="share"
                onClick={() => handleNoteShare(note._id)}
              />
              <p>{formatDateTime(note.createdAt).formattedDate}</p>
              <p className={styles.bulletList}></p>
              <p>{formatDateTime(note.createdAt).formattedTime}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <textarea
          rows={5}
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter your text here.........."
          className={styles.inputField}
        />
        <button
          className={styles.sendButton}
          onClick={handleAddNote}
          disabled={newNote.trim() === ""}
        >
          <img src={SendImg} alt="send" />
        </button>
      </div>
    </div>
  );
};

export default GroupCard;
