"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function unwrapToken(token) {
    var cutToken = token.slice(7);
    return jsonwebtoken_1.default.decode(cutToken);
}
exports.default = unwrapToken;
