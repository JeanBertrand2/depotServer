import express from "express";
import {
  createUser,
  getUser,
  deleteUser,
  updateUser,
  getUserById,
} from "../Controllers/utilisateurController.js";

const router = express.Router();

router.get("/", getUser);
router.post("/", createUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
