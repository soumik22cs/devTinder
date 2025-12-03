const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 10,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "others"].includes(value)) {
                throw new Error("Gender not a valid value");
            }
        },
    },
    skills: {
        type: [String],
    },
    photoUrl: {
        type: String,
        default: "https://www.vhv.rs/dpng/d/312-3120300_default-profile-hd-png-download.png"
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);

