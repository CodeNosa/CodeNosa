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
    <section className="py-24 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-10 shadow-2xl border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t.title}
          </h2>

          <form className="space-y-8">
            {["name", "email"].map((field) => (
              <div key={field} className="relative">
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder=" "
                  required
                  className="peer w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <label className="absolute left-4 top-4 text-gray-500 dark:text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-primary">
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
                className="peer w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              <label className="absolute left-4 top-4 text-gray-500 dark:text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-primary">
                {t.message}
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl shadow-xl"
            >
              {t.submit}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
