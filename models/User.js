/** User Example
 * 
 * "user_id": 1,
   "username": "pritamworld",
   "password":"test123",
   "email":"p@p.com",
*/

const mongoose = require('mongoose');

// set up User schema for Users collection of MongoDB
const UserSchema = new mongoose.Schema({
    user_id:{
        type: String,
        required: [true, 'Please enter the user id'],  
        unique: [true, 'Duplicate ID Not allowed'],
    },
    username:{
        type: String,
        required: [true, 'Please enter the username'],
        unique: [true, 'Duplicate username Not allowed'],
    },
    password:{
        type: String,
        required: [true, 'Please enter the password'],
        unique: [true, 'Duplicate password Not allowed'],
        minlength: 6,
    },
    email: {
        type: String,
        required: [true, 'Please enter the email'],
        unique: [true, "Duplicate Email Not allowed"],
        trim: true,
        uppercase: true,
        //Custom validation
        validate: function(value) {
          var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailRegex.test(value);
        }
    },    
});

const User = mongoose.model("User", UserSchema, "Users");
module.exports = User;