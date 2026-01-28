// src/components/ProjectForm.jsx
import { useState } from "react";
import { motion } from "framer-motion";

export default function ProjectForm({ lang }) {
  const labels = {
    fr: {
      title: "Décrivez votre projet",
      name: "Nom",
      email: "Email",
      message: "Détails du projet",
      submit: "Envoyer la demande",
    },
    en: {
      title: "Describe your project",
      name: "Name",
      email: "Email",
      message: "Project details",
      submit: "Send request",
    },
    ar: {
      title: "صف مشروعك",
      name: "الاسم",
      email: "البريد الإلكتروني",
      message: "تفاصيل المشروع",
      submit: "إرسال الطلب",
    },
  };

  const t = labels[lang] || labels.fr;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-28 px-6 bg-gradient-to-br from-night via-secondary to-primaryDark">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative bg-night/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-primary/30"
        >
          {/* Glow */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary via-accent to-purple-600 opacity-30 blur-xl"></div>

          <h2 className="relative text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-primary via-accent to-purple-500 bg-clip-text text-transparent animate-gradient">
            {t.title}
          </h2>

          <form className="relative space-y-8">
            {["name", "email"].map((field) => (
              <div key={field} className="relative">
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder=" "
                  required
                  className="peer w-full p-4 rounded-xl bg-night/70 border border-primary/30 text-softwhite focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <label className="absolute left-4 top-4 text-softwhite/60 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-accent">
                  {t[field]}
                </label>
              </div>
            ))}

            <div className="relative">
              <textarea
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                placeholder=" "
                required
                className="peer w-full p-4 rounded-xl bg-night/70 border border-primary/30 text-softwhite focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
              <label className="absolute left-4 top-4 text-softwhite/60 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-accent">
                {t.message}
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-primary via-accent to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-primary/40 animate-neon-pulse"
            >
              {t.submit}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
