const express = require("express");
const { authUser } = require("../middlewares/auth");
const {validateUserEditFields} = require("../utils/validation")

const profileRouter = express.Router();
const validator = require("validator");
const bcrypt = require("bcrypt");

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

profileRouter.patch("/profile/forgotPassword", authUser, async (req, res) => {
    try{
        const loggedInUser = req.user;
        if(!validator.isStrongPassword(req.body.password)){
                throw new Error("Weak password!!");
        }
        const passwordHash = await bcrypt.hash(req.body.password, 10);

        loggedInUser.password = passwordHash;
        await loggedInUser.save();
        res.send("Password updated successfully")
    }
    catch(err) {
        res.send("Error resetting password "+ err.message)
    }
})

module.exports = profileRouter;