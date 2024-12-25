"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_controller_1 = require("../controllers/task.controller");
const validation_1 = require("../middlewares/validation");
const logger_1 = require("../middlewares/logger");
const errorHandler_1 = require("../middlewares/errorHandler");
const router = express_1.default.Router();
// Log all incoming requests
router.use(logger_1.logger);
// Routes for managing tasks
router.post('/', validation_1.validateCreateTask, task_controller_1.TaskController.createTask); // validate input before creating
router.get('/', task_controller_1.TaskController.getTasks);
router.put('/:id', task_controller_1.TaskController.updateTask);
router.delete('/:id', task_controller_1.TaskController.deleteTask);
router.use(errorHandler_1.errorHandler);
exports.default = router;
