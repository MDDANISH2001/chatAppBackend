import express from 'express';
import connectDB from './server/config/db.js';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import userRoutes from './server/routes/chatRoutes.js';

import cors from 'cors'
import addChatToDb from './server/controllers/addChatToDb.js';
import adminRoutes from './server/routes/adminRoutes/adminRoutes.js';

dotenv.config();

const app = express();
const server = createServer(app);

app.use(cors())

const io = new Server(server, {
    cors:{
        origin:  process.env.DEV_URL || process.env.BASE_URL,
        methods: ["GET", "POST"]
    },
})

io.on("connection", (socket) =>{

    socket.on("join_room", (data, callback) =>{
        socket.join(data);

        if (callback) {
            callback(true); // Acknowledge the successful join
        }
    })
    socket.on("send_message", (data) =>{
        const dataToSave = { message: data.encryptedMessage, addedUserId: data.addedUserId, messagedUserId: data.senderId } 
        addChatToDb(dataToSave);

        socket.to(data.roomId).emit("receive_message", data.message);
    })
})

connectDB();

app.use(express.json())

app.use('/', userRoutes);
app.use('/admin-page', adminRoutes);


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
