import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let feedbacks = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { feedbacks: feedbacks });
});

app.post("/submit", (req, res) => {
  feedbacks.push({ text: req.body.message, time: new Date().toString() });
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (!isNaN(id)) {
    feedbacks.splice(id, 1);
  }
  console.log(feedbacks);
  res.redirect("/");
});

app.listen(port, () => {
  console.log("app running on port " + port);
});