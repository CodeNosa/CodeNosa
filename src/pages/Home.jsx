// src/pages/Home.jsx
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import ProjectForm from '../components/ProjectForm';
import Contact from '../components/Contact';
import AboutPage from '../components/propos';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
export default function Home({ lang, setLang, darkMode, setDarkMode }) {
  return (
    <>
    <CustomCursor />
      <Header lang={lang} setLang={setLang} darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <Hero lang={lang} />
        <Services lang={lang} />
        <Portfolio lang={lang} />
        <AboutPage lang={lang}/>
        <Testimonials lang={lang} />
        <ProjectForm lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}