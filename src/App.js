import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import {BookTable} from './components/BookTable';
import {BookFormComponent} from './components/BookFormComponent';

const APP_QUERY = gql`
  query App {
    ...Books
  }

  ${BookTable.fragments.books}
`;

const INSERT_BOOK_MUTATION = gql`
mutation InsertBook($book: InsertBookInput!) {
  insertBook(book: $book) {
    id
    title
    isbn
    category
    authorId
    price
    quantity
  }
}`;

export class App extends Component {

  render() {
    return <div>
      <Query query={APP_QUERY}>
        {({ loading, error, data}) => {
          if (loading) return 'Loading...';
          if (error) return 'Error...';

          return <React.Fragment>
            <BookTable books={data.books} />
            <br /> <br />
            <Mutation mutation={INSERT_BOOK_MUTATION}>
              {insertBook => {

                const saveBook = book => {

                  insertBook({
                    variables: { book },
                    optimisticResponse: {
                      insertBook: {
                        id: '-2',
                        ...book,
                        __typename: 'Book',
                      }
                    },
                    update: (store, { data: { insertBook: book } }) => {

                      const data = store.readQuery({ query: APP_QUERY });
                      data.books.push(book);
                      store.writeQuery({ query: APP_QUERY, data });

                    },
                  });
                  
                };

                return <BookFormComponent onSubmit={saveBook} />;

              }}
            </Mutation>
          </React.Fragment>;
        }}
      </Query>
      <br/><br/><br/>
    </div>;
  }
}