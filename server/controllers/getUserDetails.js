import User from "../models/registerSchema.js";

const getUserDetails = async(req, res) =>{
    try {
        const users = await User.find({}, 'username email keys').exec();
    
        if (users) {
          res.json(users);
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        console.error('Error during getUserDetails:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }

}

export default getUserDetails;