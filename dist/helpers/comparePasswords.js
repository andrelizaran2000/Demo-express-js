"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
var bcryptjs_1 = __importDefault(require("bcryptjs"));
function comparePasswords(hash, password) {
    return bcryptjs_1.default.compareSync(password, hash);
}
exports.default = comparePasswords;
