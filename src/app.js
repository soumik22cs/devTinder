const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
    res.send("Hello from the other side!!");
});

app.use("/test", (req, res) => {
    res.send("Testing 1,2,3....");
});

app.use("/", (req, res) => {
    res.send("Listening on port 7777!!");
});

app.listen(7777, () => {
    console.log("Port 7777 is now in use")
});