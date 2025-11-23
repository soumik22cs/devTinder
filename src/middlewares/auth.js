const authAdmin =  (req, res, next) => {
        console.log("Admin is now checked for authorization");
        const token = "xyz";
        const isUserAuthorized = token === 'xyz';

        if(isUserAuthorized) {
            console.log("Admin is here!!");
            next();
        }
        else {
            console.log("IMPOSTER!!!");
            res.status(401).send("Imposter spotted");
        }
    }

    const authUser =  (req, res, next) => {
        console.log("User is now checked for authorization");
        const token = "xyz1";
        const isUserAuthorized = token === 'xyz';

        if(isUserAuthorized) {
            console.log("User is here!!");
            next();
        }
        else {
            console.log("IMPOSTER!!!");
            res.status(401).send("Imposter spotted");
        }
    }


module.exports ={ 
    authAdmin,
    authUser
}