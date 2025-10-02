import React from "react";
import { Home, Calendar, CheckCircle, User, Plus } from "lucide-react";

const NAV = [
  { key: "home", icon: Home, label: "Accueil" },
  { key: "schedule", icon: Calendar, label: "Emploi du temps" },
  { key: "tasks", icon: CheckCircle, label: "Tâches" },
  { key: "profile", icon: User, label: "Profil" },
];

export default function NavigationBar({ activeTab, setActiveTab, onAdd }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg flex justify-around items-center h-16 md:max-w-2xl md:mx-auto md:left-1/2 md:-translate-x-1/2 rounded-t-xl">
      {NAV.map(({ key, icon: Icon, label }) => (
        <button
          key={key}
          className={`flex flex-col items-center flex-1 py-2 transition-colors ${activeTab === key ? "text-blue-500" : "text-gray-400 dark:text-gray-500"}`}
          onClick={() => setActiveTab(key)}
        >
          <Icon size={24} />
          <span className="text-xs mt-1">{label}</span>
        </button>
      ))}
      <button
        className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg w-12 h-12 flex items-center justify-center border-4 border-white dark:border-gray-900 transition-all"
        onClick={onAdd}
        aria-label="Ajouter"
      >
        <Plus size={28} />
      </button>
    </nav>
  );
}
