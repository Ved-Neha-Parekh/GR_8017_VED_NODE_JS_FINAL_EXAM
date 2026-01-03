import Task from "../models/tasks.model.js";

const taskController = {
  renderCreateTaskPage(req, res) {
    return res.render("../views/pages/createTask.ejs");
  },
  async handelCreateTask(req, res) {
    try {
      const { title, description, status, priority, dueDate, category,  } =
        req.body;

      const newTask = await Task.create({
        title,
        description,
        status,
        priority,
        dueDate,
        category,
        createdBy: req.user.id,
      });

      console.log("Task created...");
      return res.redirect("/task/tasks", 201, { tasks:newTask });
    } catch (error) {
      console.log("Error in create task:", error.message);
      return res.redirect("/task/create", {});
    }
  },
  renderViewTaskPage(req, res) {
    return res.render("../views/pages/viewTasks.ejs");
  },
  async handelViewAllTasks(req, res) {
    try {
      let tasks;

      if (req.user.role === "admin") {
        tasks = await Task.find().populate("createdBy", "username email");
      } else {
        tasks = await Task.find({ createdBy: req.user.id });
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
};

export default taskController;
