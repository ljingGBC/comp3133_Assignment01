const { gql } = require('apollo-server-express');

// This schema is for Graphiql
// have error when tpye is Number or date. So change to String in MongoDB schema and here
exports.typeDefs = gql `
   type Hotel {
     hotel_id: String!
     hotel_name: String!
     street: String!
     city: String!
     postal_code: String!
     price: Float!
     email: String!
     user_id: String!
   }

   type Booking {
     hotel_id: String!
     booking_date: String!
     booking_start: String!
     booking_end: String!
     user_id: String!
   }
  
  type User {
     user_id: String!
     username: String!
     password: String!
     email: String!
   }

   type Query {
     getHotel: [Hotel]
     getHotelByName(hotel_name: String!): [Hotel]
     getHotelByCity(city: String!): [Hotel]

     getBooking: [Booking]
     getUser: [User]
   }

   type Mutation {
     addHotel(
        hotel_id: String!
        hotel_name: String!
        street: String!
        city: String!
        postal_code: String!
        price: Float!
        email: String!
        user_id: String!): Hotel

     updateHotel(
        id: ID!
        hotel_id: String!
        hotel_name: String!
        street: String!
        city: String!
        postal_code: String!
        price: Float!
        email: String!
        user_id: String!): Hotel

     deleteHotel(hotel_id: String!): Hotel

     addBooking(
        hotel_id: String!
        booking_date: String!
        booking_start: String!
        booking_end: String!
        user_id: String!): Booking     

     addUser(
        user_id: String!
        username: String!
        password: String!
        email: String!): User  

   }
`