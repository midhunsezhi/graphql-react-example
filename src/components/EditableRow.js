import React, { Component } from 'react';

export class EditableRow extends Component {

  state = {
    ...this.props.book
  }

  handleChange = (e) => {
    this.setState({
      [ e.target.name ]: e.target.type === 'number' 
                         ? Number(e.target.value)
                         : e.target.value
  })
}

  handleSaveClick = () => {
    const { author, category, __typename, ...otherProps } = this.state;
    this.props.onSave(otherProps);
    this.props.onCancelClick();
  }

  render() {
    return <tr>
    <td>
      <input 
        type='text' 
        value={this.state.title} 
        name='title'
        onChange={this.handleChange}/>
    </td>
    <td>
      <input 
        type='text'
        name='isbn'
        value={this.state.isbn}
        onChange={this.handleChange}
      />
    </td>
    <td>
      <input
        type='number'
        name='price'
        value={this.state.price}
        onChange={this.handleChange}
      />
    </td>
    <td>
      <input 
          type='number'
          name='quantity'
          value={this.state.quantity}
          onChange={this.handleChange}/>
    </td>
    <td>
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
    </td>
    <td>
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
    </td>
    <td>
      <button type="button" onClick={this.handleSaveClick}>
      Save</button>
      <button type="button" onClick={this.props.onCancelClick}>
      Cancel</button>
      
    </td>
  </tr>
  }
}