const Book = require("./model");
const jwt = require("jsonwebtoken");


const addBook = async (req, res) => {
    try {

        const book = await Book.create(req.body);
        // console.log(book);
        res.status(201).json({ message: "success", newBook: book });
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error });
    }
}

const login = async (req, res) => {
    try {
        const accessbook = await jwt.sign({ id: req.user.id }, process.env.SECRET);

        res.status(201).json({ 
        message: "success", 
        book: {
            title: req.book.title,
            author: req.book.author,
            genre: req.book.genre,
            accessbook: accessbook,  
        }
         });

    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error });
    }
};


const getAllbooks = async (req, res) => {
    try {
        const allBooks = await Book.findAll(req.body);
        res.status(201).json({ message: "Success", getBook: allBooks });
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error });
    }
}


const updatebooks = async (req, res) => {
    try {

       if(!req.authCheck) {
        const error = new Error("User is not authorised");
        res.status(401).json({ errorMessage: error.message, error: error})
       }


        const updatebook = await Book.update ({ [req.body.updateKey]: req.body.updateValue }, 
            { where: 
                { title: req.body.title}});
        res.status(201).json({ message: "Success", updatebook })
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error });
    }
}


const deletebook = async (req, res) => {
    try {
        const result = await Book.destroy({ where: { title: req.body.title }});

        res.status(201).json({ message: "success", result: result })
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error }); 
    }
};




module.exports = {
    addBook,
    getAllbooks,
    updatebooks,
    deletebook,
    login
};