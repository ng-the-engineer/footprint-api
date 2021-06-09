"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var visitSchema = new Schema({
    url: String,
    element: String,
    timestamp: Date,
});
exports.VisitModel = mongoose_1.default.model("Visit", visitSchema);
