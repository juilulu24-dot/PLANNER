import React from "react";
import { sortTasksByPriority } from "../utils/helpers";

const PRIORITY_LABELS = {
  high: "Haute",
  medium: "Moyenne",
  low: "Basse",
};
const PRIORITY_COLORS = {
  high: "border-red-500",
  medium: "border-yellow-500",
  low: "border-green-500",
};

export default function TasksPage({ tasks, setTasks }) {
  const sorted = sortTasksByPriority(tasks);

  const toggleTask = (id) => {
    setTasks(ts => ts.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Tâches</h1>
      <ul className="space-y-3">
        {sorted.map(t => (
          <li key={t.id} className={`rounded-lg shadow p-4 flex items-center gap-4 border-l-4 ${PRIORITY_COLORS[t.priority]} bg-white dark:bg-gray-800 transition-all duration-200`}> 
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTask(t.id)}
              className="w-5 h-5 accent-blue-500 mr-2"
            />
            <div className="flex-1">
              <div className={`font-semibold ${t.completed ? "line-through text-gray-400" : "text-gray-900 dark:text-gray-100"}`}>{t.title}</div>
              <div className="text-xs text-gray-500 dark:text-gray-300">Priorité : {PRIORITY_LABELS[t.priority]}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
