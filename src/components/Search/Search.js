import React, { Component } from 'react';
import {Input} from 'semantic-ui-react';

class Search extends Component {

  constructor(props){
    super(props);
    this.state = {
      keyword: ''
    }
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }
  
  render() {
    const {keyword} = this.state;
    return (
      <Input 
        value = {keyword}
        name = 'keyword'
        icon='search' 
        placeholder='Search' 
        size = 'large'
        fluid
        style = {{borderRadius: '50px'}}
        onChange = {this.handleChange}
      />
    )
  }
}

export default Search;