import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Group.module.css";
import ShareImg from "../../Assets/share.png";
import formatDateTime from "../../Utils/FormatDateTime";
import { useParams } from "react-router-dom";

function Group() {
  const { groupId } = useParams();
  const [group, setGroup] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/group/getGroupById/${groupId}`
        );
        console.log(response.data);
        setGroup(response.data);
        console.log(group);
        setNotes(group.notes);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroup();
  }, []);

  const handleNoteShare = async (noteId) => {
    try {
      const response = await axios(
        `http://localhost:4000/api/group/shareNote/${noteId}`
      );
      navigator.clipboard.writeText(response.data.shareableLink);
    } catch (error) {
      console.error("Error sharing quiz:", error);
    }
  };

  return (
    <div className={styles.groupCard}>
      <div className={styles.header}>
        {/* <div
          className={styles.initials}
          style={{ backgroundColor: group.groupColor }}
        >
          {group.groupName
            .split(" ")
            .map((word) => word[0].toUpperCase())
            .join("")
            .slice(0, 2)}
        </div> */}
        <span className={styles.groupName}>{group.groupName}</span>
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
    </div>
  );
}

export default Group;
