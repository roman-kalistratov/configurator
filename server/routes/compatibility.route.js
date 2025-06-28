import express from "express";
import { checkCompatibility } from "../controllers/compatibility.controller.js";

const router = express.Router();

// Проверка полной сборки (всех переданных комплектующих)
router.post("/check", checkCompatibility);

export default router;
