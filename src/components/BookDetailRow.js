import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const BOOK_DETAIL_QUERY = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id title isbn authorId category price quantity
    }
  }
`;

export const BookDetailRow = props => <tr>
  <td colSpan="5">
    <div><span>Title:</span> {props.book.title}</div>
    <div><span>ISBN:</span> {props.book.isbn}</div>
    <div><span>Author ID:</span> {props.book.authorId}</div>
    <div><span>Category:</span> {props.book.category}</div>
    <div><span>Price:</span> {props.book.price}</div>
    <div><span>Quantity:</span> {props.book.quantity}</div>
  </td>
</tr>;

export const BookDetailRowQuery = props =>
  <Query query={BOOK_DETAIL_QUERY} variables={{ id: props.bookId }}>
    {({ loading, error, data}) => {

      if (loading) return <tr><td colSpan="5">Loading...</td></tr>;
      if (error) return <tr><td colSpan="5">Error...</td></tr>;

      return <BookDetailRow book={data.book} />;

    }}
  </Query>

BookDetailRowQuery.propTypes = {
  bookId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
