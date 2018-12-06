const fs = require ('fs');

const { GraphQLServer } = require('graphql-yoga');

const dinnerOptions = ['🍕', '🌭', '🍔', '🥗', '🍣'];

const typeDefs = `
  type Test {
    name: String
    id: Int! 
    age: Int
  }
  
  type Query {
    whatsForDinner: String!
  }
`;

const resolvers = {
    Query: {
        whatsForLunch: () => {
            const idx = Math.floor(Math.random() * dinnerOptions.length);
            const foodChoice = dinnerOptions[idx];
            return `Tonight we eat ${foodChoice}`;
        }
    }
};

const opts = {
    port: 7777,
    endpoint: '/graphql'
};

fs.writeFileSync('schema.public.graphql', typeDefs);

const server = new GraphQLServer({ typeDefs, resolvers });

server.start((opts) => {
    console.log(
        `😄 Server running at http://localhost:${opts.port}${opts.endpoint}`
    );
});
