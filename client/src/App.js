import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Dashboard from "./Components/Dashboard/Dashboard";
import Group from "./Components/Group/Group";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/groups/:groupId" element={<Group />} />

          {/* <Route path="/group/:groupId" element={<Quiz />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
