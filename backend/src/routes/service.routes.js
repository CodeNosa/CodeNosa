import express from "express";
import Service from "../models/service.model.js";

const router = express.Router();

// GET all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// POST ajouter un service
router.post("/", async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur ajout service" });
  }
});

// PUT modifier
router.put("/:id", async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur modification service" });
  }
});

// DELETE supprimer
router.delete("/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service supprimé" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur suppression service" });
  }
});

export default router;
