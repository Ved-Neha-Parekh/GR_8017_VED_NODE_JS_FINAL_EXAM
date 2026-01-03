import express from "express";
import dotenv from "./config/dotenv.js";
import db from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import taskRoutes from "./routes/task.route.js";
import cookieParser from "cookie-parser";

const app = express();
const port = dotenv.PORT || 8081;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/user",userRoutes);
app.use("/task",taskRoutes);

app.get("/", (req, res) => {
  res.redirect("/user/login");
});

db()
  .then(() => {
    app.listen(port, () => {
      console.log(`server start on http://localhost:${port}/user`);
    });
  })
  .catch((err) => {
    console.log("Server failed to start..", err.message);
  });
