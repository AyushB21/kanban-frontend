const API_BASE_URL = "https://kanban-backend-9b4u.onrender.com/api";

export async function fetchTasks() {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch tasks");

    const data = await response.json();

    // 🛠 Ensure tasks have a valid `column` value
    return data.map((task: any) => ({
      ...task,
      column: task.column || task.status,
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createTask(title: string, status: string) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ title, status }),
    });

    if (!response.ok) throw new Error("Failed to create task");

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateTaskStatus(taskId: string, newStatus: string) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/move`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) throw new Error("Failed to update task status");

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
