import express from "express";
import Client from "../models/Client.js";
import Project from "../models/Portfolio.js";
import Testimonial from "../models/Testimonial.js";

const router = express.Router();

router.get("/dashboard-stats", async (req, res) => {
  try {
    const projects = await Project.countDocuments();
    const clients = await Client.countDocuments();
    const testimonials = await Testimonial.countDocuments();

    const currentMonth = new Date().getMonth();
    const projectsThisMonth = await Project.countDocuments({
      createdAt: { 
        $gte: new Date(new Date().getFullYear(), currentMonth, 1),
        $lte: new Date(new Date().getFullYear(), currentMonth + 1, 0)
      }
    });

    res.json({ projects, clients, testimonials, projectsThisMonth });
  } catch (err) {
    console.error("Erreur stats:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;
