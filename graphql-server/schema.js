
export const typeDefs = `

    type Book {
      id: ID!
      isbn: String!
      title: String!
      authorId: Int!
      category: String
      price: Float
      quantity: Int
    }

    type Query {
        message: String
        books: [Book]
        book(id: ID!): Book
    }

    type Mutation {
      insertBook(book: InsertBookInput!): Book
      deleteBook(id: ID!): ID
    }

    input InsertBookInput {
      isbn: String!
      title: String!
      authorId: Int!
      category: String
      price: Float
      quantity: Int
    }

`