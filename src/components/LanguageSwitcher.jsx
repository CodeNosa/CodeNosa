// src/components/LanguageSwitcher.jsx
export default function LanguageSwitcher({ lang, setLang }) {
  const flags = {
    fr: '🇫🇷',
    en: '🇺🇸',
    ar: '🇹🇳', // ou 🇸🇦 selon ta cible
  };

  return (
    <div className="flex space-x-2 rtl:space-x-reverse">
      {['fr', 'en', 'ar'].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            lang === l
              ? 'bg-primary text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
          aria-label={`Switch to ${l.toUpperCase()}`}
        >
          {flags[l]}
        </button>
      ))}
    </div>
  );
}