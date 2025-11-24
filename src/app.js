const express = require("express");
const { authAdmin, authUser } = require("./middlewares/auth");

const app = express();

app.use("/admin", authAdmin);

app.use("/admin/getAllData",(req, res) => {
    console.log("Fetching all data");
    res.send("All data fetched");
})

app.use("/admin/deleteUser", (req, res) => {
    try{
        console.log("Deleting a user");
        throw new Error ("dashdjksad");
        res.send("User deleted");
    }
    catch(err) {
         console.log(err);
         res.status(500).send("Something went wrong!!")
    }
    
})

app.use("/", (err, req, res, next) => {
    if(err) {
        res.status(500).send("Something went wrong");
    }
})

app.use("/user/data", authUser, (req, res) => {
    console.log("Getting user data");
    res.send("User data fetched");
})

app.use("/user/login", (req, res) => {
    console.log("User is trying to login.");
    res.send("User logged in")
})

app.listen(7777, () => {
    console.log("Port 7777 is now in use")
});