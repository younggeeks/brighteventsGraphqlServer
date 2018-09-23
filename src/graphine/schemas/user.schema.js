const { gql } = require('apollo-server-express');

module.exports = gql`
    extend type Query {
        getProfile:User!
    }
     type User {
            id:ID!
            fullName:String!
            email:String!
            password:String!
            events:[Event!]
    }
    type Token {
        token:String!
    }
   extend type Mutation {
        signup(fullName:String!,email:String!,password:String!):Token!
        login(email:String!,password:String!): Token!
        getResetToken(email:String!):Token!

        rsvp(eventId:ID!): Event!
}
`;
