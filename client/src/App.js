import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Dashboard from "./Components/Dashboard/Dashboard";
import Group from "./Components/Group/Group";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/groups/:groupId" element={<Group />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
