import Connection from "../../models/connectionSchema.js";
import User from "../../models/registerSchema.js";
import mongoose  from "mongoose";

const fetchUserNames = async (req, res) =>{
    
    try{
        const connectedUserIds = await Connection.aggregate([
            {
                $project: {
                    _id: 0,
                    conversationIds: 1,
                },
            }
        ]);

        const allIdsSet = new Set();

        connectedUserIds.forEach(conversation => {
            const splitIds = conversation.conversationIds.split('/');
            splitIds.forEach(id => {
                allIdsSet.add(id);
            });
        });
        
        const uniqueIds = Array.from(allIdsSet);
       
        const conversationIdsAsObjectIds = uniqueIds.map((id) => new mongoose.Types.ObjectId(id));
        
        const details = await User.find(
            { _id: { $in: conversationIdsAsObjectIds } },
            { _id: 1, username: 1 }
        ).exec();
        
        let combinedUserNames = [];
        
        connectedUserIds.forEach(connection => {
            const splitIds = connection.conversationIds.split('/');
            let userNames = [];
            
            splitIds.forEach(id => {
                let matchedDetail = details.find(detail => detail._id.toString() === id);
                if (matchedDetail) {
                    userNames.push(matchedDetail.username);
                }
            });
            
            if (userNames.length > 0) {
                combinedUserNames.push({
                    chatName: userNames.join('/'),
                    chatIds: connection.conversationIds
                });
            }
        });

        const response = res.json(combinedUserNames)
        return { response , connectedUserIds};

    }catch (error){
        console.error(error);
    }
}

export default fetchUserNames;