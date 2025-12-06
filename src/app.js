const express = require("express");
const { authUser } = require("./middlewares/auth");
const {connectDB} = require("./config/database");
const User  = require("./models/user");
const user = require("./models/user");
const app = express();
const {validateSignUpUser} = require("./utils/validation");
const bcrypt = require ("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

const loggedInUser ='';

app.post("/signup", async (req, res) => {

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

app.get("/profile", authUser, async (req, res) => {
    try{
        res.send(req.user)
    }
    catch(err) {
        res.send("Error accessing "+ err.message);
    }

})

app.post("/login", async (req, res) => {
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

app.post("/sendConnectionRequest", authUser, async(req, res) => {
    //conn logic

    console.log(req.user)

    res.send("Connection sent by "+ req.user.firstName)
})

connectDB()
    .then(() => {
        console.log("Connection established");
        app.listen(7777, () => {
            console.log("Port 7777 is now in use")
        });
    })
    .catch(() => {
        console.log("Database connection failed");
    })





