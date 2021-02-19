/** Hotel Example
 * 
 * "hotel_id": 1,
   "hotel_name": "Hilton Inn",
   "street":"Young Street",
   "city":"Toronto",
   "postal_code": "M1X0Y5",
   "price":150,
   "email":"contact@hilton.com",
   "user_id":2
*/

const mongoose = require('mongoose');

// set up Hotel schema for Hotels collection of MongoDB
const HotelSchema = new mongoose.Schema({
    hotel_id:{
        type: String,
        required: [true, 'Please enter the ID of Hotel'],
        unique: [true, 'Duplicate ID Not allowed'],
    },
    hotel_name:{
        type: String,
        required: [true, 'Please enter the name of Hotel'],
    },
    
    
    street:{
        type: String,
        required: [true, 'Please enter the street of Hotel'],
    },
    city:{
        type: String,
        required: [true, 'Please enter the city of Hotel'],
        //Custom validation: only alphabets and space
        validate: function(value) {
            var cityRegex = /^[a-zA-Z ]*$/;
            return cityRegex.test(value);
        }
    },
    postal_code:{
        type: String,
        required: [true, 'Please enter the postal code'],
        trim: true,
        uppercase: true,
        minlength:6,
        maxlength:6,
        //Custom validation: only 6 uppercase letters and numbers: var postalRegex = /^[A-Z0-9]{6}*$/; why it doesn't work???
        validate: function(value) {
            var postalRegex = /^[A-Z0-9]*$/;
            return postalRegex.test(value);
        }
    },
    
    /*
    address:{
        tpye: Object,
        unique: true,
        street:{
            type: String,
            required: [true, 'Please enter the street of Hotel'],
        },
        city:{
            type: String,
            required: [true, 'Please enter the city of Hotel'],
            //Custom validation: only alphabets and space
            validate: function(value) {
                var cityRegex = /^[a-zA-Z ]*$/;
                return cityRegex.test(value);
            }
        },
        postal_code:{
            type: String,
            required: [true, 'Please enter the postal code'],
            trim: true,
            uppercase: true,
            //Custom validation: only 6 uppercase letters and numbers
            validate: function(value) {
                var postalRegex = /^[A-Z0-9]{6}*$/;
                return postalRegex.test(value);
            }
        },
    },  
    */

    price:{
        type: Number,
        required: [true, 'Please enter the price'],
        default: 0.00,
        //Custom validation: no negative price
        validate(value) {
            if (value < 0.0){
               throw new Error("Negative Price is not real.");
            }
        }        
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
    user_id:{// unique or not??
        type: String,
        required: [true, 'Please enter the user id'],         
    }
});

const Hotel = mongoose.model("Hotel", HotelSchema, "Hotels");
module.exports = Hotel;
