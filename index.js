const { ApolloServer } = require('apollo-server')
const LaunchAPI = require('./src/datasource/launch')
const { schema } = require('./src/schema')

const server = new ApolloServer({
  schema,
  dataSources: () => ({
    launchAPI: new LaunchAPI()
  })
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
