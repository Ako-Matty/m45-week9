const {Router} = require("express");
const userRouter = Router();

const { hashPass, comparePass } = require("../middleware");
const { registerUser, login } = require("./controllers");

userRouter.post("/users/register", hashPass, registerUser);
userRouter.post("/users/login", comparePass, login);

module.exports = userRouter;