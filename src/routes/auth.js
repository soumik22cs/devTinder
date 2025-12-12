const bcrypt = require ("bcrypt");
const User = require("../models/user");
const {validateSignUpUser} = require("../utils/validation");

const express = require("express");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {

    //Creating a new instance of the model User and passing data
    
    try{
        validateSignUpUser(req);
        const {firstName, lastName, emailId, password, age} = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName, lastName, emailId, age, password: passwordHash
        });
        await user.save();
        res.send("User added successfully.")
    } catch(err) {
        res.status(400).send("Data could not be saved "+ err.message);
    }
})

authRouter.post("/login", async (req, res) => {
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});

        if(!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await user.checkPasswordValidity(password);
        if(isPasswordValid) {

            const token = await user.getJWT();

            res.cookie("token", token)
            res.send("Login successful");
        }
        else {
            throw new Error("Invalid credentials");
        }
    }
    catch(err) {
         res.status(400).send("Invalid credentials");
    }
})

module.exports = authRouter;