"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const task_route_1 = __importDefault(require("./routes/task.route"));
// Environment variables for better configurability
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const app = (0, express_1.default)();
// Middleware for CORS and JSON parsing
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/tasks', task_route_1.default);
exports.default = app;
