// backend/models/service.model.js
import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },   // Exemple: "Développement Web"
  description: { type: String },            // Exemple: "Sites web modernes avec Next.js..."
  features: [{ type: String }],             // Liste de points: ["Responsive Design", "SEO Optimized", ...]
});

export default mongoose.model("Service", serviceSchema);
