"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValid = void 0;
// import dayjs from "dayjs";
var moment_1 = __importDefault(require("moment"));
var isValid = function (date) {
    return moment_1.default(date, "YYYY-MM-DD", true).isValid();
};
exports.isValid = isValid;
