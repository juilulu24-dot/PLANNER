import React from "react";
import ProgressCircle from "../components/ProgressCircle";
import { getCompletionRate } from "../utils/helpers";

export default function HomePage({ courses, tasks }) {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const nextCourses = courses.filter(c => c.day === today.getDay());
  const overdueTasks = tasks.filter(t => !t.completed && t.due < todayStr);
  const completion = getCompletionRate(tasks);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Résumé de la journée</h1>
      <div className="flex items-center gap-4 mb-6">
        <ProgressCircle value={completion} />
        <div>
          <div className="text-lg font-semibold text-gray-700 dark:text-gray-200">Tâches complétées</div>
          <div className="text-3xl font-bold text-blue-500 dark:text-blue-400">{completion}%</div>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Prochains cours</h2>
        {nextCourses.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400">Aucun cours aujourd’hui.</div>
        ) : (
          <ul className="space-y-2">
            {nextCourses.map(c => (
              <li key={c.id} className={`rounded-lg shadow p-3 flex items-center gap-3 ${c.color} bg-opacity-20`}>
                <span className={`w-2 h-8 rounded bg-opacity-80 ${c.color}`}></span>
                <div>
                  <div className="font-bold">{c.title}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">{c.start} - {c.end} | Salle {c.room}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Tâches en retard</h2>
        {overdueTasks.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400">Aucune tâche en retard.</div>
        ) : (
          <ul className="space-y-2">
            {overdueTasks.map(t => (
              <li key={t.id} className="rounded-lg shadow p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200">
                {t.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
