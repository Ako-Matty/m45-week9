const bcrypt = require("bcrypt")


const saltRounds = process.env.SALT_ROUNDS;
const User = require("../users/model")

const hashPass = async (req, res, next) => {
    try {
        // const userFind = await User.findOne({where: {username: req.body.username}});

        const hashedPass = await bcrypt.hash(req.body.password, parseInt(saltRounds));
        req.body.password = hashedPass;

        console.log(req.body);
        console.log(hashedPass);

        // req.body.password = await bcrypt.hash(req.body.password, parseInt(saltRounds));

        next();
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error });
    }
};



const comparePass = async (req, res, next) => {
    try {

        // get user
        // const user = await User.findOne({ where: { username: req.body.username } });
        req.user = await User.findOne({ where: { username: req.body.username } });

        console.log(req.user);

        const match = await bcrypt.compare(req.body.password, req.user.password)

        // if no match - respond with 500 error message "passwords do not match"


        if (!match) {
            const error = new Error("Passwords do not match")
            req.status(500).json({ errorMessage: error.message, error: error });
        }

        // if match - next function

        next();
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error });
    }
};



module.exports = {
    hashPass,
    comparePass,
}