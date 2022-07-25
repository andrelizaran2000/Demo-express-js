"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Private keys
var env_1 = require("../utils/env");
function generateToken(id) {
    return jsonwebtoken_1.default.sign({ id: id }, env_1.PRIVATE_KEY_DB);
}
exports.default = generateToken;
