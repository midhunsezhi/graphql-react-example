import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import {BookTable} from './components/BookTable';
import {BookFormComponent} from './components/BookFormComponent';

const APP_QUERY = gql`
  query App {
    ...Books
    ...Authors
    ...Categories
  }

  ${BookTable.fragments.books}
  ${BookFormComponent.fragments.authors}
  ${BookFormComponent.fragments.categories}
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

const DELETE_BOOK_MUTATION = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) 
  }
`
export class App extends Component {

  render() {
    return <div>
      <Query query={APP_QUERY}>
        {({ loading, error, data}) => {
          if (loading) return 'Loading...';
          if (error) return 'Error...';

          return <React.Fragment>
            <Mutation mutation={DELETE_BOOK_MUTATION}>
            {deleteBook => {
              const removeBook = id => {
                deleteBook({
                  variables: {id},
                  optimisticResponse: {
                    deleteBook: id,
                  },
                  update: (store, { data: { deleteBook: id}}) => {
                    const data = store.readQuery({ query: APP_QUERY });
                    data.books = data.books.filter((book) => {
                      return book.id !== id
                    });
                    store.writeQuery({ query: APP_QUERY, data });
                  }
                })
              }
              return <BookTable books={data.books} onDelete={removeBook}/>
            }}
              
            </Mutation>
            
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

                return <BookFormComponent 
                authors= {data.authors}
                categories = {data.categories}
                onSubmit={saveBook} />;

              }}
            </Mutation>
          </React.Fragment>;
        }}
      </Query>
      <br/><br/><br/>
    </div>;
  }
}