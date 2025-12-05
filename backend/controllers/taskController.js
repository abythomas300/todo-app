const pool = require('../db')

async function getAllTasks(req, res) {
    try{
        const response = await pool.query("SELECT * FROM tasks ORDER BY created_at")
        console.log(`${response.rowCount} items fetched from DB`, response.rows)
        res.status(200).json({rows: response.rows})
    }catch(error){
        console.log("Failed to get all tasks, reason: ", error)
        res.status(400).json({message: 'Failed to get all tasks.'})
    }
}

async function createNewTask(req, res) {
    try {
        const result = await pool.query(
            "INSERT INTO tasks (title) VALUES ($1) ", [req.body.title]
        )
        res.status(201).json({message: 'Task added successfully'})
    }catch(error){
        console.log("Failed to add task, reason: ", error)
        res.status(400).json({message: 'Failed to add task.'})
    }
}

async function deleteTask(req, res) {
    try{
        console.log("ID to delete: " ,req.params.id)
        const response = await pool.query(
            "DELETE FROM tasks WHERE id=$1", [req.params.id]
        )
        res.status(200).json({message: 'Task deleted successfully'})
    }catch(error){
        res.status(400).json({message: 'Task deletion failed.'})
    }
}

async function editTask(req, res) {
    try{
        const response = await pool.query(
            "UPDATE tasks SET title = $1 WHERE id = $2", [req.body.title, req.body.taskId]
        )
        res.status(201).json({message: 'Task edited successfully'})
    }catch(error){
        console.log("Task editing failed, reason: ", erorr)
        res.status(400).json({message: 'Task edit failed'})
    }
}

async function markAsComplete(req, res) {
    try{
        await pool.query(
            "UPDATE tasks SET completed=$1 WHERE id=$2", [req.body.status, req.params.id]
        )
        res.status(200).json({message: 'Task status updated'})
    }catch(error){
        res.status(400).json({message: 'task cannot be marked as complete'})
    }
}

module.exports = {
    getAllTasks, 
    createNewTask,
    deleteTask,
    editTask,
    markAsComplete
}