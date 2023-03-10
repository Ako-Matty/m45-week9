const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


const saltRounds = process.env.SALT_ROUNDS;
const User = require("../users/model")
// const Book = require("../books/model")

const hashPass = async (req, res, next) => {
    try {
        // const userFind = await User.findOne({where: {username: req.body.username}});

        const hashedPass = await bcrypt.hash(req.body.password, parseInt(saltRounds));
        req.body.password = hashedPass;

        // console.log(req.body);
        // console.log(hashedPass);

        // req.body.password = await bcrypt.hash(req.body.password, parseInt(saltRounds));

        next();
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error });
    }
};



const comparePass = async (req, res, next) => {
    try {
        console.log(req.body.password)
        // get user
        // const user = await User.findOne({ where: { username: req.body.username } });
        req.user = await User.findOne({ where: { username: req.body.username } });

        console.log(req.user.password);

        const match = await bcrypt.compare(req.body.password, req.user.password)

        // if no match - respond with 500 error message "passwords do not match"


        if (!match) {
            const error = new Error("Passwords do not match")
            req.status(500).json({ errorMessage: error.message, error: error });
        }

        // if match - next function

        next();
    } catch (error) {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!")
        console.log("thisError")
        res.status(501).json({ errorMessage: error.message, error: error });
    }
};

const tokenCheck = async (req, res, next) => {
    try {
        console.log("!!!!!!!!")
        console.log(req.header)

        const token = req.header("Authorization").replace("Bearer ", "");

        const decodedToken = await jwt.verify(token, process.env.SECRET);
        console.log(decodedToken)

        const user = await User.findOne({ where: { id: decodedToken.id } });
        console.log(user)

        if (!user) {
            const error = new Error("User is not authorised")
            res.status(401).json({ errorMessage: error.message, error: error })
        }

        req.authCheck = user;

        next();
    } catch (error) {
        res.status(501).json({ errorMessage: error.messsage, error: error })
    }
}

module.exports = {
    hashPass,
    comparePass,
    tokenCheck
}