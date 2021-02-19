/** Booking Example
 * 
 * "hotel_id": 1,
   "booking_date": "01-24-2021",
   "booking_start":"01-25-2021",
   "booking_end":"01-30-2021",
   "user_id":4
*/

const mongoose = require('mongoose');

// set up Booking schema for Bookings collection of MongoDB
const BookingSchema = new mongoose.Schema({
    hotel_id:{
        type: String,
        required: [true, 'Please enter the ID of Hotel'],
        //unique: [true, 'Duplicate ID Not allowed'],
    }, 

    //mm/dd/yyyy format, Regular Expression: /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/
    //dd-mm-yyyy format, Regular Expression: /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/
    booking_date:{
        type: String,
        required: true, 
        //Custom validation
        validate: function(value) {
            var startRegex = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;
            return startRegex.test(value);
        }              
    },

    booking_start:{
        type: String,
        required: true,
        //Custom validation
        validate: function(value) {
            var startRegex = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;
            return startRegex.test(value);
        }        
    },

    booking_end:{
        type: String,
        required: true,
        //Custom validation
        validate: function(value) {
            var endRegex = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;
            return endRegex.test(value);
        }        
    },

    user_id:{// unique or not??
        type: String,
        required: [true, 'Please enter the user id'],         
    }  
});

const Booking = mongoose.model("Booking", BookingSchema, "Bookings");
module.exports = Booking;