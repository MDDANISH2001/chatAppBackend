import Connection from "../../models/connectionSchema.js"
import User from "../../models/registerSchema.js";
import getConnectionId from "../../utils/getConnectionId.js";
import fetchUserNames from "./fetchUserNames.js";

const getAllChats = async (req, res) =>{
  
    const conversationData  = await Connection.find()

    if(conversationData){
      res.status(200).json(conversationData)
    }else{
      return res.status(400).json({message:'Data Not Found'})
  }
}

export default getAllChats