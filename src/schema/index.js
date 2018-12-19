const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  MockList
} = require('graphql-tools')
const Mock = require('mockjs')
const typeDefs = [
  `
  type Guide {
    id: ID!
    guideTitle: String
    remark: Remark
    subjects: [Subject]
  }
  type Subject {
    id: ID!
    categories: [Category]
    remark: Remark
  }
  type Category {
    id: ID!
    remark: Remark
  }
  type Remark {
    id: ID!
  }
  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]!
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }
  
  type Launch {
    id: ID!                         #指南通知名称
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }

 
  type Query {
    launches: [Launch]!
    launch(id: ID!): Launch
    me: User
    hello: String
  }

`,
  `
  type Parent {
    id: ID,
    count: Int,
    score: Float,
    isDefault: Boolean
    name: String
    friends: [Int]
    launches: [Launch]!
  }
  type Child {
    childName1: String
  }
  extend type Query {
    """
    This is the parent query description3
    """
    parent: Parent
  }
`
]
const resolvers = {
  Query: {
    parent: () => {
      return {
        // name: 'a resolver name'
      }
    },
    hello: () => 'world1111',
    launches: async (_, __, { dataSources }) =>
      dataSources.launchAPI.getAllLaunches(),
    launch: (_, { id }, { dataSources }) =>
      dataSources.launchAPI.getLaunchById({ launchId: id }),
    me: async (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
  }
}
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
  // logger: { log: e => console.log(e) }
})

const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => 'Mock Hello',
  Parent: () => ({
    name: () => Mock.Random.cname(),
    friends: () => new MockList(3, () => 1111)
  })
  // Here you could customize the mocks.
  // If you leave it empty, the default is used.
  // You can read more about mocking here: http://bit.ly/2pOYqXF
}

// This function call adds the mocks to your schema!
addMockFunctionsToSchema({ schema, mocks, preserveResolvers: true })

exports.schema = schema
