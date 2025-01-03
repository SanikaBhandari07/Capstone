const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
    },
    genre: {
        type: String,
    },
    type: {
        type: String,
    },
    available: {
         type: Boolean, 
         default: true 
    },
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);

