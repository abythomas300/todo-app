const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')

// route handlers

// Get all tasks
router.get('/', taskController.getAllTasks)
// Add a new task
router.post('/', taskController.createNewTask)
// Delete already existing task
router.delete('/:id', taskController.deleteTask)
// Edit task
router.put('/', taskController.editTask)
// Mark a task as complete
router.put('/:id', taskController.markAsComplete)


module.exports = router