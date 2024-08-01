import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./GroupList.module.css";
import CreateGroup from "../CreateGroup/CreateGroup";

const GroupList = ({ onSelectGroup }) => {
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedGroupName, setSelectedGroupName] = useState("");

  const fetchGroups = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/group/fetchgroups"
      );
      setGroups(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const addGroup = (group) => {
    setGroups([...groups, group]);
  };

  const handleGroupClick = (group) => {
    setSelectedGroupName(group.groupName);
    onSelectGroup(group);
  };

  return (
    <div className={styles.groupList}>
      <div className={styles.header}>
        <h2>Pocket Notes</h2>
      </div>
      <div className={styles.groups}>
        <input type="text" className={styles.searchInput} />
        {groups.map((group, index) => (
          <div
            key={index}
            className={`${styles.groupCard} ${
              selectedGroupName === group.groupName ? styles.selected : ""
            }`}
            onClick={() => handleGroupClick(group)}
          >
            <div
              className={styles.groupInitials}
              style={{ backgroundColor: group.groupColor }}
            >
              {group.groupName
                .split(" ")
                .map((word) => word[0].toUpperCase())
                .join("")
                .slice(0, 2)}
            </div>
            <span className={styles.groupName}>{group.groupName}</span>
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
