"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
var express_1 = require("express");
var express_validator_1 = require("express-validator");
// Controllers
var login_1 = require("../controllers/login");
var validateBody_1 = __importDefault(require("../middlewares/validateBody"));
var router = (0, express_1.Router)();
router.get('/', function (req, res) {
    res.json({ msg: 'Hello world' });
});
router.post('/', (0, express_validator_1.body)('userName').isString(), (0, express_validator_1.body)('password').isString().isLength({ min: 8 }), function (req, res) {
    try {
        var _a = req.body, userName = _a.userName, password = _a.password;
        (0, login_1.login)(userName, password, res);
    }
    catch (err) {
        res.status(500).json({ mssg: 'Server error' });
    }
});
router.post('/register', (0, express_validator_1.body)('userName').isString(), (0, express_validator_1.body)('password').isString().isLength({ min: 8 }), (0, express_validator_1.body)('privateKey').isString().isLength({ min: 8 }), function (req, res) {
    (0, validateBody_1.default)(req, res);
    try {
        var _a = req.body, userName = _a.userName, password = _a.password, privateKey = _a.privateKey;
        (0, login_1.register)(userName, password, privateKey, res);
    }
    catch (err) {
        res.status(500).json({ mssg: 'Server error' });
    }
});
router.get('/validate-token', function (req, res) {
    try {
        var authorization = req.headers.authorization;
        (0, login_1.validateToken)(authorization, res);
    }
    catch (err) {
        res.status(500).json({ mssg: 'Server error' });
    }
});
exports.default = router;
