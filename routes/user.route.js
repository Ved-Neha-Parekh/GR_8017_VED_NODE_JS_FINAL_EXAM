import { Router } from "express";
import userController from "../controllers/user.controller.js";
import {isAuthenticated} from "../middlewares/userAuth.middleware.js";

const userRouter = Router();

userRouter.get("/signup",userController.renderSignupPage);
userRouter.post("/signup",userController.handelSignup);

userRouter.get("/login",userController.renderLoginPage);
userRouter.post("/login",userController.handelLogin);

userRouter.get("/",isAuthenticated,userController.renderDashboard); // use isAdmin
export default userRouter;