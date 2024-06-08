import Connection from "../models/connectionSchema.js"
import getConnectionId from "../utils/getConnectionId.js";

const getSharedChat = async (req, res) =>{
  const { sender } = req.params; 
  const { receiver } = req.params;

  const conversationIds = await getConnectionId(sender, receiver);
  
  if (conversationIds.length > 0) {
    const getData = await Connection.findOne({ conversationIds })
    
    if(getData){
      res.json(getData)
    }else{
      return res.status(400).json({message:'Data Not Found'})
    }
  }
}

export default getSharedChat