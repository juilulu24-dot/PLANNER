// src/planner/utils/helpers.js

// Génère un ID unique (simple)
export function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// Trie les tâches par priorité (haute > moyenne > basse)
export function sortTasksByPriority(tasks) {
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  return [...tasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}

// Calcule le taux de complétion des tâches
export function getCompletionRate(tasks) {
  if (!tasks.length) return 0;
  const completed = tasks.filter(t => t.completed).length;
  return Math.round((completed / tasks.length) * 100);
}

// Formate l'heure (ex: 14:00)
export function formatHour(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
