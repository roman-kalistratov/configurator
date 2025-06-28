import express from "express";
import { getItemsByPart } from "../controllers/items.controller.js";

const router = express.Router();

router.get("/:partIdnt", getItemsByPart);

export default router;
