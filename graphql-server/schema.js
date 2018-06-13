
export const typeDefs = `

    type Book {
      id: ID!
      isbn: String!
      title: String!
      authorID: Int!
      category: String
      price: Float
      quantity: Int
    }

    type Query {
        message: String
        books: [Book]
    }
`