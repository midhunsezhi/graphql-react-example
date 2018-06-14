import * as React from 'react';

import gql from 'graphql-tag';

export const BookRow = props => {

  return <tr>
  <td>{props.book.title}</td>
  <td>{props.book.isbn}</td>
  <td>{props.book.price}</td>
  <td>{props.book.qty}</td>
  <td><button type="button" onClick={() => props.onToggleDetail(props.book.id)}>
    Toggle View Detail</button></td>
</tr>

};

BookRow.fragments = {
  bookRow: gql`fragment BookRow on Book {
    id title isbn price qty: quantity __typename
  }`,
};