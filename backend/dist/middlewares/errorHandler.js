"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, next) {
    console.error(err); // Log the error (you might want to use a logger like Winston or Bunyan)
    res.status(500).json({
        message: 'Internal Server Error',
    });
}
