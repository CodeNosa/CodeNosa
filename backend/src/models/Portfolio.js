// C:\Users\henn5\Desktop\CodeNosa-main\backend\src\models\Portfolio.js
import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema(
  {
    titre: {
      francais: { type: String, required: true },
      anglais: { type: String },
      arabe: { type: String },
    },
    client: { type: String, required: true },
    annee: { type: Number, required: true },
    categorie: { type: String, enum: ["Web", "Mobile", "Design", "Autre"], default: "Web" },
    imageUrl: { type: String, required: true },
    liveUrl: { type: String },
    githubUrl: { type: String },
    technologies: [{ type: String }],
    mettreEnVedette: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Portfolio", PortfolioSchema);
