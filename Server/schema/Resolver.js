const axios = require('axios');
const Todo = require('./Todo');

const resolvers = {
  Query: {
    getTodos: async () => {
  console.log("🧠 Server: Fetching from MongoDB");
  return await Todo.find();
}

},
  Mutation: {
    importTodos: async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      const todos = response.data;

      await Todo.deleteMany({});
      await Todo.insertMany(todos);

      return "Todos imported successfully!";
    }
  }
};

module.exports = resolvers;
