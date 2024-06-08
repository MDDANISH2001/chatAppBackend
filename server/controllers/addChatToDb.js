import Connection from "../models/connectionSchema.js";
import getConnectionId from "../utils/getConnectionId.js";

const addChatToDb = async (dataToSave) => {
  // const chatData = dataToSave.message; 
  const connectionId = dataToSave.addedUserId; //id of added user
  const user1Id = dataToSave.messagedUserId; //id of loggedinuser
  
  const conversationIds = await getConnectionId(user1Id, connectionId);

  const chatData = {
    message: dataToSave.message,
    messagedUserId: dataToSave.messagedUserId
  }
  
  if (conversationIds.length > 0) {
    const postData = await Connection.findOne({ conversationIds });
    postData.sharedInfo.push(chatData);
    await postData.save();
    return { message: "Conversation already exists" };
  } 
  
  else {
    return { message: "Conversation data do not  exists" };
  }
};

export default addChatToDb;