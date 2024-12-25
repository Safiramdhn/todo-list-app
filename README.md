# To-do's List Management App

## Overview
This is a full-stack To-do's List Management Application. The application allows users to manage tasks

## Project Structure
- `frontend/`: React.js frontend application
- `backend/`: Node.js backend API

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

## Prerequisites
- Node.js
- npm or yarn
- React.js
- Fluent UI

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

## Technologies Used
- Frontend: React.js
- UI Library: Fluent UI
- Backend: Node.js

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
