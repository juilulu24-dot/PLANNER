import React from "react";

export default function ProfilePage({ darkMode, setDarkMode, notifications, setNotifications }) {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Profil utilisateur</h1>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-800 dark:text-gray-200">Mode sombre</span>
          <button
            className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${darkMode ? "bg-blue-500" : "bg-gray-300"}`}
            onClick={() => setDarkMode(!darkMode)}
          >
            <span className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${darkMode ? "translate-x-6" : ""}`}></span>
          </button>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-800 dark:text-gray-200">Notifications</span>
          <button
            className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${notifications ? "bg-green-500" : "bg-gray-300"}`}
            onClick={() => setNotifications(!notifications)}
          >
            <span className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${notifications ? "translate-x-6" : ""}`}></span>
          </button>
        </div>
        <div className="pt-4 text-gray-500 dark:text-gray-400 text-sm">
            <div>Étudiant : <span className="font-semibold text-gray-700 dark:text-gray-200">Armel Evans</span></div>
          <div>Email : <span className="font-semibold text-gray-700 dark:text-gray-200">armel.evans@email.com</span></div>
        </div>
      </div>
    </div>
  );
}
