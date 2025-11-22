const express = require("express");

const app = express();

//used for /usea, r is optional
app.get("/user?a", (req, res) => {
    res.send({firstName: "Soumik", lastName: "Chowdhury"});
});

//used for /userrrrrrrrrrrrra, r can repeat multiple times, only r
app.get("/user+a", (req, res) => {
    res.send({firstName: "Soumik", lastName: "Chowdhury1"});
});

//used for /usersaasdsdassxa, * means anything in between but start with user and end with a
app.get("/user*a", (req, res) => {
    res.send({firstName: "Soumik", lastName: "Chowdhury2"});
});

//er is grouped and with ? becomes optional
app.get("/us(er)?a", (req, res) => {
    res.send("Eureka")
})

//takes anything ending with fly
app.get(/.*fly$/, (req, res) => {
    res.send("Dancing husky")
})

// http://localhost:7777/user?userId=101&dept=PURC
app.get("/user", (req, res) => {
    console.log(req.query); //{ userId: '101', dept: 'PURC' }
    res.send("Passing query params now")
});

// http://localhost:7777/user/1/LOG/US
app.get("/user/:userId/:dept/:country", (req, res) => {
    console.log(req.params); //{ userId: '1', dept: 'LOG', country: 'US' }
    res.send("Now showing params");
})

app.post("/user", (req, res) => {
    res.send("Data fetched successfully.");
});

app.patch("/user", (req, res) => {
    res.send("Data patched");
});

app.delete("/user", (req, res) => {
    res.send("Data deleted successfully.");
});

app.use("/test", (req, res) => {
    res.send("Testing 1,2,3....");
});


app.listen(7777, () => {
    console.log("Port 7777 is now in use")
});