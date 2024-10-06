import React from "react";
import { Route, Routes } from "react-router-dom";
import TaskPage from "./pages/TaskPage.jsx";
import TaskForm from "./pages/TaskForm.jsx";
import NavBar from "./components/NavBar.jsx";
import { TaskContextProvider } from "./context/TaskContext";

function App() {
  return (
    <div className=".bg-gray-100 h-screen">
      <NavBar />
      <div className="container mx-auto py-4 px-20 .bg-gray-100">
        <TaskContextProvider>
          <Routes>
            <Route path="/" element={<TaskPage />} />
            <Route path="/new" element={<TaskForm />} />
            <Route path="/edit/:id" element={<TaskForm />} />
          </Routes>
        </TaskContextProvider>
      </div>
    </div>
  );
}

export default App;
