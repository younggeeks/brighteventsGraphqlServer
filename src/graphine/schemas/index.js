const {gql} = require("apollo-server-express")

const userSchema = require("./user.schema")
const tagSchema = require("./tag.schema")
const categorySchema = require("./category.schema")
const eventSchema = require("./event.schema")

const linkSchema = gql `
    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }

    type Subscription {
        _: Boolean
    }
`

module.exports = [linkSchema,userSchema,tagSchema,categorySchema,eventSchema]