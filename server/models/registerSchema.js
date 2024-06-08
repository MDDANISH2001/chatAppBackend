// server/models/User.js
import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique:true },
  password: { type: String, required: true, minLength:8},
  phone: { type: Number, required: true, minLength:10},
  keys: {
    publicKey: { type: String, required: true, unique : true},
    privateKey: { 
      iv: { type: String, required: true, unique : true },
      encryptedMessage:{ type: String, required: true, unique : true },
      tag: { type: String, required: true, unique : true },
    },
    rootKey: { 
      iv: { type: String, required: true, unique : true },
      encryptedMessage:{ type: String, required: true, unique : true },
      tag: { type: String, required: true, unique : true },
    },
  }
});

const User = model('register', userSchema);

export default User ;
