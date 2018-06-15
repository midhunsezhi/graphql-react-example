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
    categoryId
    authorId
    price
    quantity
    category{
      id
      name
    }
    author {
      id
      firstName
    }
    __typename
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
            <BookTable 
              books={data.books} 
              authors={data.authors}
              categories={data.categories}
              APP_QUERY={APP_QUERY}
            />              
            
            <br /> <br />

            <Mutation mutation={INSERT_BOOK_MUTATION}>
              {insertBook => {

                const saveBook = book => {

                  const author = data.authors.filter(a => a.id === book.authorId)[0];
                  const category = data.categories.filter(c => c.id === book.categoryId)[0];
                  insertBook({
                    variables: { book },
                    optimisticResponse: {
                      insertBook: {
                        id: '-2',
                        ...book,
                        author,
                        category,
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