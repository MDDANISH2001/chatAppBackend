import Connection from "../models/connectionSchema.js";

const getConnectionId = async (sender, receiver) =>{
const existingConversations = await Connection.find({});

  const conversationIds = existingConversations.filter((conversation) => {
    const splitConversationsId = conversation.conversationIds.split('/');
    return (
      (splitConversationsId[0] === sender && splitConversationsId[1] === receiver) ||
      (splitConversationsId[0] === receiver && splitConversationsId[1] === sender)
    );
  })
  .map((conversation) => conversation.conversationIds)


  return conversationIds
}

export default getConnectionId