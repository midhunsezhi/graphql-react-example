
export const typeDefs = `

    type Book {
      id: ID!
      isbn: String!
      title: String!
      authorID: Int!
      category: String
      price: Float
      quanitity: Int
    }

    type Query {
        message: String
        books: [Book]
    }
`