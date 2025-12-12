const express = require("express");
const { authUser } = require("../middlewares/auth");
const {validateUserEditFields} = require("../utils/validation")

const profileRouter = express.Router();

profileRouter.get("/profile/view", authUser, async (req, res) => {
    try{
        res.send(req.user)
    }
    catch(err) {
        res.send("Error accessing "+ err.message);
    }

})

profileRouter.patch("/profile/edit", authUser, async (req,res) => {
    try{
        if(!validateUserEditFields(req)) {
            throw new Error("Update field is not allowed")
        }
        const loggedInUser = req.user;

        Object.keys(req.body).forEach(key => loggedInUser[key]= req.body[key]);

        await loggedInUser.save();

        res.send(`${loggedInUser.firstName}'s profile updated successfully`)
    }
    catch(err) {
        res.send("Error updating user profile, "+ err.message);
    }
})

module.exports = profileRouter;