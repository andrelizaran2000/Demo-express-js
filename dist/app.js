"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
var express_1 = __importDefault(require("express"));
var mongooseConnection_1 = __importDefault(require("./helpers/mongooseConnection"));
// Routes
var login_1 = __importDefault(require("./routes/login"));
var app = (0, express_1.default)();
var PORT = 4000;
(0, mongooseConnection_1.default)();
app.use(express_1.default.json());
app.use('/login', login_1.default);
app.listen(PORT, function () {
    console.log("Listening in ".concat(PORT, " port"));
});
