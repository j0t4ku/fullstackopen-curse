const express = require('express')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })


app.use('/api/blogs', blogsRouter)

module.exports = app