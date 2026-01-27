// src/pages/Home.jsx
import Header from '../components/Header';
import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import ProjectForm from '../components/ProjectForm';
import Contact from '../components/Contact';
import AboutPage from '../components/propos';
export default function Home({ lang, setLang, darkMode, setDarkMode }) {
  return (
    <>
      <Header lang={lang} setLang={setLang} darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <Hero lang={lang} />
        <Portfolio lang={lang} />
        <AboutPage lang={lang}/>
        <ProjectForm lang={lang} />
        
        <Contact lang={lang} />
        
      </main>
    </>
  );
}