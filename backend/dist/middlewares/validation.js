"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateTask = validateCreateTask;
function validateCreateTask(req, res, next) {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }
    // Optionally, validate description if required
    next();
}
