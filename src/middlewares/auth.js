const jwt = require ("jsonwebtoken");
const User  = require("../models/user");

    const authUser =  async (req, res, next) => {

        try{
            const {token} = req.cookies;
            if(!token) {
                throw new Error("Invalid Token");
            }

            const decodedObj = jwt.verify(token, "SecretKey");
            const user = await User.findById(decodedObj._id);

            if(!user) {
                throw new Erroor("User not found");
            }
            req.user = user;
            next();
        }
        catch(err) {
            res.send("Error in authorization: "+ err.message);
        }
    }


module.exports ={ 
    authUser
}