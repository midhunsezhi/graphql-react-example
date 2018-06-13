import * as React from 'react';

export const BookTable = props => (
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>ISBN</th>
        <th>Price</th>
        <th>Quantity</th>
      </tr>
    </thead>
    <tbody>
      {props.books.map(b => (
        <tr key={b.id}>
          <td>{b.title}</td>
          <td>{b.isbn}</td>
          <td>{b.price}</td>
          <td>{b.qty}</td>
        </tr>
      ))}
    </tbody>
  </table>
)
