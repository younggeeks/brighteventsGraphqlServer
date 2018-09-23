const {gql} = require("apollo-server-express")
module.exports = gql `
extend type Query {
    getTag(id:ID!): Tag!
}
type Tag {
    id:ID!
    name:String!
    events:[Event!]
}
extend type Mutation {
    createTag(name:String!):Tag!
}
`