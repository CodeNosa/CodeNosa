import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminRoutes from './admin/AdminRoutes';

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('language') || 'fr');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  // Persist language
  useEffect(() => {
    localStorage.setItem('language', lang);
  }, [lang]);

  // Persist dark mode and toggle class
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Routes>
        {/* Site principal */}
        <Route 
          path="/*" 
          element={
            <Home 
              lang={lang} 
              setLang={setLang} 
              darkMode={darkMode} 
              setDarkMode={setDarkMode} 
            />
          } 
        />

        {/* Routes admin */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </div>
  );
}

export default App;
