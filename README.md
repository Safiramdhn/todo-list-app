# Kitameraki Task Management App

## Overview
This is a full-stack Task Management Application developed as part of the Kitameraki technical recruitment process. The application allows users to manage tasks with advanced form customization features.

## Project Structure
- `frontend/`: React.js frontend application
- `backend/`: Node.js backend API

## Part 1: Basic Task Management

### Frontend Features
- Create new tasks with:
  - Required task title
  - Optional task description
- View list of all tasks
- Delete tasks
- Inline task editing
- Infinite scrolling (custom implementation)
- Uses Fluent UI components

### Backend Features
- RESTful API for task CRUD operations
- In-memory task storage
- Pagination support
- Appropriate HTTP methods and status codes

## Part 2: Dynamic Form Customization

### Advanced Frontend Features
- Settings page for form configuration
- Drag-and-drop field addition
- Customizable optional fields
- Supported field types:
  - TextField
  - DatePicker
  - SpinButton
- Configurable form applies across:
  - Create Task form
  - Edit Task form
  - Task List

## Prerequisites
- Node.js
- npm or yarn
- React.js
- Fluent UI
- React DnD (Drag and Drop) library

## Installation

### Backend Setup
```bash
cd backend
npm install
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Development Branches
- `main`: Initial project setup
- `part_one`: Basic task management implementation
- `part_two`: Dynamic form customization

## Technologies Used
- Frontend: React.js
- UI Library: Fluent UI
- Backend: Node.js
- Drag and Drop: React DnD

## Usage Scripts
```
# Install dependencies for both frontend and backend
npm install

# Run frontend and backend concurrently
npm start

# Run frontend separately
npm run start:frontend

# Run backend separately
npm run start:backend
```

## Contact
For any questions, please contact: safiramadhani9@gmail.com

## Notes
- No external database used (in-memory storage)
- Infinite scroll implemented without libraries
