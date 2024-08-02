import { useState } from "react";
import GroupList from "../GroupList/GroupList";
import GroupNote from "../GroupNote/GroupNote";

function Dashboard() {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
  };

  return (
    <div>
      <GroupList onSelectGroup={handleGroupSelect} />
      <GroupNote selectedGroup={selectedGroup} />
    </div>
  );
}

export default Dashboard;
