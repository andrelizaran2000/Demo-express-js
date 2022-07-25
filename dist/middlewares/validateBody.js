"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
function validateBody(req, res) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
}
exports.default = validateBody;
