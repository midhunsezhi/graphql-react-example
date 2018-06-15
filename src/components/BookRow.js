import * as React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import {StaticRow} from './StaticRow';
import {EditableRow} from './EditableRow';

const DELETE_BOOK_MUTATION = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) 
  }
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
  }
}`;

export class BookRow extends React.Component {

  state = {
    editable: false
  }

  handleEditClick = () => {
    this.setState({
      editable: !this.state.editable
    })
  }

  render() {
    const {APP_QUERY} = this.props;
    return (
      !this.state.editable
      ? <Mutation mutation={DELETE_BOOK_MUTATION}>
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
        return <StaticRow
        onToggleDetail={this.props.onToggleDetail}
        onEditClick={this.handleEditClick}
        book={this.props.book}
        onDelete={removeBook}
        />
      }} 
      </Mutation>
      : <Mutation mutation={INSERT_BOOK_MUTATION}>
      {insertBook => {

        const saveBook = book => {

          insertBook({
            variables: { book },
            optimisticResponse: {
              insertBook: {
                ...book,
                __typename: 'Book',
              }
            },
            update: (store, { data: { insertBook: book } }) => {

              const data = store.readQuery({ query: APP_QUERY });
              data.books = data.books.map(b => {
                return b.id === book.id ? book : b;
              });
              store.writeQuery({ query: APP_QUERY, data });

            },
          });
          
        };

        return <EditableRow 
        book={this.props.book}
        authors={this.props.authors}
        categories={this.props.categories}
        onCancelClick={this.handleEditClick}
        onSave={saveBook}
        />
      }}
    </Mutation>
    )
  }
};

BookRow.fragments = {
  bookRow: gql`fragment BookRow on Book {
    id 
    title 
    isbn 
    price 
    quantity 
    category {
      id
      name
    }
    author {
      id
      firstName
    }
    categoryId 
    authorId 
    __typename
  }`,

};
