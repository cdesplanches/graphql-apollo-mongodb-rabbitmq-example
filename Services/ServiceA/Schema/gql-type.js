const { gql } = require('apollo-server')

const gqlType = gql `
    type GqlType @key(fields: "_id") {
        _id:ID!
        name:String!
        number:Int!
    }
    type Query {
        getOrder(id:ID!):GqlType
        getAllOrders:[GqlType!]
    }
    type Mutation{
        buy(name:String!, number:Int!):GqlType!
        clearOrders:Boolean
    }
`;
module.exports = gqlType
