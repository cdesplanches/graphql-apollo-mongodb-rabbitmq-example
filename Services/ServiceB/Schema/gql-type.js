const { gql } = require('apollo-server')

const gqlType = gql `
    type GqlType @key(fields: "_id") {
        _id:ID!
        name:String!
        status:String
    }
    type Query {
        getStatus(id:ID!):GqlType
        getAllStatus:[GqlType]
    }
    type Mutation{
        clearAllStatus:Boolean
    }
`;
module.exports = gqlType
