import * as React from 'react';

import gql from 'graphql-tag';

import {StaticRow} from './StaticRow';
import {EditableRow} from './EditableRow';

export class BookRow extends React.Component {

  state = {
    editable: false
  }

  handleEditClick = () => {
    this.setState({
      editable: true
    })
  }

  render() {

    return (
      !this.state.editable
      ? <StaticRow  
        onEditClick={this.handleEditClick}
        book={this.props.book}
        />
      : <EditableRow />
    )
  }
};

BookRow.fragments = {
  bookRow: gql`fragment BookRow on Book {
    id title isbn price qty: quantity category __typename
  }`,

};
