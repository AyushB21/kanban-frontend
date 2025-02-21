import { useState } from "react";
import { signUp } from "../api/auth";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      await signUp(name, email, password);
      alert("Account created successfully!");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };
  

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required className="border p-2 w-full"/>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="border p-2 w-full"/>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="border p-2 w-full"/>
      <button type="submit" className="bg-green-500 text-white p-2 w-full">Sign Up</button>
    </form>
  );
}
