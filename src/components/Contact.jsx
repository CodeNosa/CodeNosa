import { useState } from "react";

export default function ContactPage({ lang }) {
  const content = {
    titles: { fr: "Contactez-nous", en: "Get in Touch", ar: "اتصل بنا" },
    subtitle: {
      fr: "Transformons vos idées en solutions digitales exceptionnelles",
      en: "Let's transform your ideas into exceptional digital solutions",
      ar: "لنحول أفكارك إلى حلول رقمية استثنائية"
    },
    ctaButton: { fr: "Envoyer", en: "Send", ar: "إرسال" },
    successMsg: {
      fr: "Message envoyé avec succès !",
      en: "Message sent successfully!",
      ar: "تم إرسال الرسالة بنجاح!"
    },
    errorMsg: {
      fr: "Erreur lors de l'envoi du message",
      en: "Error sending the message",
      ar: "حدث خطأ أثناء إرسال الرسالة"
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    console.log("Changement input:", e.target.name, e.target.value); // <-- هنا نشوف كل تغيير في الفورم
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("Réponse du serveur:", res);

      const data = await res.json();
      console.log("Data JSON reçue:", data);

      alert(data.msg || content.successMsg[lang]);

      setFormData({ name: "", email: "", subject: "", message: "" });
      console.log("Formulaire réinitialisé");
    } catch (err) {
      console.error("Erreur catch:", err);
      alert(content.errorMsg[lang]);
    } finally {
      setLoading(false);
      console.log("Loading = false");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 dark:text-white">
          {content.titles[lang]}
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          {content.subtitle[lang]}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={lang === "ar" ? "الاسم" : lang === "fr" ? "Nom" : "Name"}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={lang === "ar" ? "الإيميل" : lang === "fr" ? "Email" : "Email"}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder={lang === "ar" ? "الموضوع" : lang === "fr" ? "Sujet" : "Subject"}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={lang === "ar" ? "رسالتك" : lang === "fr" ? "Message" : "Your message"}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            rows="5"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold hover:scale-105 transition-transform duration-300"
          >
            {loading ? (lang === "ar" ? "جارٍ الإرسال..." : lang === "fr" ? "Envoi..." : "Sending...") : content.ctaButton[lang]}
          </button>
        </form>
      </div>
    </div>
  );
}
