import { Router } from "express";
import taskController from "../controllers/task.controller.js";
import { isAuthenticated } from "../middlewares/userAuth.middleware.js";

const taskRouter = Router();

taskRouter.get("/create",taskController.renderCreateTaskPage);
taskRouter.post("/create",taskController.handelCreateTask);

taskRouter.get("/tasks",taskController.renderViewTaskPage);
taskRouter.get("/tasks", isAuthenticated, taskController.handelViewAllTasks);
// taskRouter.post("/create",taskController.renderCreateTaskPage);


export default taskRouter;