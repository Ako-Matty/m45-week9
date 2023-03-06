require("dotenv").config();
const express = require("express");

const exampleRouter = require("../middleWareExample");

const port = process.env.PORT || 5001;

const app = express();

app.use(express.json());

app.use(exampleRouter);

app.get("/health", (req, res) =>
    res.status(200).json({ message: "API is working" })
);

app.listen(port, () => {
    console.log (`App is listening on port ${port}`);
})