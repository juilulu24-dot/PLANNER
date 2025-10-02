import React, { useState } from "react";
import StudentDayPlanner from "./planner/StudentDayPlanner";
import AuthPage from "./planner/pages/AuthPage";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);

  const handleAuth = (jwt, userData) => {
    setToken(jwt);
    setUser(userData);
    localStorage.setItem("token", jwt);
  };

  const handleLogout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  if (!token) {
    return <AuthPage onAuth={handleAuth} />;
  }

  return <StudentDayPlanner token={token} user={user} onLogout={handleLogout} />;
}
