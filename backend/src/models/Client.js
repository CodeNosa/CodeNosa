//C:\Users\henn5\Desktop\CodeNosa-main\backend\src\models\Client.js
import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    nomComplet: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    telephone: { type: String, required: true },
    entreprise: { type: String },
    siteWeb: { type: String },
    secteurActivite: { type: String },
    statut: { type: String, enum: ["Actif", "Inactif", "En attente"], default: "Actif" },
    type: { type: String, enum: ["Entreprise", "Particulier", "Startup", "Agence"], default: "Entreprise" },
    tags: [{ type: String }],
    notes: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Client", clientSchema);
