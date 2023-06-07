import express from "express";
const router = express.Router();
import { downloadFileById } from "../controllers/filesController.js";
import authenticateUser from "../middleware/auth.js";

router.route("/:id").get(downloadFileById);

export default router;
