const {gql} = require("apollo-server-express")
module.exports = gql `
extend type Query {
    getCategories: [Category!]
}
type Category {
    id:ID!
    name:String!
    events:[Event!]
}
extend type Mutation {
    createCategory(name:String!):Category
}
`