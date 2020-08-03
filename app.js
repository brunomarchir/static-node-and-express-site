const express = require("express");
const app = express();
const {
  projects,
} = require("./data/data.json");

app.set("view engine", "pug");
app.use(express.json());
app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { projects });
});

app.get("/about", (req, res, next) => {
  res.render("about");
});

app.get("/projects/:id", (req, res, next) => {
  const projectId = req.params.id;
  const project = projects.find(({ id }) => id === +projectId);
  if (project) {
    res.render("project", { project });
  } else {
    res.sendStatus(404);
  }
});

app.use((req, res, next) => {
  const err = new Error("Oh no! Unfortunately, this page does not exist.");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render("error");
  console.log("This is an error");
});

app.listen(3000, () => {
  console.log("The app is running in localhost:3000");
});
