import React from "react";

interface Task {
  id: string;
  title: string;
  status: string;
}

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("taskId", task.id);
  };

  return (
    <div
      className="p-3 border rounded-md bg-white shadow-md dark:bg-gray-700 cursor-pointer"
      draggable
      onDragStart={handleDragStart}
    >
      <p className="text-sm font-medium">{task.title}</p>
    </div>
  );
};

export default TaskCard;
