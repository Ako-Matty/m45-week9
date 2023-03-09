const { DataTypes } = require("sequelize");
const connection = require ("../db/connection");

const Book = connection.define("Book", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{ indexes: [{ unique: true, fields: ["title"] }] }

);

module.exports = Book;