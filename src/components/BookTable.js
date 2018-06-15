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

  toggleBookDetail = bookId => {
    this.setState({
      viewDetailBookId: this.state.viewDetailBookId === bookId ? -1 : bookId,
    })
  };

  deleteBook = bookId => {
    this.props.onDelete(bookId);
  }
  
  render() { 
    return <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>ISBN</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Category</th>
          <th>Author</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {this.props.books.map(b => <React.Fragment key={b.id}>
          <BookRow 
          onToggleDetail={this.toggleBookDetail} book={b} 
          authors={this.props.authors}
          categories={this.props.categories}
          APP_QUERY={this.props.APP_QUERY}
          />
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
    quantity: PropTypes.number,
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
