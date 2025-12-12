const express = require("express");
const { authUser } = require("../middlewares/auth");

const profileRouter = express.Router();

profileRouter.get("/profile", authUser, async (req, res) => {
    try{
        res.send(req.user)
    }
    catch(err) {
        res.send("Error accessing "+ err.message);
    }

})

module.exports = profileRouter;