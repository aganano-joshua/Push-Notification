const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();

const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});

const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://agananojoshua001:hn0TXhS7gNJTFm3y@jospat.9beblpz.mongodb.net/';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const dbName = 'todoapi';
const collectionName = 'users'; 
let users = {};

app.use(cors('*'));
app.use(express.json());

// io.on('connection', (socket) => {
//     console.log('A user connected');

//     socket.on('register', async (userId) => {
//         console.log(`Registering user: ${userId}`);

//         try {
//             await client.connect();
//             const database = client.db(dbName);
//             const collection = database.collection(collectionName);

//             console.log('User Id: ',userId)
//             const user = await collection.findOne({ email: userId });

//             if (user) {
//                 users[userId] = socket.id;
//                 console.log(`User ${userId} registered with socket ID ${socket.id}`);
//             } else {
//                 console.log(`User ${userId} not found in the database. Registration skipped.`);
//             }
//         } catch (error) {
//             console.error(`Error during registration for user ${userId}:`, error);
//         } finally {
//             // Do not close the connection here; let the connection persist for other operations
//         }
//     });

//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//         for (let userId in users) {
//             if (users[userId] === socket.id) {
//                 delete users[userId];
//                 break;
//             }
//         }
//     });
// });


// app.post("/notify", (req, res) => {
//     const { message, userId } = req.body;
//     console.log(`Sending message to user ${userId}: ${message}`);

//     if (users[userId]) {
//         io.to(users[userId]).emit('pushNotification', { message });
//         console.log(`Message sent to user ${userId}`);
//         res.status(200).send({ message: 'Message sent successfully' });
//     } else {
//         console.log(`User ${userId} not found`);
//         res.status(404).send({ message: 'User not found' });
//         console.log('Users are',users)
//     }
// });

io.on('connection', (socket) => {
    console.log('A user connected');

    // Register the user and store in the database
    socket.on('register', async (userId) => {
        console.log(`Registering user: ${userId}`);

        try {
            await client.connect();
            const database = client.db(dbName);
            const activeUsersCollection = database.collection('activeUsers'); // Use a dedicated collection for active users

            const user = await database.collection(collectionName).findOne({ email: userId });

            if (user) {
                // Store the user's socket ID and registration time in the database
                await activeUsersCollection.updateOne(
                    { email: userId },
                    { $set: { socketId: socket.id, connectedAt: new Date() } },
                    { upsert: true }
                );
                console.log(`User ${userId} registered with socket ID ${socket.id}`);
            } else {
                console.log(`User ${userId} not found in the database. Registration skipped.`);
            }
        } catch (error) {
            console.error(`Error during registration for user ${userId}:`, error);
        }
    });

    // Remove the user from the database when they disconnect
    socket.on('disconnect', async () => {
        console.log('User disconnected');
        try {
            await client.connect();
            const database = client.db(dbName);
            const activeUsersCollection = database.collection('activeUsers');

            // Find and remove the user by socket ID
            await activeUsersCollection.deleteOne({ socketId: socket.id });
            console.log(`Removed user with socket ID ${socket.id}`);
        } catch (error) {
            console.error('Error during disconnect:', error);
        }
    });
});

// Endpoint to send notifications
app.post("/notify", async (req, res) => {
    const { message, userId } = req.body;
    console.log(`Sending message to user ${userId}: ${message}`);

    try {
        await client.connect();
        const database = client.db(dbName);
        const activeUsersCollection = database.collection('activeUsers');

        // Find the active user by email
        const user = await activeUsersCollection.findOne({ email: userId });

        if (user) {
            // Emit the message to the user's socket ID
            io.to(user.socketId).emit('pushNotification', { message });
            console.log(`Message sent to user ${userId}`);
            res.status(200).send({ message: 'Message sent successfully' });
        } else {
            console.log(`User ${userId} not found in active users`);
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error in /notify:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

server.listen(4000, () => {
    console.log('Server is running on port 4000');
});