import fetch from 'node-fetch';

export const resolvers = {
    Query: {
        message: () => 'Hello World!',
        books: async (_1, _2, { restURL }) => {
          const res = await fetch(`${restURL}/books`)
          return await res.json();
        }
    }
};