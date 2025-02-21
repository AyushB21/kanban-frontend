"use client";
import React, { useState, useEffect } from "react";
import Column from "@/components/Column";
import { fetchTasks, updateTaskStatus } from "@/api/tasks";
import { Task } from "@/api/taskType"; // ✅ Import Task type from API

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // 🛠 Load tasks from API
  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      console.log("Fetched tasks:", data);
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // 🛠 Handle task drop
  const handleTaskDrop = async (taskId: string, newStatus: string) => {
    console.log("Dropped Task ID:", taskId, "New Status:", newStatus);

    try {
      await updateTaskStatus(taskId, newStatus);

      // ✅ Update state instantly
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id.toString() === taskId ? { ...task, status: newStatus } : task
        )
      );

      console.log("Updated tasks after drop:", tasks);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
      <Column title="To Do" status="pending" tasks={tasks} setTasks={setTasks} onTaskDrop={handleTaskDrop} />
      <Column title="In Progress" status="in-progress" tasks={tasks} setTasks={setTasks} onTaskDrop={handleTaskDrop} />
      <Column title="Done" status="done" tasks={tasks} setTasks={setTasks} onTaskDrop={handleTaskDrop} />
    </div>
  );
};

export default KanbanBoard;
