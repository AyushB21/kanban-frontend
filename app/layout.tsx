"use client";

import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Navbar />
        <main className="p-6">
          {!token ? (
            showSignUp ? <SignUp /> : <SignIn />
          ) : (
            children
          )}
          {!token && (
            <button
              onClick={() => setShowSignUp(!showSignUp)}
              className="mt-4 text-blue-500 underline"
            >
              {showSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </button>
          )}
        </main>
      </body>
    </html>
  );
}
