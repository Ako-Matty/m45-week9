const { Router } = require("express")

const bookRouter = Router();

const { hashPass, comparePass, tokenCheck } = require("../middleware");
const { addBook, getAllbooks, updatebooks, login } = require ("./controllers");

bookRouter.post("/books/addBook", addBook, hashPass)
bookRouter.post("/books/login", comparePass, login)
bookRouter.get("/books/getAllbooks", getAllbooks, tokenCheck)
bookRouter.put("/books/updatebooks", updatebooks, tokenCheck)








module.exports = bookRouter; 