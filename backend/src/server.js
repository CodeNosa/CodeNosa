//C:\Users\henn5\Desktop\CodeNosa-main\backend\src\server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import contactRoutes from "./routes/contact.routes.js";
import LoginAdmine from "./routes/Admine.routes.js";
import portfolioRoutes from "./routes/portfolio.routes.js";
import clientRoutes from "./routes/client.routes.js";
import testimonialRoutes from "./routes/testimonial.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import featureRoutes from "./routes/feature.routes.js";
import servicesRoutes from "./routes/service.routes.js";
import teamRoutes from "./routes/team.routes.js";

// 🔴 مهم: نحدّد مسار .env
dotenv.config({ path: "../.env" });

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);
app.use("/login", LoginAdmine);
app.use("/api/portfolios", portfolioRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api", dashboardRoutes);
app.use("/api/features", featureRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/team", teamRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("🚀 Server is running...");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 MongoDB connecté (SERVER)"))
  .catch((err) => console.error("🔴 MongoDB erreur:", err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
