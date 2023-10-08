const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
require("dotenv").config();

const PORT = process.env.PORT;

app.use(express.json(), (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static(__dirname + "/static"));

let highScores = [];

const addNewScore = (data) => {
  highScores = data;
};

// High Score
app.get("/api/highest-points", (req, res) => {
  res.send(highScores);
});

app.post("/api/highest-points", (req, res) => {
  addNewScore(req.body);
  res.send(highScores);
});

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/static/html/index.html"));
});

router.get("/game", function (req, res) {
  res.sendFile(path.join(__dirname + "/static/html/game.html"));
});

router.get("/scores", function (req, res) {
  res.sendFile(path.join(__dirname + "/static/html/scores.html"));
});

router.get("/difficulty", function (req, res) {
  res.sendFile(path.join(__dirname + "/static/html/difficulty.html"));
});

router.get("/end", function (req, res) {
  res.sendFile(path.join(__dirname + "/static/html/end.html"));
});

//add the router
app.use("/", router);
app.listen(PORT || 3000);

console.log(`Running at Port ${PORT}`);
