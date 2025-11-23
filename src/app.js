const express = require("express");
const { authAdmin, authUser } = require("./middlewares/auth");

const app = express();

app.use("/admin", authAdmin);

app.use("/admin/getAllData",(req, res) => {
    console.log("Fetching all data");
    res.send("All data fetched");
})

app.use("/admin/deleteUser", (req, res) => {
    console.log("Deleting a user");
    res.send("User deleted");
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