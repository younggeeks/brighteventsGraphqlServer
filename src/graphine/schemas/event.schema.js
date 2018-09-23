const { gql } = require('apollo-server-express');

module.exports = gql`
    extend type Query {
        getAllEvents(cursor:String,limit:Int): EventConnection!
        getEvent(id:ID!):Event!
        getMyEvents: [Event!]
        getSingleEvent(id:ID!):Event!
    }

    type Deleted{
        deleted: Boolean!
    }

    type Event {
        id:ID!
        name:String!
        address:String!
        start:String!
        end:String!,
        user:User!
        tags:[Tag!]
        users:[User!]
    }

    type EventConnection {
        edges: [Event!]!
        pageInfo:PageInfo!
    }

    type PageInfo {
        hasNextPage: Boolean!
        endCursor:String!
    }

    extend type Subscription{
        eventCreated: EventCreated!
    }
    
    type EventCreated{
        event:Event!
    }
    extend type Mutation {
        createEvent(name:String!,address:String!,category:String!,tags:[String!],start:String!,end:String!):Event!
        deleteEvent(id:String!,forever:Boolean):Deleted!
        updateEvent(id:ID!,name:String,address:String,category:String,tags:[String!],start:String,end:String):Event!
    }
`;
