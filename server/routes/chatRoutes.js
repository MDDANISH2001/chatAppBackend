import express from 'express';
import getUserDetails from '../controllers/getUserDetails.js';
import getSharedChats from '../controllers/getSharedChats.js';
import auth from '../controllers/auth.js'
import checkConnectedUsers from '../controllers/checkConnectedUsers.js';
import addChatToDb from '../controllers/addChatToDb.js';
import getChatNames from '../controllers/getChatNames.js';

const userRoutes = express.Router();

userRoutes.post('/login', auth.login)

userRoutes.post('/register', auth.register)

userRoutes.get('/users', getUserDetails)

userRoutes.post('/userdata/:userId', checkConnectedUsers);

userRoutes.post('/shareddata/:connectionId', addChatToDb);

userRoutes.get('/shareddata/:sender/:receiver', getSharedChats);

userRoutes.get('/chatnames/:senderId', getChatNames);

export default userRoutes