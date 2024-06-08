// server/models/User.js
import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const connectionSchema = new Schema({
  conversationIds: { type: String, required: true },
  sharedInfo: [{ 
      message: {type: String, default:null},
      messagedUserId: { type: String, require: true}
   }],
});


const Connection = model('Connection', connectionSchema);

export default Connection ;
