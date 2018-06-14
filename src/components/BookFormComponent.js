import React, {Component} from 'react';

export class BookFormComponent extends Component{
  state = {
    title: "",
    isbn: "",
    category: "",
    price: "",
    quantity: ""
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });

    this.setState({
      title: "",
      isbn: "",
      category: "",
      price: "",
      quantity: ""
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
        <label>Author ID: 
          <input 
          type='text'
          name='authorId'
          value={this.state.authorId}
          onChange={this.handleChange}
          />
        </label>
        <br/>
        <label>Category: 
          <input 
          type='text'
          name='category'
          value={this.state.category}
          onChange={this.handleChange}
          />
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