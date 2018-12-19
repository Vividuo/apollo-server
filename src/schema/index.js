const {
  makeExecutableSchema,
  addMockFunctionsToSchema
} = require('graphql-tools')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
const mocks = require('./mocks')

// This function call adds the mocks to your schema!
addMockFunctionsToSchema({ schema, mocks, preserveResolvers: true })

exports.schema = schema
