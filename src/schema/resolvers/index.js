const resolvers = {
  Query: {
    hello: () => 'Hello Apollo'

    // launches: async (_, __, { dataSources }) =>
    //   dataSources.launchAPI.getAllLaunches(),
    // launch: (_, { id }, { dataSources }) =>
    //   dataSources.launchAPI.getLaunchById({ launchId: id }),
  }
}
module.exports = resolvers
