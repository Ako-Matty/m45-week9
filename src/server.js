require("dotenv").config();
const express = require("express");
// allows for host to access host port OR dev port 5001
const port = process.env.PORT || 5001;

const User = require("./users/model");
const userRouter = require("./users/routes");

const Book = require("./books/model");
const bookRouter = require("./books/routes");

// creates app object from which we can use methods e.g. .use
const app = express();

app.use(express.json());



const syncTables = () => {
    User.sync({ alter: true, force: false });
    Book.sync({ alter: true, force: false });
};

app.use(userRouter);
app.use(bookRouter);

// standard route to test if API is working
app.get("/health", (req, res) =>
    res.status(200).json({ message: "API is working" })
);

app.listen(port, () => {
    syncTables();
    console.log (`App is listening on port ${port}`);
})



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImlhdCI6MTY3ODI3MTAwMX0._SVHHpiNMTtHbuYtPVP4kQV3ZmqjojcUUMD89lE_CH8