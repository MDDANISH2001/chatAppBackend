import express from 'express';
import fetchUserNames from '../../controllers/adminControllers/fetchUserNames.js';
import getUserDetails from '../../controllers/getUserDetails.js';
import getAllChats from '../../controllers/adminControllers/getAllChats.js';

const adminRoutes = express.Router();

adminRoutes.get('/users-details', fetchUserNames)
adminRoutes.get('/geting-user-details', getUserDetails)
adminRoutes.get('/conversation-chat', getAllChats)


export default adminRoutes