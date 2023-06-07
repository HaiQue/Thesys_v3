import express from "express";
const router = express.Router();
import { getUsers, updateUser } from "../controllers/usersController.js";
import authenticateUser from "../middleware/auth.js";

router.route("/").get(getUsers);
router.route("/").patch(updateUser);

export default router;
