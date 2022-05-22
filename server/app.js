//import
require('dotenv').config()

const express = require('express')
const router = require('./src/routes')
const cors = require('cors')

const app = express()

// PORT
const PORT = 5000;

app.use(express.json())
app.use(cors())
app.use('/api/v1/', router) //url
app.use('/uploads', express.static('uploads'));

// listen port
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))