import Connection from "../models/connectionSchema.js";
import User from "../models/registerSchema.js";
import mongoose  from "mongoose";

const getChatNames = async (req, res) =>{
    
    try{
        const connectedUserIds = await Connection.aggregate([
            {
                $project: {
                    _id: 0,
                    connectionIds: '$conversationIds',
                    arrayLength: { $size: '$sharedInfo' }, // Replace with the actual array field name
                },
            }
        ]);

        const { senderId } = req.params

        const conversationIds = connectedUserIds.map((conversation) => {
            const splitConversationsId = conversation.connectionIds.split('/');
            const temp1 = (splitConversationsId[0] === senderId);
            const temp2 = (splitConversationsId[1] === senderId);
            if ( temp1 || temp2 ){
                if (conversation.connectionIds){
                    return temp1 ? splitConversationsId[1] : splitConversationsId[0];
                }
            }
        }).filter(id => id !== undefined);
      
        const conversationIdsAsObjectIds = conversationIds.map((id) => new mongoose.Types.ObjectId(id));
        
        const details = await User.find(
            { _id: { $in: conversationIdsAsObjectIds } },
            { _id: 1, username: 1 }
        ).exec();

        const usersDetails = details.map((user) => ({
            userId: user._id,
            user2name: user.username,
        }));

        return res.json(usersDetails);

    }catch (error){
        console.error(error);
    }
}

export default getChatNames;