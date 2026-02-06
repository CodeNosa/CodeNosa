import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Testimonials({ lang }) {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  const API_URL = "http://localhost:5000/api/testimonials";

  const content = {
    testimonialsTitle: { fr: "Avis Clients", en: "Customer Reviews", ar: "آراء العملاء" },
    addTestimonialTitle: { fr: "Ajouter un avis", en: "Add a Review", ar: "أضف رأيك" },
    formLabels: {
      name: { fr: "Votre nom", en: "Your name", ar: "اسمك" },
      role: { fr: "Votre poste / entreprise", en: "Your position / company", ar: "منصبك / شركتك" },
      comment: { fr: "Votre avis", en: "Your review", ar: "رأيك" },
      submit: { fr: "Publier l'avis", en: "Submit Review", ar: "نشر الرأي" },
      rating: { fr: "Note", en: "Rating", ar: "التقييم" }
    },
    averageRating: { fr: "Note moyenne", en: "Average Rating", ar: "متوسط التقييم" },
    totalReviews: { fr: "avis", en: "reviews", ar: "رأي" }
  };

  // ===== Fetch testimonials depuis backend (public ou admin) =====
  const fetchTestimonials = async () => {
    try {
      const res = await fetch(`${API_URL}/public`); // pour afficher uniquement approuvés
      const data = await res.json();
      setTestimonials(data);
    } catch (err) {
      console.error("Erreur fetch testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // ===== Ajouter un témoignage =====
  const handleSubmitTestimonial = async (e) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const newTestimonial = {
      nomClient: newName,
      entreprise: newRole,
      commentaire: newComment,
      note: rating,
      verifie: false,
      approuve: false
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTestimonial)
      });
      const saved = await res.json();
      setTestimonials([saved, ...testimonials]); // ajout temporaire en front
      setNewComment("");
      setNewName("");
      setNewRole("");
      setRating(5);
    } catch (err) {
      console.error("Erreur ajout testimonial:", err);
    }
  };

  const averageRating =
    testimonials.length > 0
      ? testimonials.reduce((acc, t) => acc + t.note, 0) / testimonials.length
      : 0;

  if (loading) return <p className="text-center py-16">Chargement des avis...</p>;

  return (
    <section id="testimonials" className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-night/30 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{content.testimonialsTitle[lang]}</h2>

          <div className="inline-flex items-center bg-white dark:bg-gray-800 px-6 py-3 rounded-xl shadow-lg mb-8">
            <div className="text-center mr-8">
              <div className="text-5xl font-bold text-primary">{averageRating.toFixed(1)}</div>
              <div className="text-sm text-gray-500">{content.averageRating[lang]}</div>
            </div>
            <div>
              <div className="flex mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`text-2xl ${
                      star <= Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-500">
                {testimonials.length} {content.totalReviews[lang]}
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire d'avis */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-6">{content.addTestimonialTitle[lang]}</h3>
            <form onSubmit={handleSubmitTestimonial}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{content.formLabels.name[lang]}</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{content.formLabels.role[lang]}</label>
                  <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{content.formLabels.rating[lang]}</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <FaStar
                        className={`text-3xl transition-transform hover:scale-125 ${
                          star <= (hoverRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{content.formLabels.comment[lang]}</label>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                {content.formLabels.submit[lang]}
              </button>
            </form>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
            >
              <div className="mb-4">
                <FaQuoteLeft className="text-3xl text-primary/30" />
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{t.commentaire}"</p>

              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className={`text-lg ${star <= t.note ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>

              <div className="flex items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {t.nomClient.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{t.nomClient}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.entreprise}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{new Date(t.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}