const  { Router } = require("express")
const exampleRouter = Router();

const finalFunc = async (req, res) => {
    console.log("req.body in finalFunc", req.body);
    res.status(201).json({ message: "success", body: req.body });
};

const middleOne = async (req, res, next) => {
    console.log("start middleOne", req.body);
    req.body["middleOne"] = "Im from the middleOne func";
    next();
};

// "next()" - express is expecting a third (optional) argument called next,
// this will pass the request onto the next function once stuff has happened

const middleTwo = async ( req, res, next) => {
    console.log("start middleTwo", req.body);
    req.body["middleTwo"] = "Im from the middleTwo";
    next();
};

// request come to url "/example"
// request passes to middleOne
// things happen in middleOne
// the "next()" function is called and passes the request to middleTwo
// things happen in middleTwo
// "next()" passes request to finalFunc

exampleRouter.post("/example", middleOne, middleTwo, finalFunc);

module.exports = exampleRouter;