import fs from "fs";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

const port = 5010;
const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/visit", async (req, res) => {
  console.log("/visit is hit");
  res.send("Recorded!!");
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
