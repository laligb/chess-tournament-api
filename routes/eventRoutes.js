import express from "express";
import eventController from "../controllers/eventController.js";

const router = express.Router();

router.post("/", eventController.createEvent);
router.get("/", eventController.getAllEvents);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

export default router;
