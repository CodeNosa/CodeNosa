// backend/routes/contact.routes.js
import express from "express";
const router = express.Router();

// API test
router.post("/", (req, res) => {
  console.log("Received contact request:", req.body); // Console log للتأكد
  res.json({ msg: "Message received!" });
});

export default router;
