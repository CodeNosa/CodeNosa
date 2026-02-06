import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: { type: String, required: true } // On stocke l'emoji ici
});

export default mongoose.model("Feature", featureSchema);
