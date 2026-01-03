import Task from "../models/tasks.model.js";
import Category from "../models/category.model.js";

const taskController = {
  renderCreateTaskPage(req, res) {
    return res.render("../views/pages/createTask.ejs");
  },
  async handelCreateTask(req, res) {
    try {
      const { title, description, status, priority, dueDate, category } =
        req.body;

      let categoryId;

      if (category) {
        let existingCategory = await Category.findOne({ name: category });

        if (existingCategory) {
          categoryId = existingCategory.id;
        } else {
          const newCat = await Category.create({ name: category });
          categoryId = newCat.id;
        }
      }

      await Task.create({
        title,
        description,
        status,
        priority,
        dueDate,
        category: categoryId,
        createdBy: req.user.id,
      });

      console.log("Task created by:", req.user.username);
      return res.redirect("/task/tasks");
    } catch (error) {
      console.log("Error in create task:", error.message);
      return res.redirect("/task/create");
    }
  },
  renderViewTaskPage(req, res) {
    return res.render("../views/pages/viewTasks.ejs");
  },
  async handelViewAllTasks(req, res) {
    try {
      let tasks;

      if (req.user.role === "admin") {
        tasks = await Task.find().populate("createdBy", "username email").populate("category");
      } else {
        tasks = await Task.find({ createdBy: req.user.id }).populate("category");
      }

      res.render("../views/pages/viewTasks.ejs", {
        tasks: tasks,
        user: req.user,
        isAdminView: req.user.role === "admin",
      });
    } catch (error) {
      console.log("Error fetching tasks:", error);
      res.status(500).send("Error fetching tasks");
    }
  },
  async handelDeleteTask(req, res) {
    try {
      const { id } = req.params;

      const task = await Task.findByIdAndDelete(id);

      return res.redirect("/task/tasks");
    } catch (error) {
      console.log("Del error:", error.message);
      return res.redirect(req.get("Referrer") || "/user/");
    }
  },
  renderError401Page(req, res) {
    return res.render("../views/pages/error-401.ejs");
  },
  async renderUpdatePage(req, res) {
    try {
      const { id } = req.params;
      const task = await Task.findById(id);

      if (req.user.role !== "admin" && task.createdBy != req.user.id) {
        return res.redirect("/task/tasks");
      }

      res.render("../views/pages/editTask.ejs", { task });
    } catch (error) {
      console.log(error);
      res.redirect("/task/tasks");
    }
  },
  async handelUpdateTask(req, res) {
    try {
      const { id } = req.params;

      if (req.user.role === "admin") {
        await Task.findByIdAndUpdate(id, req.body);
      } else {
        await Task.findOneAndUpdate(
          { _id: id, createdBy: req.user.id },
          req.body
        );
      }

      res.redirect("/task/tasks");
    } catch (error) {
      console.log("Update Error:", error);
      res.redirect("/task/tasks");
    }
  },
};

export default taskController;
