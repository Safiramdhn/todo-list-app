"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccess = sendSuccess;
exports.sendError = sendError;
function sendSuccess(res, data, message = 'Request successful', status = 200) {
    return res.status(status).json({
        message,
        data,
    });
}
function sendError(res, message, status = 500) {
    return res.status(status).json({
        message,
    });
}
