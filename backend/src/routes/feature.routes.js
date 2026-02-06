import express from "express";
import Feature from "../models/feature.model.js";

const router = express.Router();

// ===== GET all features =====
router.get("/", async (req, res) => {
  try {
    const features = await Feature.find();
    res.json(features);
  } catch (err) {
    console.error("Erreur récupération features:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ===== GET a single feature by ID =====
router.get("/:id", async (req, res) => {
  try {
    const feature = await Feature.findById(req.params.id);
    if (!feature) return res.status(404).json({ message: "Feature non trouvée" });
    res.json(feature);
  } catch (err) {
    console.error("Erreur récupération feature:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ===== POST - Ajouter une nouvelle feature =====
router.post("/", async (req, res) => {
  try {
    const { title, icon } = req.body;
    const newFeature = new Feature({ title, icon });
    await newFeature.save();
    res.status(201).json(newFeature);
  } catch (err) {
    console.error("Erreur ajout feature:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ===== PUT - Modifier une feature =====
router.put("/:id", async (req, res) => {
  try {
    const { title, icon } = req.body;
    const updatedFeature = await Feature.findByIdAndUpdate(
      req.params.id,
      { title, icon },
      { new: true } // retourne la version mise à jour
    );
    if (!updatedFeature) return res.status(404).json({ message: "Feature non trouvée" });
    res.json(updatedFeature);
  } catch (err) {
    console.error("Erreur modification feature:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ===== DELETE - Supprimer une feature =====
router.delete("/:id", async (req, res) => {
  try {
    const deletedFeature = await Feature.findByIdAndDelete(req.params.id);
    if (!deletedFeature) return res.status(404).json({ message: "Feature non trouvée" });
    res.json({ message: "Feature supprimée ✅" });
  } catch (err) {
    console.error("Erreur suppression feature:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;
