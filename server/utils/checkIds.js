import Connection from "../models/connectionSchema.js";

export const checkIds = async (userId, user2Id) => {
  const existingConversations = await Connection.find({});

  const conversationExists = existingConversations.some((conversation) => {
    const splitConversationsId = conversation.conversationIds.split("/");
    return (
      (splitConversationsId[0] === userId &&
        splitConversationsId[1] === user2Id) ||
      (splitConversationsId[1] === userId &&
        splitConversationsId[0] === user2Id)
    );
  });

  return conversationExists
};
