const validator  = require('validator');

const validateSignUpUser = (req) => {
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName) {
        throw new Error("Name is not valid");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is invalid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Weakling!!");
    }
}

const validateUserEditFields = (req) => {
    const allowedFields = 
    [   "firstName",
        "lastName",
        "age",
        "gender",
        "skills",
        "photoUrl"
    ]

    const isUpdateAllowed = Object.keys(req.body).every((field) => 
        allowedFields.includes(field)
    )
    return isUpdateAllowed;
}

module.exports = {
    validateSignUpUser,
    validateUserEditFields
}