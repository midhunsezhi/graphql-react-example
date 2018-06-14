import fetch from 'node-fetch';

export const resolvers = {
    Query: {
        message: () => 'Hello World!',
        books: async (_1, _2, { restURL }) => {
          const res = await fetch(`${restURL}/books`)
          return await res.json();
        },

        book: async (_, { id }, { restURL }) => {
          const res = await fetch(`${restURL}/books/${encodeURIComponent(id)}`);
          return await res.json();
        }
    },

    Mutation: {
      insertBook: async (_, { book }, { restURL }) => {
        const res = await fetch(`${restURL}/books`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(book)
        });

        return await res.json();
      },
      deleteBook: async (_, { id }, { restURL }) => {
        const res = await fetch(`${restURL}/books/${encodeURIComponent(id)}`, {
          method: 'DELETE'
        })

        return id;
      }
    }
};