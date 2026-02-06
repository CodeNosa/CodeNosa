//C:\Users\henn5\Desktop\CodeNosa-main\backend\src\routes\client.routes.js
import express from "express";
import mongoose from "mongoose";
import Client from "../models/Client.js";

const router = express.Router();

/* =======================
   ➕ CREATE Client
======================= */
router.post("/", async (req, res) => {
  try {
    console.log("Création d'un client avec body:", req.body);

    const client = new Client(req.body);
    await client.save();

    console.log("Client créé avec succès:", client._id);
    res.status(201).json({
      message: "Client ajouté avec succès ✅",
      client
    });
  } catch (error) {
    console.error("Erreur création client:", error.message);
    res.status(400).json({ message: error.message });
  }
});

/* =======================
   📄 GET ALL Clients
======================= */
router.get("/", async (req, res) => {
  try {
    console.log("Récupération de tous les clients");
    const clients = await Client.find().sort({ createdAt: -1 });
    console.log(`Nombre de clients trouvés: ${clients.length}`);
    res.json(clients);
  } catch (error) {
    console.error("Erreur récupération clients:", error.message);
    res.status(500).json({ message: error.message });
  }
});

/* =======================
   🔍 GET ONE Client
======================= */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Récupération client ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.warn("ID invalide:", id);
      return res.status(400).json({ message: "ID invalide" });
    }

    const client = await Client.findById(id);
    if (!client) {
      console.warn("Client non trouvé:", id);
      return res.status(404).json({ message: "Client non trouvé ❌" });
    }

    console.log("Client trouvé:", client.nomComplet);
    res.json(client);
  } catch (error) {
    console.error("Erreur GET client:", error.message);
    res.status(500).json({ message: error.message });
  }
});

/* =======================
   ✏️ UPDATE Client
======================= */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Mise à jour client ID:", id, "avec body:", req.body);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.warn("ID invalide pour update:", id);
      return res.status(400).json({ message: "ID invalide" });
    }

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedClient) {
      console.warn("Client non trouvé pour update:", id);
      return res.status(404).json({ message: "Client non trouvé ❌" });
    }

    console.log("Client mis à jour:", updatedClient.nomComplet);
    res.json({
      message: "Client mis à jour avec succès ✏️",
      updatedClient
    });
  } catch (error) {
    console.error("Erreur UPDATE client:", error.message);
    res.status(400).json({ message: error.message });
  }
});

/* =======================
   🗑️ DELETE Client
======================= */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Suppression client ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.warn("ID invalide pour delete:", id);
      return res.status(400).json({ message: "ID invalide" });
    }

    const deletedClient = await Client.findByIdAndDelete(id);
    if (!deletedClient) {
      console.warn("Client non trouvé pour delete:", id);
      return res.status(404).json({ message: "Client non trouvé ❌" });
    }

    console.log("Client supprimé:", deletedClient.nomComplet);
    res.json({ message: "Client supprimé avec succès 🗑️" });
  } catch (error) {
    console.error("Erreur DELETE client:", error.message);
    res.status(400).json({ message: error.message });
  }
});

export default router;
