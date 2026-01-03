import { Router } from "express";
import taskController from "../controllers/task.controller.js";
import { isAdmin, isAuthenticated } from "../middlewares/userAuth.middleware.js";

const taskRouter = Router();

taskRouter.get("/create",isAuthenticated,taskController.renderCreateTaskPage);

taskRouter.post("/create",isAuthenticated,taskController.handelCreateTask);

taskRouter.get("/tasks", isAuthenticated, taskController.handelViewAllTasks);

taskRouter.get("/edit-task/:id", isAuthenticated, taskController.renderUpdatePage);

taskRouter.post("/edit-task/:id", isAuthenticated, taskController.handelUpdateTask);

taskRouter.get("/delete-task/:id",isAuthenticated,taskController.handelDeleteTask)

taskRouter.get("/error-401", taskController.renderError401Page);

export default taskRouter;