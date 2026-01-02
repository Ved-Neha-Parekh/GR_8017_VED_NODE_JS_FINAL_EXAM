import express from "express";
import dotenv from "./config/dotenv.js";
import db from "./config/db.js";
import userRoutes from "./routes/user.route.js";

const app = express();
const port = dotenv.PORT || 8081;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/user",userRoutes);

db()
  .then(() => {
    app.listen(port, () => {
      console.log(`server start on http://localhost:${port}/user`);
    });
  })
  .catch((err) => {
    console.log("Server failed to start..", err.message);
  });
