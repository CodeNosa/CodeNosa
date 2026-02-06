import express from "express";
import mongoose from "mongoose";
import Client from "../models/Client.js";

const router = express.Router();

// CREATE Client
router.post("/", async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).json({
      message: "Client ajouté avec succès ✅",
      client
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET ALL Clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ONE Client
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: "Client non trouvé ❌" });
    }

    res.json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE Client
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client non trouvé ❌" });
    }

    res.json({
      message: "Client mis à jour avec succès ✏️",
      updatedClient
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE Client
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const deletedClient = await Client.findByIdAndDelete(id);
    if (!deletedClient) {
      return res.status(404).json({ message: "Client non trouvé ❌" });
    }

    res.json({ message: "Client supprimé avec succès 🗑️" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
