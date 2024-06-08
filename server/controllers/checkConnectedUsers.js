import Connection from "../models/connectionSchema.js";
import { checkIds } from "../utils/checkIds.js";

const checkConnectedUsers = async(req, res) =>{
    try {
        const { userId } = req.params;
        const user2Data = req.body;
        const user2Id = user2Data._id
        
        if(!userId){
          return res.status(404).json({ message: 'User ID not found' });      
        }

        const conversationExists = await checkIds(userId, user2Id); 

        if (conversationExists) {
          return res.status(200).json({userId, user2Data, user2Name: user2Data.username, message: 'Conversation already exists' });
        }
        
        const conversationIds = userId + "/" + user2Id
        
        const userInfo = new Connection({
          conversationIds: conversationIds,
        });
        
        const doc = await Connection.create(userInfo);
        
        res.status(200).json({userId, user2Data, user2Name: user2Data.username});
      } catch (error) {
        console.error('Error during updateUserData:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

export default checkConnectedUsers