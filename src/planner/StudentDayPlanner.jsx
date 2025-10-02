import React, { useState, useEffect } from 'react';
import { getTasks, addTask, toggleTask, deleteTask, getCourses, addCourse, deleteCourse, getProfile, getSubjects, addSubject } from './utils/api';
import { Calendar, CheckSquare, Home, User, Plus, Bell, Moon, Sun, Clock, MapPin, X } from 'lucide-react';

const StudentDayPlanner = ({ token, user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  useEffect(() => {
    if (!token) return;
    setLoadingCourses(true);
    getCourses(token).then(data => {
      setCourses(Array.isArray(data) ? data : []);
      setLoadingCourses(false);
    });
  }, [token]);
  const handleAddTask = async (taskData) => {
    await addTask(token, taskData);
    const updated = await getTasks(token);
    setTasks(Array.isArray(updated) ? updated : []);
  };

  const handleAddCourse = async (courseData) => {
    const HomePage = () => {
      // ...existing code...

  // Schedule Page
  const SchedulePage = () => {
    const [view, setView] = useState('week');
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
    return (
      <div className="pb-20 px-4 pt-6">
        <h1 className={`text-3xl font-bold mb-6 ${textClass}`}>Emploi du temps</h1>
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setView('week')}
            className={`px-4 py-2 rounded-lg ${view === 'week' ? 'bg-blue-500 text-white' : `${cardBg} ${textClass}`}`}
          >
            Semaine
          </button>
          <button
            onClick={() => setView('day')}
            className={`px-4 py-2 rounded-lg ${view === 'day' ? 'bg-blue-500 text-white' : `${cardBg} ${textClass}`}`}
          >
            Jour
          </button>
        </div>
        {/* Affichage de l'emploi du temps selon la vue */}
        {view === 'week' ? (
          <div>
            {/* Affichage semaine */}
            {days.map(day => (
              <div key={day} className={`${cardBg} rounded-xl p-4 shadow-lg mb-3`}>
                <h2 className={`text-lg font-bold mb-2 ${textClass}`}>{day}</h2>
                <div className="space-y-2">
                  {courses.filter(course => course.day === day).length === 0 ? (
                    <span className={textSecondary}>Aucun cours</span>
                  ) : (
                    courses.filter(course => course.day === day).map(course => (
                      <div key={course.id} className={`flex items-center gap-3 p-3 rounded-lg ${course.color}`}>
                        <span className="font-semibold">{course.title}</span>
                        <span className="text-sm">{course.time}</span>
                        <span className="text-sm">{course.location}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {/* Affichage jour */}
            {courses.filter(course => course.day === days[new Date().getDay() - 1]).length === 0 ? (
              <span className={textSecondary}>Aucun cours aujourd'hui</span>
            ) : (
              courses.filter(course => course.day === days[new Date().getDay() - 1]).map(course => (
                <div key={course.id} className={`flex items-center gap-3 p-3 rounded-lg ${course.color}`}>
                  <span className="font-semibold">{course.title}</span>
                  <span className="text-sm">{course.time}</span>
                  <span className="text-sm">{course.location}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
    const filteredTasks = tasks.filter(task => {
      if (filter === 'all') return true;
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    });
    return (
      <div className="pb-20 px-4 pt-6">
        <h1 className={`text-3xl font-bold mb-6 ${textClass}`}>Mes Tâches</h1>
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${filter === 'all' ? 'bg-blue-500 text-white' : `${cardBg} ${textClass}`}`}
          >
            Toutes
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${filter === 'active' ? 'bg-blue-500 text-white' : `${cardBg} ${textClass}`}`}
          >
            En cours
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${filter === 'completed' ? 'bg-blue-500 text-white' : `${cardBg} ${textClass}`}`}
          >
            Terminées
          </button>
        </div>
        {loadingTasks ? (
          <div className="text-center text-gray-400">Chargement...</div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center text-gray-400">Aucune tâche</div>
        ) : (
          filteredTasks.map(task => (
            <div key={task.id} className={`${cardBg} rounded-xl p-4 shadow-lg mb-3 ${getPriorityColor(task.priority)} relative`}>
              {isOverdue(task.deadline) && !task.completed && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  En retard
                </span>
              )}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id)}
                  className="mt-1 w-5 h-5 text-green-500 rounded focus:ring-2 focus:ring-green-500"
                />
                <div className="flex-1">
                  <h3 className={`font-semibold text-lg ${textClass} ${task.completed ? 'line-through opacity-50' : ''}`}>
                    {task.title}
                  </h3>
                  <div className={`flex items-center gap-3 mt-2 ${textSecondary}`}>
                    <span className="text-sm">📅 {new Date(task.deadline).toLocaleDateString('fr-FR')}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.priority === 'Haute' ? 'bg-red-100 text-red-700' :
                      task.priority === 'Moyenne' ? 'bg-orange-100 text-orange-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="ml-2 text-red-500 hover:text-red-700"
                  title="Supprimer"
                >
                  ×
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  // Profile Page
  const ProfilePage = () => (
    <div className="pb-20 px-4 pt-6">
      <h1 className={`text-3xl font-bold mb-6 ${textClass}`}>Profil</h1>
      <div className={`${cardBg} rounded-xl p-6 shadow-lg mb-6 text-center`}>
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
          AE
        </div>
        <h2 className={`text-2xl font-bold ${textClass}`}>{user?.name || "Armel Evans"}</h2>
        <p className={textSecondary}>{user?.email || "armel.evans@email.com"}</p>
        <button
          onClick={onLogout}
          className="mt-4 px-4 py-2 rounded bg-red-500 text-white font-bold hover:bg-red-600 transition-colors"
        >
          Se déconnecter
        </button>
      </div>
      <div className={`${cardBg} rounded-xl p-6 shadow-lg mb-4`}>
        <h3 className={`text-xl font-semibold mb-4 ${textClass}`}>Paramètres</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon size={20} className={textClass} /> : <Sun size={20} className={textClass} />}
              <span className={textClass}>Mode {darkMode ? 'sombre' : 'clair'}</span>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full transition-all ${darkMode ? 'bg-blue-500' : 'bg-gray-300'} relative`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${darkMode ? 'right-0.5' : 'left-0.5'}`} />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell size={20} className={textClass} />
              <span className={textClass}>Notifications</span>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-all ${notifications ? 'bg-green-500' : 'bg-gray-300'} relative`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${notifications ? 'right-0.5' : 'left-0.5'}`} />
            </button>
          </div>
        </div>
      </div>
      <div className={`${cardBg} rounded-xl p-6 shadow-lg`}>
        <h3 className={`text-xl font-semibold mb-4 ${textClass}`}>Mes Matières</h3>
        <div className="space-y-2">
          {['Mathématiques', 'Physique', 'Informatique', 'Philosophie', 'Anglais'].map(subject => (
            <div key={subject} className={`flex items-center gap-3 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className={textClass}>{subject}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Add Modal
  const AddModal = () => {
    const [type, setType] = useState('task');
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('Moyenne');
    const [deadline, setDeadline] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [color, setColor] = useState('bg-blue-500');
    const [day, setDay] = useState('Lundi');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      if (type === 'task') {
        await handleAddTask({ title, deadline, priority });
      } else {
        await handleAddCourse({ title, time, location, color, day });
      }
      setLoading(false);
      setShowAddModal(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <form className={`${cardBg} rounded-2xl p-6 w-full max-w-md`} onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-2xl font-bold ${textClass}`}>Ajouter</h2>
            <button type="button" onClick={() => setShowAddModal(false)}>
              <X className={textClass} />
            </button>
          </div>
          <div className="flex gap-2 mb-4">
            <button type="button" className={`flex-1 py-2 rounded ${type === 'task' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`} onClick={() => setType('task')}>Tâche</button>
            <button type="button" className={`flex-1 py-2 rounded ${type === 'course' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`} onClick={() => setType('course')}>Cours</button>
          </div>
          <input required className="w-full mb-3 p-2 rounded border dark:bg-gray-700 dark:text-gray-100" placeholder={type === 'task' ? 'Titre de la tâche' : 'Nom du cours'} value={title} onChange={e => setTitle(e.target.value)} />
          {type === 'task' ? (
            <>
              <input required type="date" className="w-full mb-3 p-2 rounded border dark:bg-gray-700 dark:text-gray-100" value={deadline} onChange={e => setDeadline(e.target.value)} />
              <select className="w-full mb-3 p-2 rounded border dark:bg-gray-700 dark:text-gray-100" value={priority} onChange={e => setPriority(e.target.value)}>
                <option value="Haute">Haute</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Basse">Basse</option>
              </select>
            </>
          ) : (
            <>
              <input required className="w-full mb-3 p-2 rounded border dark:bg-gray-700 dark:text-gray-100" placeholder="Salle" value={location} onChange={e => setLocation(e.target.value)} />
              <input required className="w-full mb-3 p-2 rounded border dark:bg-gray-700 dark:text-gray-100" placeholder="Horaire (ex: 08:00 - 10:00)" value={time} onChange={e => setTime(e.target.value)} />
              <select className="w-full mb-3 p-2 rounded border dark:bg-gray-700 dark:text-gray-100" value={day} onChange={e => setDay(e.target.value)}>
                <option value="Lundi">Lundi</option>
                <option value="Mardi">Mardi</option>
                <option value="Mercredi">Mercredi</option>
                <option value="Jeudi">Jeudi</option>
                <option value="Vendredi">Vendredi</option>
              </select>
              <select className="w-full mb-3 p-2 rounded border dark:bg-gray-700 dark:text-gray-100" value={color} onChange={e => setColor(e.target.value)}>
                <option value="bg-blue-500">Bleu</option>
                <option value="bg-green-500">Vert</option>
                <option value="bg-purple-500">Violet</option>
                <option value="bg-pink-500">Rose</option>
                <option value="bg-yellow-500">Jaune</option>
                <option value="bg-red-500">Rouge</option>
              </select>
            </>
          )}
          <button className="w-full py-2 mt-2 rounded bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors" disabled={loading}>{loading ? 'Ajout...' : 'Ajouter'}</button>
        </form>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      {/* Main Content */}
      <div className="max-w-2xl mx-auto">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'schedule' && <SchedulePage />}
        {activeTab === 'tasks' && <TasksPage />}
        {activeTab === 'profile' && <ProfilePage />}
      </div>
      {/* Bottom Navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 ${cardBg} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
        <div className="max-w-2xl mx-auto flex justify-around items-center h-16">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center flex-1 h-full ${activeTab === 'home' ? 'text-blue-500' : textSecondary}`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Accueil</span>
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex flex-col items-center justify-center flex-1 h-full ${activeTab === 'schedule' ? 'text-blue-500' : textSecondary}`}
          >
            return (
              <div className="pb-20 px-4 pt-6">
                <h1 className={`text-3xl font-bold mb-6 ${textClass}`}>Emploi du temps</h1>
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setView('week')}
                    className={`px-4 py-2 rounded-lg ${view === 'week' ? 'bg-blue-500 text-white' : `${cardBg} ${textClass}`}`}
                  >
                    Semaine
                  </button>
                  <button
                    onClick={() => setView('day')}
                    className={`px-4 py-2 rounded-lg ${view === 'day' ? 'bg-blue-500 text-white' : `${cardBg} ${textClass}`}`}
                  >
                    Jour
                  </button>
                </div>
                {loadingCourses ? (
                  <div className="text-center text-gray-400">Chargement...</div>
                ) : view === 'week' ? (
                  days.map(day => (
                    <div key={day} className="mb-6">
                      <h2 className={`text-lg font-semibold mb-3 ${textClass}`}>{day}</h2>
                      {courses.filter(c => c.day === day).map(course => (
                        <div key={course.id} className={`${cardBg} rounded-xl p-4 shadow-lg mb-3 ${course.color} bg-opacity-10 flex justify-between items-center`}>
                          <div>
                            <div className={`inline-block px-3 py-1 rounded-full text-white text-sm mb-2 ${course.color}`}>
                              {course.title}
                            </div>
                            <div className={`flex items-center gap-2 ${textSecondary}`}>
                              <Clock size={16} />
                              <span className="text-sm">{course.time}</span>
                            </div>
                            <div className={`flex items-center gap-2 mt-1 ${textSecondary}`}>
                              <MapPin size={16} />
                              <span className="text-sm">{course.location}</span>
                            </div>
                          </div>
                          <button onClick={() => handleDeleteCourse(course.id)} className="ml-2 text-red-500 hover:text-red-700" title="Supprimer">×</button>
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  <div>
                    <h2 className={`text-lg font-semibold mb-3 ${textClass}`}>Lundi (Aujourd'hui)</h2>
                    {courses.map(course => (
                      <div key={course.id} className={`${cardBg} rounded-xl p-5 shadow-lg mb-4 border-l-4 ${course.color} flex justify-between items-center`}>
                        <div>
                          <h3 className={`font-semibold text-xl ${textClass} mb-3`}>{course.title}</h3>
                          <div className={`flex items-center gap-2 mb-2 ${textSecondary}`}>
                            <Clock size={18} />
                            <span>{course.time}</span>
                          </div>
                          <div className={`flex items-center gap-2 ${textSecondary}`}>
                            <MapPin size={18} />
                            <span>{course.location}</span>
                          </div>
                        </div>
                        <button onClick={() => handleDeleteCourse(course.id)} className="ml-2 text-red-500 hover:text-red-700" title="Supprimer">×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
