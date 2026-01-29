// src/components/Testimonials.jsx
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { useState } from "react";

// Avis clients existants
const initialTestimonials = [
  {
    id: 1,
    name: "Ahmed Ben Salah",
    role: { fr: "CEO, TechStartup", en: "CEO, TechStartup", ar: "المدير التنفيذي، TechStartup" },
    rating: 5,
    comment: {
      fr: "Excellent travail ! CodeNosa a développé notre application mobile en un temps record. Professionnels et réactifs.",
      en: "Excellent work! CodeNosa developed our mobile app in record time. Professional and responsive team.",
      ar: "عمل ممتاز! طوّر CodeNosa تطبيقنا المحمول في وقت قياسي. فريق محترف وسريع الاستجابة."
    },
    date: "2024-01-15",
    avatar: "AB"
  },
  {
    id: 2,
    name: "Marie Dubois",
    role: { fr: "Responsible Marketing", en: "Marketing Manager", ar: "مديرة التسويق" },
    rating: 4,
    comment: {
      fr: "Site web magnifique et très performant. Notre trafic a augmenté de 40% depuis le lancement.",
      en: "Beautiful and high-performing website. Our traffic increased by 40% since launch.",
      ar: "موقع ويب جميل وعالي الأداء. زادت زياراتنا بنسبة 40٪ منذ الإطلاق."
    },
    date: "2024-02-10",
    avatar: "MD"
  },
  {
    id: 3,
    name: "Karim Zayani",
    role: { fr: "Entrepreneur", en: "Entrepreneur", ar: "رجل أعمال" },
    rating: 5,
    comment: {
      fr: "Support technique excellent. Ils sont toujours disponibles pour nous aider. Je recommande vivement !",
      en: "Excellent technical support. Always available to help. Highly recommended!",
      ar: "دعم فني ممتاز. دائمًا متاحون للمساعدة. أوصي بشدة!"
    },
    date: "2024-03-05",
    avatar: "KZ"
  }
];

export default function Testimonials({ lang }) {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [newComment, setNewComment] = useState("");
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  const content = {
    testimonialsTitle: {
      fr: "Avis Clients",
      en: "Customer Reviews",
      ar: "آراء العملاء"
    },
    addTestimonialTitle: {
      fr: "Ajouter un avis",
      en: "Add a Review",
      ar: "أضف رأيك"
    },
    formLabels: {
      name: { fr: "Votre nom", en: "Your name", ar: "اسمك" },
      role: { fr: "Votre poste / entreprise", en: "Your position / company", ar: "منصبك / شركتك" },
      comment: { fr: "Votre avis", en: "Your review", ar: "رأيك" },
      submit: { fr: "Publier l'avis", en: "Submit Review", ar: "نشر الرأي" },
      rating: { fr: "Note", en: "Rating", ar: "التقييم" }
    },
    averageRating: {
      fr: "Note moyenne",
      en: "Average Rating",
      ar: "متوسط التقييم"
    },
    totalReviews: {
      fr: "avis",
      en: "reviews",
      ar: "رأي"
    }
  };

  const handleSubmitTestimonial = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const newTestimonial = {
      id: testimonials.length + 1,
      name: newName,
      role: { fr: newRole, en: newRole, ar: newRole },
      rating,
      comment: { fr: newComment, en: newComment, ar: newComment },
      date: new Date().toISOString().split('T')[0],
      avatar: newName.split(' ').map(n => n[0]).join('').toUpperCase()
    };

    setTestimonials([newTestimonial, ...testimonials]);
    setNewComment("");
    setNewName("");
    setNewRole("");
    setRating(5);
  };

  const averageRating = testimonials.reduce((acc, curr) => acc + curr.rating, 0) / testimonials.length;

  return (
    <section id="testimonials" className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-night/30 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{content.testimonialsTitle[lang]}</h2>
          
          {/* Average Rating */}
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
                      star <= Math.round(averageRating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
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

        {/* Add Testimonial Form */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-6">{content.addTestimonialTitle[lang]}</h3>
            <form onSubmit={handleSubmitTestimonial}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {content.formLabels.name[lang]}
                  </label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {content.formLabels.role[lang]}
                  </label>
                  <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  />
                </div>
              </div>
              
              {/* Rating Stars */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {content.formLabels.rating[lang]}
                </label>
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
                          star <= (hoverRating || rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {content.formLabels.comment[lang]}
                </label>
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
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <FaQuoteLeft className="text-3xl text-primary/30" />
              </div>

              {/* Comment */}
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                "{testimonial.comment[lang] || testimonial.comment.fr}"
              </p>

              {/* Rating */}
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`text-lg ${
                      star <= testimonial.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* User Info */}
              <div className="flex items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role[lang] || testimonial.role.fr}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{testimonial.date}</p>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}