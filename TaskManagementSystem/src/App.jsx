import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Auth from "./Components/Auth/Auth";
import Welcome from "./Components/Welcome";
import Dashboard from "./Components/Dashboard/Dashboard";
import AddTask from "./Components/TaskMng/AddTask";
import ManageTasks from "./Components/TaskMng/ManageTasks";
import ProgressTracker from "./Components/TaskMng/ProgressTracker";
import Layout from "./Components/Layout";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/add-task" element={<AddTask />} />
          <Route path="/manage-tasks" element={<ManageTasks />} />
          <Route path="/track-progress" element={<ProgressTracker />} />

          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
