import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StateList from "./components/stateList";
import DocumentList from "./components/documentList";

const App = () => {
  return (
    <Router>
      <div style={{ padding: "24px" }}>
        <Routes>
          <Route path="/*" element={<StateList />} />
          <Route path="/documents/:employeeId" element={<DocumentList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;