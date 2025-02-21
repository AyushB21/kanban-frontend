import { useState } from "react";
import { signIn } from "../api/auth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      await signIn(email, password);
      alert("Login successful!");
      window.location.reload(); // Reload to reflect login state
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };  

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="border p-2 w-full"/>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="border p-2 w-full"/>
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">Sign In</button>
    </form>
  );
}
