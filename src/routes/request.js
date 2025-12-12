const express = require ("express");
const { authUser } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", authUser, async(req, res) => {
    //conn logic

    console.log(req.user)

    res.send("Connection sent by "+ req.user.firstName)
})

module.exports = requestRouter