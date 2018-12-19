const Mock = require('mockjs')
const { MockList } = require('graphql-tools')
const mocks = {
  // Here you could customize the mocks.
  // If you leave it empty, the default is used.
  // You can read more about mocking here: http://bit.ly/2pOYqXF
  Parent: () => ({
    name: () => Mock.Random.cname()
  }),
  Leaf: () => ({
    name: () => Mock.Random.cword(3)
  }),
  Tree: () => ({
    name: () => Mock.Random.cword(3),
    leafs: () => new MockList(8)
  })
}
module.exports = mocks
