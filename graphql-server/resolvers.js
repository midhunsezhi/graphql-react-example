import fetch from 'node-fetch';

export const resolvers = {

    Book: {
      author: async ({authorId}, _, { restURL }) => {
        const res = await fetch(`${restURL}/authors/${encodeURIComponent(authorId)}`);
        return await res.json();
      },
      category: async ({categoryId}, _, { restURL }) => {
        const res = await fetch(`${restURL}/categories/${encodeURIComponent(categoryId)}`);
        return await res.json();
      }
    },
    Query: {
        message: () => 'Hello World!',
        books: async (_1, _2, { restURL }) => {
          const res = await fetch(`${restURL}/books`)
          return await res.json();
        },

        book: async (_, { id }, { restURL }) => {
          const res = await fetch(`${restURL}/books/${encodeURIComponent(id)}`);
          return await res.json();
        },

        authors: async (_1, _2, { restURL }) => {
          const res = await fetch(`${restURL}/authors`)
          return await res.json();
        },

        categories: async (_1, _2, { restURL }) => {
          const res = await fetch(`${restURL}/categories`)
          return await res.json();
        }
    },

    Mutation: {
      insertBook: async (_, { book }, { restURL }) => {
        const method = book.id ? 'PUT' : 'POST';
        const urlId = book.id ? `/${encodeURIComponent(book.id)}` : '';
        const res = await fetch(`${restURL}/books${urlId}`, {
          method: method,
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