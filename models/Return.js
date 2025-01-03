const mongoose = require('mongoose');

const returnSchema = new mongoose.Schema({
  
    username: {
        type: String,
        required: true
    },
    bookid: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        unique: true 
    },
    duedate: { 
        type: Date,
        ref: 'Borrow' 
    },
    fine: {
        type : Number
    },
}, { timestamps: true });

module.exports = mongoose.model('Return', returnSchema);
