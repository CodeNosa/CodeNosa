// src/App.jsx
import { useState, useEffect } from 'react';
import Home from './pages/Home';

function App() {
  const [lang, setLang] = useState('fr'); // 'fr', 'en', 'ar'
  const [darkMode, setDarkMode] = useState(false);

  // Appliquer la classe dark au <html> si nécessaire
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-night text-softwhite' : 'bg-white text-gray-900'}`}>
      <Home lang={lang} setLang={setLang} darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}

export default App;