import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    nomComplet: { type: String, required: true },
    poste: { type: String, required: true },
    photo: { type: String, required: true },
    description: { type: String, required: true },
    specialitePrincipale: { type: String, required: true },

    // 💼 Compétences & Expertise
    competences: {
      applicationsWeb: { type: Boolean, default: false },
      applicationsMobile: { type: Boolean, default: false },
      uiUx: { type: Boolean, default: false },
      optimisationPerformance: { type: Boolean, default: false },
      frontEnd: { type: Boolean, default: false },
      responsive: { type: Boolean, default: false },
      accessibilite: { type: Boolean, default: false },
    },

    // 🛠 Technologies maîtrisées
    technologies: [{ type: String }],

    // 🎯 Qualités professionnelles
    qualites: [{ type: String }],

    // 🌍 Autres informations
    langues: [{ type: String }],
    anneesExperience: { type: Number, default: 0 },
    disponibilite: { type: String, enum: ["Freelance", "Full-time", "Part-time"], default: "Full-time" },
    reseaux: {
      linkedin: { type: String },
      github: { type: String },
    },
    projets: [
      {
        titre: String,
        description: String,
        lien: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("TeamMember", teamSchema);