const express = require("express");
const { authAdmin, authUser } = require("./middlewares/auth");
const {connectDB} = require("./config/database");
const User  = require("./models/user");
const user = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {

    //Creating a new instance of the model User and passing data
    const user = new User(req.body);
    try{
        await user.save();
        res.send("User added successfully.")
    } catch(err) {
        res.status(400).save("Data could not be saved", err.message);
    }
})

app.get("/user", async (req, res) => {

    const userEmail = req.body.emailId;
    try{
        const user = await User.find({emailId: userEmail});
        if(user.length === 0) {
            res.send("User does not exist");
        }
        else {
            res.send(user);
        }
    }
    catch(err) {
        res.status(500).send("Something in the way", err.message);
    }
})

app.get("/feed", async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    }
    catch(err) {
        res.status(500).send("Something in the way", err.message);
    }
})

app.get("/userByID", async (req, res) => {

    try{
        const user = await User.findById('6925fed3ee84fc740bfd1805');
        if(user.length === 0) {
            res.send("User does not exist");
        }
        else {
            res.send(user);
        }
    }
    catch(err) {
        res.status(500).send("Something in the way", err.message);
    }
})

app.delete("/delete", async (req, res) => {
    try{
        const userId = req.body.userId;
        const user = await User.findByIdAndDelete(userId);
        console.log(user)
        if(!user) {
            res.status(404).send("No user found")
        }
        else {
            res.send("User found and deleted with email" + req.body.userId);
        }
    }
    catch(err) {
        res.status(500).send("Something in the way", err.message);
    }
})

app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;

    try{
        const user  = await User.findByIdAndUpdate(userId, data);
        if(!user) {
            res.status(404).send("User not found");
        }
        else {
            res.send("User updated");
        }
    }
    catch(err) {
        res.status(500).send("Something in the way", err.message);
    }
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





