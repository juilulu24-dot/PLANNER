import { useState } from 'react';
import { CheckSquare, Calendar, User, Home, X } from 'lucide-react';

const StudentDayPlanner = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showAddModal, setShowAddModal] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [notifications, setNotifications] = useState(false);
  const darkMode = false; // Remplacez par l'état réel du mode sombre
  const cardBg = 'bg-white'; // Remplacez par la classe réelle de l'arrière-plan de la carte
  const textSecondary = 'text-gray-500'; // Remplacez par la classe réelle du texte secondaire
  const textClass = 'text-gray-900'; // Remplacez par la classe réelle du texte principal
  const bgClass = 'bg-gray-100'; // Remplacez par la classe réelle de l'arrière-plan

  // ...toutes les autres fonctions et états nécessaires...

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      <div className="max-w-2xl mx-auto">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'schedule' && <SchedulePage />}
        {activeTab === 'tasks' && <TasksPage />}
        {activeTab === 'profile' && <ProfilePage />}
      </div>
      <nav className={`fixed bottom-0 left-0 right-0 ${cardBg} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
        <div className="max-w-2xl mx-auto flex justify-around items-center h-16">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center justify-center flex-1 h-full ${activeTab === 'home' ? 'text-blue-500' : textSecondary}`}>
            <Home size={24} />
            <span className="text-xs mt-1">Accueil</span>
          </button>
          <button onClick={() => setActiveTab('schedule')} className={`flex flex-col items-center justify-center flex-1 h-full ${activeTab === 'schedule' ? 'text-blue-500' : textSecondary}`}>
            <Calendar size={24} />
            <span className="text-xs mt-1">Emploi du temps</span>
          </button>
          <button onClick={() => setActiveTab('tasks')} className={`flex flex-col items-center justify-center flex-1 h-full ${activeTab === 'tasks' ? 'text-blue-500' : textSecondary}`}>
            <CheckSquare size={24} />
            <span className="text-xs mt-1">Tâches</span>
          </button>
          <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center justify-center flex-1 h-full ${activeTab === 'profile' ? 'text-blue-500' : textSecondary}`}>
            <User size={24} />
            <span className="text-xs mt-1">Profil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default StudentDayPlanner;
