import React, { Component } from 'react';

export class StaticRow extends React.Component {
  render() {
    return <tr>
      <td>{this.props.book.title}</td>
      <td>{this.props.book.isbn}</td>
      <td>{this.props.book.price}</td>
      <td>{this.props.book.qty}</td>
      <td>{this.props.book.category}</td>
      <td>
        <button type="button" onClick={() => this.props.onToggleDetail(this.props.book.id)}>
        Toggle View Detail</button>
        <button type="button" onClick={() => this.props.onDelete(this.props.book.id)}>
        Delete</button>
        <button type="button" onClick={this.props.onEditClick}>
        Edit</button>
      </td>
    </tr>
  }
}