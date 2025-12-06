const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require ("bcrypt");

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
        unique: true,

    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error("Weak password detected")
            }
        }
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

userSchema.methods.checkPasswordValidity = async function(password) {
    const user = this;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid;
}

userSchema.methods.getJWT = async function() {
    const user = this;

    const token = await jwt.sign({_id: user._id}, "SecretKey", {expiresIn: "1d"});
    return token;
}

module.exports = mongoose.model("User", userSchema);

