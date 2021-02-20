const Hotel = require('./models/Hotel');
const Booking = require('./models/Booking');
const User = require('./models/User');

exports.resolvers = {
    Query: {
        // query for Hotel
        getHotel: async (parent, args) => {
            return await Hotel.find({}); //List All Hotels
        },
        getHotelByName: async (parent, args) => {
            return await Hotel.find({"hotel_name" : args.hotel_name}); //Search Hotel by name
        },
        getHotelByCity: async (parent, args) => {
            return await Hotel.find({"city" : args.city}); //Search Hotel by city
        },

        // query for Booking
        getBooking: async (parent, args) => {
            return await Booking.find({});//List all your bookings
        },

        // query for User
        getUser: async (parent, args) => {
            return await User.find({});//List all your users
        },

    },
    Mutation: {
        addHotel: async (parent, args) => {
            console.log(args)
            const emailExpression = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            const isValidEmail =  emailExpression.test(String(args.email).toLowerCase())
            
            if(!isValidEmail){
                throw new Error("email not in proper format")
            }

            let newHotel = new Hotel({
                hotel_id: args.hotel_id,
                hotel_name: args.hotel_name,
                street: args.street,
                city: args.city,
                postal_code: args.postal_code,
                price: args.price,
                email: args.email,
                user_id: args.user_id,
            });
        return await newHotel.save();
      },
      updateHotel: async (parent, args) => {
            console.log(args)
            if (!args.id){
                return;
            }
            return await Hotel.findOneAndUpdate(
            {
                _id: args.id
            },
            {
                $set: {
                    hotel_id: args.hotel_id,
                    hotel_name: args.hotel_name,
                    street: args.street,
                    city: args.city,
                    postal_code: args.postal_code,
                    price: args.price,
                    email: args.email,
                    user_id: args.user_id,
                }
            }, {new: true}, (err, Hotel) => {
                if (err) 
                {
                    console.log('Something went wrong when updating the Hotel');
                } else 
                {
                    return Hotel
                }
            }
        );
      },
      deleteHotel: async (parent, args) => {
        console.log(args)
        if (!args.id){
            return JSON.stringify({status: false, "message" : "No ID found"});
        }
        return await Hotel.findByIdAndDelete(args.id)
      },


      // for Booking
      addBooking: async (parent, args) => {
        console.log(args)

        let newBooking = new Booking({
            hotel_id: args.hotel_id,
            booking_date: args.booking_date,
            booking_start: args.booking_start,
            booking_end: args.booking_end,
            user_id: args.user_id,
        });
        return await newBooking.save();
      },

      // for user
      addUser: async (parent, args) => {
        console.log(args)

        const emailExpression = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        const isValidEmail =  emailExpression.test(String(args.email).toLowerCase())
        
        if(!isValidEmail){
            throw new Error("email not in proper format")
        }

        let newUser = new User({
            user_id: args.user_id,
            username: args.username,
            password: args.password,
            email: args.email,
        });
        return await newUser.save();
      },

    }
  }