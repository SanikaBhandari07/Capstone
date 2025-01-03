const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  
name : {
    type : String
},

username: {
    type: String,
    required: true
},
password : {
    type : String
},
email: { 
    type: String, 
    unique: true 
},
  mobile: { 
    type: Number, 
    unique: true 
},
  admin: {
     type: Boolean, 
     default: false 
},
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
