import React, {Component} from 'react';
import gql from 'graphql-tag';

export class BookFormComponent extends Component{
  state = {
    title: "",
    isbn: "",
    categoryId: "",
    price: "",
    quantity: "",
    authorId: ""
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });

    this.setState({
      title: "",
      isbn: "",
      categoryId: "",
      price: "",
      quantity: "",
      authorId: ""
    });
  }
  handleChange = (e) => {
    this.setState({
      [ e.target.name ]: e.target.type === 'number' 
                         ? Number(e.target.value)
                         : e.target.value
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Title: 
          <input 
          type='text' 
          value={this.state.title} 
          name='title'
          onChange={this.handleChange}/>
        </label>
        <br/>
        <label>ISBN: 
          <input 
          type='text'
          name='isbn'
          value={this.state.isbn}
          onChange={this.handleChange}
          />
        </label>
        <br/>
        <label>Author: 
          <select 
          name="authorId" 
          value={this.state.authorId}
          onChange={this.handleChange}>
            <option value="">{"-- Select One --"}</option>
            
            { this.props.authors && this.props.authors.map(author => <option 
                key={author.id} 
                value={author.id}
                >
                {author.firstName}
              </option>
            )}
          </select>
        </label>
        <br/>
        <label>Category: 
          <select 
          name="categoryId" 
          value={this.state.categoryId}
          onChange={this.handleChange}>
            <option value="">{"-- Select One --"}</option>
            { this.props.categories && this.props.categories.map(category => <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            )}
          </select>
        </label>
        <br/>
        <label>Price: 
          <input
          type='number'
          name='price'
          value={this.state.price}
          onChange={this.handleChange}
          />
        </label>
        <br/>
        <label> Qty:
          <input 
          type='number'
          name='quantity'
          value={this.state.quantity}
          onChange={this.handleChange}/>
        </label>
        <br/>
        <input type='submit' />
      </form>
    )
  }
}

BookFormComponent.fragments = {
  authors: gql`
    fragment Authors on Query {
      authors {
        id
        firstName
      }
    }`,
  categories: gql`
    fragment Categories on Query {
      categories {
        id
        name
      }
      __typename
    }
  `,
};