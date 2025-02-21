"use client";

import { useEffect, useState } from "react";
import KanbanBoard from "../components/KanbanBoard";
import TaskForm from "../components/TaskForm";
import SignIn from "../components/SignIn";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showKanban, setShowKanban] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-6">AI-Powered Kanban Task Manager</h1>

      {!isAuthenticated ? (
        <SignIn />
      ) : showKanban ? ( 
        <KanbanBoard /> 
      ) : ( 
        <div className="w-full max-w-md">
          <TaskForm onTaskAdded={() => setShowKanban(true)} /> {/* ✅ Pass the function */}
        </div>
      )}
    </div>
  );
}
