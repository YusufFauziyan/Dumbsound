//import
require('dotenv').config()

const express = require('express')
const cors = require('cors')

// import socket
const http = require('http')
const {Server} = require('socket.io')

const router = require('./src/routes')

const app = express()

// socket
const server = http.createServer(app)
const io = new Server(server, {
 cors: {
  origin: process.env.CLIENT_URL ||
          "https://dumbmerchs.netlify.app" ||
          "http://localhost:3000" //port client
 }
})

require('./src/socket')(io)

// PORT
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())

app.use('/api/v1/', router) //url
app.use('/uploads', express.static('uploads'));

// listen port
server.listen(port, () => console.log(`Listening on port ${port}!`))