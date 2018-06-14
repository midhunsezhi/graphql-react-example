import * as React from 'react';
import * as PropTypes from 'prop-types';
import gql from 'graphql-tag';

import { BookRow } from './BookRow';
import { BookDetailRowQuery } from './BookDetailRow'; 

export class BookTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      viewDetailBookId: -1,
    };
  }

  toogleBookDetail = bookId => {
    this.setState({
      viewDetailBookId: this.state.viewDetailBookId === bookId ? -1 : bookId,
    })
  };
  
  render() { 
    return <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>ISBN</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {this.props.books.map(b => <React.Fragment key={b.id}>
          <BookRow onToggleDetail={this.toogleBookDetail} book={b} />
          {b.id === this.state.viewDetailBookId && <BookDetailRowQuery bookId={b.id} />}
        </React.Fragment>)}
      </tbody>
    </table>;
  }
}

BookTable.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    qty: PropTypes.number,
  })),
};

BookTable.defaultProps = {
  books: [],
};

BookTable.fragments = {
  books: gql`
    fragment Books on Query {
      books {
        id
        ...BookRow
        __typename
      }
      __typename
    }

    ${BookRow.fragments.bookRow}
  `,
};
