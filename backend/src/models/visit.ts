import mongoose from "mongoose";

const Schema = mongoose.Schema;

const visitSchema = new Schema({
  url: String,
  element: String,
  timestamp: Date,
});

export const VisitModel = mongoose.model("Visit", visitSchema);
