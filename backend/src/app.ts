import fs from "fs";
import path from "path";
import express, { Request } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import { Query } from "./interfaces/query";

const port = 5010;
const app = express();
import { VisitModel } from "./models/visit";
import { isValid } from "./utils/dateTimeChecker";

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));
app.use(bodyParser.json());
app.use(bodyParser.text({ type: "text/*" }));

app.get("/", (req, res) => {
  res.send("Hello world!!!!");
});

app.post("/visit", async (req, res) => {
  console.log("/visit is hit");
  console.log(req.body);

  try {
    const obj = JSON.parse(req.body);
    const { url, element } = obj;

    const visit = new VisitModel({
      url,
      element,
      timestamp: new Date(Date.now()),
    });

    const result = await visit.save();

    res.status(201).json({
      message: "Visit saved",
      visit: result,
    });

    console.log("saved visit! " + JSON.stringify(result, null, 2));
  } catch (err) {
    console.log("Error saving visit", err);
    res.status(500).json({ message: "Failed to save visit" });
  }
});

app.get(
  "/visits",
  async (req: Request<unknown, unknown, unknown, Query>, res) => {
    console.log("/visit is hit, query", req.query);
    const { startDate, endDate } = req.query;
    try {
      ("startDate format not correct");
      if (!isValid(startDate)) throw new Error("startDate format not correct");
      if (!isValid(endDate)) throw new Error("startDate format not correct");

      const result = await VisitModel.find({
        timestamp: {
          $gte: new Date(new Date(startDate).setHours(0, 0, 0)),
          $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
        },
      });

      res.send(result);
    } catch (error) {
      console.log(error);

      res.status(400).json({ message: error.message });
    }
  }
);

console.log(`process.env.DB_ADDRESS = ${process.env.DB_ADDRESS}`);

mongoose.connect(
  // `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@mongodb:27017/course-goals?authSource=admin`,
  `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_ADDRESS}:27017/course-goals?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log("Failed to connect to MongoDB", err);
    }

    app.listen(port, () => {
      console.log(`Listening to port ${port}`);
    });
  }
);
