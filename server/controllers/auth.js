import jwt from "jsonwebtoken";
import { hashing } from "../utils/hashingPassword.js";
import User from "../models/registerSchema.js";

import { generateKeyPair, generateRootKey} from "../utils/generateKeyPair.js";

import encryptMessage from "../utils/encryptMessage.js";

const auth = {
  async login(req, res) {
    const userInfo = req.body;

    try {
      const doc = await User.findOne({ email: userInfo.email }).exec();

      if (doc && doc._id) {
        const planPassword = userInfo.password;
        const dbPassword = doc.password;

        if (hashing.matchPassword(planPassword, dbPassword)) {
          const authToken = jwt.sign(
            { userId: doc._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );

          res.json({
            authToken,
            userId: doc._id,
            email: doc.email,
            message: "Welcome " + doc.name,
          });
        } else {
          res.status(400).json({ message: "Internal Server Error" });
        }
      } else {
        res.status(400).json({ message: "Invalid User ID" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async register(req, res) {
    const userInfo = req.body;
    userInfo.password = hashing.passwordHash(userInfo.password);

    try {
      const userKeyPair = await generateKeyPair();

      const userRootKey = await generateRootKey();

      const publicKeyString = Array.from(userKeyPair.publicKey, byte => byte.toString(16).padStart(2, '0')).join('');
      const privateKeyString = Array.from(userKeyPair.privateKey, byte => byte.toString(16).padStart(2, '0')).join('');

      const credential = "liame" + userInfo.email + "innovation is our passion";

      const slicedCredential1 = credential.slice(0, 32);
      const slicedCredential2 = credential.slice(5, 37);

      const encPrivateKey = encryptMessage(
        privateKeyString,
        slicedCredential1
      );
      const encRootKey = encryptMessage(
        userRootKey,
        slicedCredential2
      );


      userInfo.keys = {
        publicKey: publicKeyString,
        privateKey: encPrivateKey,
        rootKey: encRootKey,
      };

      const doc = await User.create(userInfo);
      if (doc && doc._id) {
        res.json({ message: "User Registered" });
      } else {
        res.json({ message: "Problem in Register" });
      }
    } catch (error) {
      console.error("Error in registration:", error);
      res.json({ message: "Problem in registration" });
    }
  },
};

export default auth;
