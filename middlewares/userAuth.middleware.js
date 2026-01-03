import jwt from "jsonwebtoken";
import env from "../config/dotenv.js";
import User from "../models/user.model.js";


const isAuthenticated = async(req,res,next) =>{
    try {
        const {token} = req.cookies;

        if (!token) {
            console.log("Token expired or not found...");
            return res.redirect("/user/login");
        }

        const decoded = jwt.verify(token,env.JWT_SECRET);

        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        console.log("Error in auth:",error.message);
        return res.redirect("/user/login");
    }
}

const isAdmin = (req,res,next) => {
    if (req.user && req.user.role == "admin") {
        next();
    } else {
        console.log("Access denied...");
        return res.redirect("/task/error-401");
    }
}


export {isAuthenticated,isAdmin};