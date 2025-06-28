import express from "express";
import partsRoute from "./parts.route.js";
import filtersRoute from "./filters.route.js";
import itemsRoute from "./items.route.js";
import compatibilityRoute from "./compatibility.route.js";

const router = express.Router();

router.use("/parts", partsRoute);
router.use("/filters", filtersRoute);
router.use("/items", itemsRoute);
router.use("/items", itemsRoute);
router.use("/compatibility", compatibilityRoute);

export default router;
