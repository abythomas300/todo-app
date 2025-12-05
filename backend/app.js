const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const taskRoutes = require('./routes/taskRoute')

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

// general middlewares
app.use('/tasks', taskRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`Server running at http://localhost:${process.env.PORT}`)
})