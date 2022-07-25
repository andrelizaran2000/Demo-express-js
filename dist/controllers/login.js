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
exports.validateToken = exports.register = exports.login = void 0;
// Helpers
var unwrapToken_1 = __importDefault(require("../helpers/unwrapToken"));
var generateHash_1 = __importDefault(require("../helpers/generateHash"));
var generateToken_1 = __importDefault(require("../helpers/generateToken"));
var comparePasswords_1 = __importDefault(require("../helpers/comparePasswords"));
// Models
var User_1 = __importDefault(require("../models/User"));
// Env
var env_1 = require("../utils/env");
function login(userName, password, res) {
    return __awaiter(this, void 0, void 0, function () {
        var savedUser, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User_1.default.findOne({ userName: userName })];
                case 1:
                    savedUser = _a.sent();
                    if (savedUser === null)
                        return [2 /*return*/, res.status(400).json({ mssg: 'User or password wrong' })];
                    if (!(0, comparePasswords_1.default)(savedUser.password, password))
                        return [2 /*return*/, res.status(400).json({ mssg: 'User or password wrong' })];
                    token = (0, generateToken_1.default)(savedUser.id);
                    res.json({ token: token });
                    return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
function register(userName, password, privateKey, res) {
    return __awaiter(this, void 0, void 0, function () {
        var hash, user, savedUser, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (privateKey !== env_1.APP_KEY)
                        return [2 /*return*/, res.status(400).json({ mssg: 'Error creating user' })];
                    hash = (0, generateHash_1.default)(password);
                    user = new User_1.default({ userName: userName, password: hash });
                    return [4 /*yield*/, user.save()];
                case 1:
                    savedUser = _a.sent();
                    token = (0, generateToken_1.default)(savedUser.id);
                    res.status(201).json({ token: token });
                    return [2 /*return*/];
            }
        });
    });
}
exports.register = register;
function validateToken(token, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, savedUser, newToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = (0, unwrapToken_1.default)(token).id;
                    return [4 /*yield*/, User_1.default.findById(id)];
                case 1:
                    savedUser = _a.sent();
                    if (savedUser === null)
                        return [2 /*return*/, res.status(403).json({ mssg: 'Bad token' })];
                    newToken = (0, generateToken_1.default)(id);
                    res.json({ token: newToken });
                    return [2 /*return*/];
            }
        });
    });
}
exports.validateToken = validateToken;
