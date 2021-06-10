"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var morgan_1 = __importDefault(require("morgan"));
var mongoose_1 = __importDefault(require("mongoose"));
var port = 5010;
var app = express_1.default();
var visit_1 = require("./models/visit");
var dateTimeChecker_1 = require("./utils/dateTimeChecker");
var accessLogStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, "logs", "access.log"), { flags: "a" });
app.use(morgan_1.default("combined", { stream: accessLogStream }));
app.use(body_parser_1.default.json());
app.get("/", function (req, res) {
    res.send("Hello world!!!");
});
app.post("/visit", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, url, element, visit, result, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("/visit is hit");
                _a = req.body, url = _a.url, element = _a.element;
                visit = new visit_1.VisitModel({
                    url: url,
                    element: element,
                    timestamp: new Date(Date.now()),
                });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, visit.save()];
            case 2:
                result = _b.sent();
                res.status(201).json({
                    message: "Visit saved",
                    visit: result,
                });
                console.log("saved visit! " + JSON.stringify(result, null, 2));
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                console.log("Error saving visit", err_1);
                res.status(500).json({ message: "Failed to save visit" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get("/visits", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, startDate, endDate, result, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("/visit is hit, query", req.query);
                _a = req.query, startDate = _a.startDate, endDate = _a.endDate;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                ("startDate format not correct");
                if (!dateTimeChecker_1.isValid(startDate))
                    throw new Error("startDate format not correct");
                if (!dateTimeChecker_1.isValid(endDate))
                    throw new Error("startDate format not correct");
                return [4 /*yield*/, visit_1.VisitModel.find({
                        timestamp: {
                            $gte: new Date(new Date(startDate).setHours(0, 0, 0)),
                            $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
                        },
                    })];
            case 2:
                result = _b.sent();
                res.send(result);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.log(error_1);
                res.status(400).json({ message: error_1.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
console.log("process.env.DB_ADDRESS = " + process.env.DB_ADDRESS);
mongoose_1.default.connect(
// `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@mongodb:27017/course-goals?authSource=admin`,
"mongodb://" + process.env.DB_USER + ":" + process.env.DB_PWD + "@" + process.env.DB_ADDRESS + ":27017/course-goals?authSource=admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, function (err) {
    if (err) {
        console.log("Failed to connect to MongoDB", err);
    }
    app.listen(port, function () {
        console.log("Listening to port " + port);
    });
});
