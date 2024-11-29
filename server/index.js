const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const cors = require('cors')

const app = express()

const server = http.createServer(app)
const io = socketIO(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
})

app.use(cors('*'))

app.use(express.json())

app.post('/send', (req, res) => {
    const message = req.body.message
    console.log(message)

    io.emit('pushNotification', {
        message
    })
    res.status[200].send({
        message: 'Message sent successfully'
    })

    io.on('connection', (socket) => {
        console.log('Connected')
        socket.on('disconnect', () => {
            console.log('Client disconnected')
        })
    })
})

server.listen(4000, () => {
    console.log('Server is running on port 4000')
})