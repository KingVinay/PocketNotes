// src/GroupFormModal.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./CreateGroup.module.css";

const CreateGroup = ({ addGroup, closeModal }) => {
  const [groupName, setGroupName] = useState("");
  const [color, setColor] = useState("");
  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];
  const modalRef = useRef(null);

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/group/create",
        {
          groupName,
          groupColor: color,
        }
      );
      addGroup(response.data.savedGroup);
      closeModal();
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} ref={modalRef}>
        <h2>Create New Group</h2>
        <div className={styles.formRow}>
          <label>Group Name</label>
          <input
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <div className={styles.formRow}>
          <label>Choose Colour</label>
          <div className={styles.colorOptions}>
            {colors.map((col) => (
              <button
                key={col}
                className={styles.colorButton}
                style={{
                  backgroundColor: col,
                  border: color === col ? "1px solid black" : "none",
                }}
                onClick={() => setColor(col)}
              />
            ))}
          </div>
        </div>
        <button className={styles.createButton} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateGroup;
