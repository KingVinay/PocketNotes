import { useState } from "react";
import GroupList from "./Components/GroupList/GroupList";
import GroupNote from "./Components/GroupNote/GroupNote";
import "./App.css";

function App() {
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

export default App;
