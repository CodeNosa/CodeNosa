import express from "express";
import TeamMember from "../models/TeamMember.js";

const router = express.Router();

/* GET all team members */
router.get("/", async (req, res) => {
  try {
    console.log("🔹 GET /api/team called"); // يطبع وقت اللي يستعمل الـ endpoint
    
    const members = await TeamMember.find().sort({ createdAt: -1 });
    console.log(`🔹 Found ${members.length} members`); // عدد الميمبرز الموجودين
    
    res.status(200).json(members);
  } catch (error) {
    console.error("❌ Error fetching team members:", error.message);
    res.status(500).json({ message: error.message });
  }
});


/* CREATE member */
router.post("/", async (req, res) => {
  try {
    const member = new TeamMember(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* UPDATE member */
router.put("/:id", async (req, res) => {
  try {
    const updated = await TeamMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Membre introuvable" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* DELETE member */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await TeamMember.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Membre introuvable" });
    }

    res.status(200).json({ message: "Supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
