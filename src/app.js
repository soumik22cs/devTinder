const express = require("express");
const { authAdmin, authUser } = require("./middlewares/auth");
const {connectDB} = require("./config/database");
const User  = require("./models/user");
const app = express();

app.post("/signup", async (req, res) => {

    //Creating a new instance of the model User and passing data

    const user = new User({
        firstName :"Sudeshna",
        lastName : "Bose",
        emailId : "sudeshna@abc.com",
        password : "octo123",
        age : 21,
        gender : "Female"
    });
    
    try{
    await user.save();
    res.send("User added successfully.")
    } catch(err) {
        res.status(400).save("Data could not be saved", err.message);
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





