// C:\Users\henn5\Desktop\CodeNosa-main\backend\src\routes\portfolio.routes.js
import express from "express";
import Portfolio from "../models/Portfolio.js";

const router = express.Router();

// ===== GET tous les projets =====
router.get("/", async (req, res) => {
  try {
    const projets = await Portfolio.find().sort({ annee: -1 });
    res.json(projets);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ===== GET projet par ID =====
router.get("/:id", async (req, res) => {
  try {
    const projet = await Portfolio.findById(req.params.id);
    if (!projet) return res.status(404).json({ message: "Projet non trouvé" });
    res.json(projet);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ===== CREATE un nouveau projet =====
router.post("/", async (req, res) => {
  try {
    const newProjet = new Portfolio(req.body);
    const savedProjet = await newProjet.save();
    res.status(201).json(savedProjet);
  } catch (err) {
    res.status(400).json({ message: "Erreur création projet", error: err.message });
  }
});

// ===== UPDATE projet =====
router.put("/:id", async (req, res) => {
  try {
    const updatedProjet = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedProjet) return res.status(404).json({ message: "Projet non trouvé" });
    res.json(updatedProjet);
  } catch (err) {
    res.status(400).json({ message: "Erreur mise à jour", error: err.message });
  }
});

// ===== DELETE projet =====
router.delete("/:id", async (req, res) => {
  try {
    const deletedProjet = await Portfolio.findByIdAndDelete(req.params.id);
    if (!deletedProjet) return res.status(404).json({ message: "Projet non trouvé" });
    res.json({ message: "Projet supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur suppression", error: err.message });
  }
});

export default router;
