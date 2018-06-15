
export const typeDefs = `

    type Book {
      id: ID!
      isbn: String!
      title: String!
      authorId: Int!
      categoryId: Int!
      price: Float
      quantity: Int
      author: Author
      category: Category
    }

    type Query {
        message: String
        books: [Book]
        book(id: ID!): Book
        authors: [Author]
        categories: [Category]
    }

    type   Author {
      id: ID!
      firstName: String
      lastName: String
    }

    type Category {
      id: ID!
      name: String
    }

    type Mutation {
      insertBook(book: InsertBookInput!): Book
      deleteBook(id: ID!): ID
    }

    input InsertBookInput {
      id: ID
      isbn: String!
      title: String!
      authorId: Int!
      categoryId: Int!
      price: Float
      quantity: Int
    }
`