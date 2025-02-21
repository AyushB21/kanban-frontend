import { useState } from "react";
import { createTask } from "../api/tasks";

interface TaskFormProps {
  onTaskAdded: () => void; // ✅ Define the prop
}

export default function TaskForm({ onTaskAdded }: TaskFormProps) { // ✅ Receive it
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("To Do");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createTask(title, status);
      alert("Task added!");
      setTitle("");
      onTaskAdded(); // ✅ Call the function to switch to Kanban
    } catch (error) {
      console.error(error);
      alert("Failed to add task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" required className="border p-2 w-full"/>
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 w-full">
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">Add Task</button>
    </form>
  );
}
