import React, { Component } from 'react';
import { Segment, Dropdown, Button, Icon, Message, Label, Header } from 'semantic-ui-react';
import {connect} from 'react-redux';
import moment from 'moment';

import {setActiveCategory, setActiveViewing, changeFinishStatus, deleteTodo, editTodoModalToggle} from '../../actions';
import EmptyList from '../EmptyList';
import EditTodo from '../EditTodo';

class Todos extends Component {
  constructor(props){
    super(props);
    this.state =  {
      activeCategory: '',
      activeViewing: '',
      todos: [],
      categories: [],
      viewOptions: [],
      currTodo: {name: '1'}
    }
    this.handleFinish = this.handleFinish.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
  }

  componentDidMount(){
    const {todos, categories, activeCategory, activeViewing} = this.props;
    this.setState({todos, categories, activeCategory, activeViewing});
  }

  componentDidUpdate(props, state){
    if(this.state.todos !== this.props.todos){
      const {activeCategory, activeViewing} = this.props;
        this.setState({todos: this.props.todos});
    }
    if(this.state.categories !== this.props.categories){
      this.setState({categories: this.props.categories});
    }
  }

  handleFinish = (task) => {
   task.finished = !task.finished;
   this.props.changeFinishStatus(task); 
  }

  deleteTodo = todo => {
    const res = window.confirm(`Are you sure you want to delete task "${todo.task}" ???`)
    res && this.props.deleteTodo(todo);
  }

  editTodo = (todo) => {
    this.setState({currTodo: todo})
    this.props.editTodoModalToggle(true);
  }

  render() {
    const {activeCategory, todos, categories, activeViewing, currTodo} = this.state;
    return (
      <>
        {this.props.editTodoModalOpen===true && <EditTodo todo = {currTodo} />}
        <Segment>
          <Message color = 'blue'>
            <Header as = 'h2' textAlign = 'center'>Todo List</Header>
          </Message>
          <Segment.Group>
            {
              todos.length === 0 ? <EmptyList /> : (
                todos.map(t => 
                    <Segment key = {t.id} style = {{lineHeight: '1.7'}}>
                      <Label.Group attached = 'top left'>
                        <Label style = {{textTransform: 'capitalize'}} color = {t.categoryColor || 'blue'}>
                          {t.category || 'primary'}
                        </Label>
                        <Label color = {t.finished === true ? 'green' : 'red'}>
                          {t.finished === true ? 'Completed' : 'Unfinished'}
                        </Label>
                        {
                          t.finished === false && (
                            <Label color = 'orange'>
                              Due: {moment(t.dueDate).format('MMM Do YYYY')}
                            </Label>
                          )
                        }
                      </Label.Group>
                      <strong style = {{fontSize: '16px'}}>{t.task}</strong>
                      <br />
                      {' '}
                      Created: <strong>{moment(t.createdOn).fromNow()}</strong>
                      <div style = {{float: 'right'}}>
                        <Button circular size = 'mini' color={t.finished === true ? 'orange' : 'green'} icon = {t.finished === true ? 'cancel' : 'check'} onClick = {(todo) => this.handleFinish(t)}/>
                        <Button circular size = 'mini' color='blue' icon='edit' onClick = {(todo) => this.editTodo(t)} />
                        <Button circular size = 'mini' color='red' icon='trash' onClick = {(todo) => this.deleteTodo(t)} />
                      </div>                  
                    </Segment>
                  )
                )
            }
          </Segment.Group>
        </Segment>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos,
    categories: state.categories,
    activeCategory: state.activeCategory,
    activeViewing: state.activeViewing,
    editTodoModalOpen: state.editTodoModalOpen
  }
}

export default connect(mapStateToProps, {setActiveCategory, setActiveViewing, changeFinishStatus, deleteTodo, editTodoModalToggle})(Todos);