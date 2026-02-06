//C:\Users\henn5\Desktop\CodeNosa-main\backend\src\routes\testimonial.routes.js
import express from "express";
import Testimonial from "../models/Testimonial.js";

const router = express.Router();

/* ➕ CREATE */
router.post("/", async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* 📄 GET ALL (Admin) */
router.get("/", async (req, res) => {
  const testimonials = await Testimonial.find().sort({ date: -1 });
  res.json(testimonials);
});

/* 🌐 GET APPROVED (Public) */
router.get("/public", async (req, res) => {
  const testimonials = await Testimonial.find({
    approuve: true
  }).sort({ date: -1 });

  res.json(testimonials);
});

/* ✏️ UPDATE */
router.put("/:id", async (req, res) => {
  const updated = await Testimonial.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

/* 🗑️ DELETE */
router.delete("/:id", async (req, res) => {
  await Testimonial.findByIdAndDelete(req.params.id);
  res.json({ message: "Témoignage supprimé 🗑️" });
});

export default router;
