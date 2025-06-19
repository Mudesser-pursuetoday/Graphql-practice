const { gql } = require('graphql-tag');

const typeDefs = gql`
  type Todo {
    id: ID!
    userId: Int
    title: String
    completed: Boolean
  }

  type Query {
    getTodos: [Todo]
  }

  type Mutation {
    importTodos: String
  }
`;

module.exports = typeDefs;
