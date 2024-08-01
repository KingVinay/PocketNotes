// src/GroupList.js
import React, { useState, useEffect } from "react";
// import axios from 'axios';
import styles from "./GroupList.module.css";
import CreateGroup from "../CreateGroup/CreateGroup";

const GroupList = ({ onSelectGroup }) => {
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedGroupName, setSelectedGroupName] = useState("");

  const fetchGroups = async () => {
    // Fetch groups from the backend if needed
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const addGroup = (group) => {
    setGroups([...groups, group]);
  };

  const handleGroupClick = (group) => {
    setSelectedGroupName(group.name);
    onSelectGroup(group);
  };

  return (
    <div className={styles.groupList}>
      <div className={styles.header}>
        <h2>Pocket Notes</h2>
      </div>
      <div className={styles.groups}>
        {groups.map((group, index) => (
          <div
            key={index}
            className={`${styles.groupCard} ${
              selectedGroupName === group.name ? styles.selected : ""
            }`}
            onClick={() => handleGroupClick(group)}
          >
            <div
              className={styles.groupInitials}
              style={{ backgroundColor: group.color }}
            >
              {group.name
                .split(" ")
                .map((word) => word[0].toUpperCase())
                .join("")
                .slice(0, 2)}
            </div>
            <span className={styles.groupName}>{group.name}</span>
          </div>
        ))}
      </div>
      <button className={styles.addButton} onClick={() => setModalOpen(true)}>
        +
      </button>
      {isModalOpen && (
        <CreateGroup
          addGroup={addGroup}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default GroupList;
