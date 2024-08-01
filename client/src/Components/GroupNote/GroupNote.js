import React from "react";
import GroupCard from "../GroupCard/GroupCard";
import styles from "./GroupNote.module.css";
import CardImg from "../../Assets/noteimage.png";
import LockImg from "../../Assets/lock.png";

const GroupNote = ({ selectedGroup }) => {
  return (
    <div className={styles.groupNote}>
      {selectedGroup ? (
        <GroupCard group={selectedGroup} />
      ) : (
        <div className={styles.defaultView}>
          <img
            src={CardImg}
            alt="Pocket Notes"
            className={styles.defaultImage}
          />
          <h1>Pocket Notes</h1>
          <p>
            Send and receive messages without keeping your phone online. Use
            Pocket Notes on up to 4 linked devices and 1 mobile phone.
          </p>
          <div className={styles.encryptionInfo}>
            <img src={LockImg} alt="lock" className={styles.lockIcon} />
            <span>end-to-end encrypted</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupNote;
