import express from "express";
import { getFiltersByPart } from "../controllers/filters.controller.js";

const router = express.Router();

router.get("/:partIdnt", getFiltersByPart);

export default router;
