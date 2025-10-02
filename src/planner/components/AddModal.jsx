import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AddModal({ onClose, onAdd }) {
  const [type, setType] = React.useState("task");
  const [title, setTitle] = React.useState("");
  const [priority, setPriority] = React.useState("medium");
  const [room, setRoom] = React.useState("");
  const [color, setColor] = React.useState("bg-blue-400");
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState("");
  const [day, setDay] = React.useState(new Date().getDay());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "task") {
      onAdd({ title, priority, due: new Date().toISOString().split("T")[0] }, "task");
    } else {
      onAdd({ title, room, color, start, end, day: Number(day) }, "course");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.form
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-sm relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          onSubmit={handleSubmit}
        >
          <button type="button" className="absolute top-2 right-2 text-gray-400 hover:text-red-500" onClick={onClose}>&times;</button>
          <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Ajouter {type === "task" ? "une tâche" : "un cours"}</h2>
          <div className="mb-3 flex gap-2">
            <button type="button" className={`flex-1 py-1 rounded ${type === "task" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`} onClick={() => setType("task")}>Tâche</button>
            <button type="button" className={`flex-1 py-1 rounded ${type === "course" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`} onClick={() => setType("course")}>Cours</button>
          </div>
          <input required className="w-full mb-3 p-2 rounded border dark:bg-gray-700 dark:text-gray-100" placeholder={type === "task" ? "Titre de la tâche" : "Nom du cours"} value={title} onChange={e => setTitle(e.target.value)} />
          {type === "task" ? (
            <select className="w-full mb-3 p-2 rounded border dark:bg-gray-700 dark:text-gray-100" value={priority} onChange={e => setPriority(e.target.value)}>
              <option value="high">Priorité haute</option>
              <option value="medium">Priorité moyenne</option>
              <option value="low">Priorité basse</option>
            </select>
          ) : (
            <>
              <input className="w-full mb-3 p-2 rounded border dark:bg-gray-700 dark:text-gray-100" placeholder="Salle" value={room} onChange={e => setRoom(e.target.value)} />
              <div className="flex gap-2 mb-3">
                <input type="time" className="flex-1 p-2 rounded border dark:bg-gray-700 dark:text-gray-100" value={start} onChange={e => setStart(e.target.value)} />
                <input type="time" className="flex-1 p-2 rounded border dark:bg-gray-700 dark:text-gray-100" value={end} onChange={e => setEnd(e.target.value)} />
              </div>
              <select className="w-full mb-3 p-2 rounded border dark:bg-gray-700 dark:text-gray-100" value={day} onChange={e => setDay(e.target.value)}>
                <option value={1}>Lundi</option>
                <option value={2}>Mardi</option>
                <option value={3}>Mercredi</option>
                <option value={4}>Jeudi</option>
                <option value={5}>Vendredi</option>
                <option value={6}>Samedi</option>
                <option value={0}>Dimanche</option>
              </select>
              <select className="w-full mb-3 p-2 rounded border dark:bg-gray-700 dark:text-gray-100" value={color} onChange={e => setColor(e.target.value)}>
                <option value="bg-blue-400">Bleu</option>
                <option value="bg-green-400">Vert</option>
                <option value="bg-purple-400">Violet</option>
                <option value="bg-pink-400">Rose</option>
                <option value="bg-yellow-400">Jaune</option>
                <option value="bg-red-400">Rouge</option>
              </select>
            </>
          )}
          <button className="w-full py-2 mt-2 rounded bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors">Ajouter</button>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
}
