import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Grid, Button, Container } from 'semantic-ui-react'

import Categories from './components/Categories';
import DueToday from './components/DueToday';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';

import {addTodoModalToggle, addCategoryModalToggle, editTodoModalToggle} from './actions';

class App extends Component {

  componentDidMount(){
    this.props.addTodoModalToggle(false);
    this.props.addCategoryModalToggle(false);
    this.props.editTodoModalToggle(false);
  }

  render() {
    return (
      <>
        <AddTodo />
        <Grid padded>
          <Grid.Row>
            <Grid.Column width = {4} style = {{position: 'fixedm'}}>
              <Button 
                content='Add New' 
                size = 'big'
                color = 'green'
                style = {{borderRadius: '50px'}}
                fluid
                onClick = {(status) => this.props.addTodoModalToggle(true)}
              />
              <Categories />
              <DueToday />
            </Grid.Column>
            <Grid.Column width = {12} floated = 'right'>
              <Todos />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    )
  }
}

export default connect(null, {addTodoModalToggle, addCategoryModalToggle, editTodoModalToggle})(App);