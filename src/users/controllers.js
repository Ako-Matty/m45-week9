const User = require("./model");
const jwt = require("jsonwebtoken")

const registerUser = async (req, res) => {
    try {

        const user = await User.create(req.body);

        // const user = await User.create({
        //     username: req.body.username,
        //     email: req.body.email,
        //     password: req.body.password,
        // });

        res.status(201).json({
            message: "Success", user: { username: req.body.username, email: req.body.email },
        });
    } catch (error) {
        res.status(501).json({ errormessage: error.message, error: error });
    }
};

const login = async (req, res) => {
    try {
        console.log("insidecontroller")
        const token = await jwt.sign({ id: req.user.id }, process.env.SECRET);

        res.status(201).json({
            message: "success",
            user: {
                username: req.user.username,
                email: req.user.email,
                token: token
            }
        });
    } catch (error) {
        res.status(501).json({ errormessage: error.message, error: error });
    }
};

const getAllUsers = async (req, res) => {
    try {

        if(!req.authCheck) {
            const error = new Error("Not authorised");
            res.status(401).json({ errorMessage: error.message, error: error });
            
        }

        const users = await User.findAll();

        for (let user of users) {
            user.password = "";
        }
        res.status(200).json({ message: "success", users: users });
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error });
    }
};

module.exports = {
    registerUser,
    login,
    getAllUsers
};