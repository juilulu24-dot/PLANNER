import React, { useState } from "react";
import { formatHour } from "../utils/helpers";

const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

export default function SchedulePage({ courses }) {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());

  const weekCourses = days.map((_, idx) =>
    courses.filter(c => c.day === idx)
  );

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Emploi du temps</h1>
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {days.map((d, idx) => (
          <button
            key={d}
            className={`px-3 py-1 rounded-full font-medium transition-colors duration-200 ${selectedDay === idx ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`}
            onClick={() => setSelectedDay(idx)}
          >
            {d.slice(0, 3)}
          </button>
        ))}
      </div>
      <div>
        {weekCourses[selectedDay].length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400">Aucun cours ce jour.</div>
        ) : (
          <ul className="space-y-3">
            {weekCourses[selectedDay].map(c => (
              <li key={c.id} className={`rounded-lg shadow p-4 flex items-center gap-4 ${c.color} bg-opacity-20`}> 
                <span className={`w-2 h-10 rounded bg-opacity-80 ${c.color}`}></span>
                <div>
                  <div className="font-bold">{c.title}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">{c.start} - {c.end} | Salle {c.room}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
