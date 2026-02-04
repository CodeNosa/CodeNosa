import express from "express";
import { authentification } from "../controllers/LoginAdmine.controller.js";

const router = express.Router();

router.post("/", authentification);

export default router;
