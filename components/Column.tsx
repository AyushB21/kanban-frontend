import React from "react";
import TaskCard from "./TaskCard";
import { Task } from "@/api/taskType"; // ✅ Import Task type from API

interface ColumnProps {
  title: string;
  status: string;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onTaskDrop: (taskId: string, newStatus: string) => void;
}

const Column: React.FC<ColumnProps> = ({ title, status, tasks, onTaskDrop }) => {
  // ✅ Filtering tasks correctly using `status`
  const filteredTasks = tasks.filter((task) => {
    console.log(`Checking Task: ${task.title}, Status: ${task.status}`);
    return task.status.toLowerCase() === status.toLowerCase();
  });

  console.log(`Tasks in ${status}:`, filteredTasks);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("taskId");
    console.log(`Task Dropped in ${status}:`, taskId);
    if (taskId) {
      onTaskDrop(taskId, status);
    }
  };

  const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      className="bg-gray-200 dark:bg-gray-800 p-4 rounded-md min-h-[200px]"
      onDrop={handleDrop}
      onDragOver={allowDrop}
    >
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {filteredTasks.length === 0 ? (
        <p className="text-gray-500">No tasks</p>
      ) : (
        filteredTasks.map((task) => <TaskCard key={task.id} task={task} />)
      )}
    </div>
  );
};

export default Column;
