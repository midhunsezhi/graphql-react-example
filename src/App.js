import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import {BookTable} from './components/BookTable';

const APP_QUERY = gql`
  query App {
    books {
      id
      title
      isbn
      price
      qty: quantity
    }
  }
`;

export class App extends Component {

  render() {
    return <div>
      <Query query={APP_QUERY}>
        {({ loading, error, data}) => {
          if (loading) return 'Loading...';
          if (error) return 'Error...';

          return <BookTable books={data.books} />
        }}
      </Query>
    </div>;
  }
}