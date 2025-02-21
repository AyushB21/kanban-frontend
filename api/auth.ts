const API_BASE_URL = "Endpoint backend";

export async function signUp(name: string, email: string, password: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Signup failed");

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Login failed");

    localStorage.setItem("token", data.token); // Store JWT token

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function logout() {
  localStorage.removeItem("token");
}
