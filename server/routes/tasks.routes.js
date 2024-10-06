import { Router } from "express";
import {
  getTask,
  getTasks,
  updateTask,
  createTask,
  deleteTask,
} from "../controllers/tasks.controllers.js";

const router = Router();

router.get("/tasks", getTasks);

router.get("/task/:id", getTask);

router.post("/createtask", createTask);

router.put("/updatetask/:id", updateTask);

router.delete("/deletetask/:id", deleteTask);

export default router;
