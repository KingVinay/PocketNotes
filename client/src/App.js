import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Dashboard from "./Components/Dashboard/Dashboard";
import Group from "./Components/Group/Group";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Note from "./Components/Note/Note";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/groups/:groupId" element={<Group />} />
          <Route path="/:groupId/notes/:noteId" element={<Note />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
