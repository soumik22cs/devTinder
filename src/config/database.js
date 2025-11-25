const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://pilipitambar:M5W6OypYm0huqKhx@cluster0.rtk8nhb.mongodb.net/devTinder");
}

module.exports = {connectDB};