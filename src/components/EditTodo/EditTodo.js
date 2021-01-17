import React, { Component } from 'react';
import {connect} from 'react-redux';

import {Modal, Button, Input, Header, Dropdown} from 'semantic-ui-react';
import DatePicker from 'react-date-picker';
import {addTodoModalToggle, addCategoryModalToggle, addTodo, editTodo, editTodoModalToggle} from '../../actions';

import moment from 'moment';
import '../../utils/capitalize';

class EditTodo extends Component {
  constructor(props){
    super(props);
    this.state = {
      category: '',
      task: '',
      error: false,
      errorMsg: '',
      startDate: null
    };
    this.handleModal = this.handleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setStartDate = this.setStartDate.bind(this);
    this.handleCreateCategory = this.handleCreateCategory.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  componentDidMount(){
    this.setState({
      error: false, 
      errorMsg: '',
      task: this.props.todo.task,
      startDate: moment(this.props.dueDate)._d,
      category: this.props.todo.category
    });
  }

  componentDidUpdate(props, state){
    if(this.props.todo.dueDate !== state.startDate){
      this.setState({startDate: this.props.todo.dueDate});
    }
  }

  handleModal = status => {
    this.props.editTodoModalToggle(status);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCategoryChange = (e, {value}) => {
    this.setState({category: value});
  }

  setStartDate = date => {
    this.setState({startDate: moment(date)._d})
  }

  handleCreateCategory = () => {
    this.props.addCategoryModalToggle(true);
  }

  addTodo = () => {
    const {category, task, startDate} = this.state;
    const {categoryColor} = this.props.categories.filter(i => (
      i.name === category.trim().toLowerCase()
    ))[0];
    const todo = {
      task,
      category,
      categoryColor,
      dueDate: startDate,
      finished: false,
      createdOn: Date.now()
    }
    if(task === ''){
      this.setState({error: true, errorMsg: 'Task cant be blank'});
    }else{
      this.setState({task: '', error: false, errorMsg: ''});
      this.props.addTodo(todo);
    }
  }

  editTodo = () => {
    let todo = this.props.todo;
    const {task, category, startDate} = this.state;
    todo.task = task.trim().toLowerCase();
    todo.category = category.trim().toLowerCase();
    todo.dueDate = startDate;
    if(task === ''){
      this.setState({error: true, errorMsg: 'Task cant be blank'});
    }else{
      this.setState({task: '', error: false, errorMsg: ''});
      this.props.editTodo(todo);
    }
  }

  render() {
    const {task, error, errorMsg, startDate} = this.state;
    return (
      <Modal
          size='tiny'
          open={this.props.editTodoModalOpen}
          onClose={(status) => this.handleModal(false)}
        >
          <Modal.Header>Edit Todo</Modal.Header>
          <Modal.Content>
            <Input
              fluid
              icon='tasks'
              iconPosition='left'
              label={{ tag: true, content: 'Add Todo' }}
              labelPosition='right'
              placeholder='Enter the task'
              name = 'task'
              value = {task}
              onChange = {this.handleChange}
            />
            {
              error && <Header as = 'h5' color = 'red'>{errorMsg}</Header>
            }
            <br />
            <label>Date: </label>
            <div
              style = {{
                display: 'inline',
                marginLeft: '10px',
                width: '200px'
              }}
            >
              <DatePicker
                value={startDate}
                onChange={(date) => this.setStartDate(date)}
                minDate = {new Date()}
                clearIcon = {null}
              />
            </div>
            <br />
            <br />
            <Dropdown 
              fluid
              placeholder='Category' 
              search 
              selection 
              options={this.props.categories.map(c => ({
                key: c.id,
                value: c.name,
                text: c.name.capitalize(),
              }))}
              name = 'category'
              onChange = {this.handleCategoryChange}
              defaultValue={this.props.todo.category}
            />
            <Header 
              as = 'h5' 
              color = 'blue' 
              style = {{textAlign: 'center', textDecoration: 'underline', cursor: 'pointer'}}
              onClick = {this.handleCreateCategory}
            >
              Create new Category?
            </Header>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={(status) => this.handleModal(false)}>
              Cancel
            </Button>
            <Button positive onClick={this.editTodo}>
              Save Changes
            </Button>
          </Modal.Actions>
        </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    editTodoModalOpen: state.editTodoModalOpen
  }
}

export default connect(mapStateToProps, {addTodoModalToggle, addCategoryModalToggle, addTodo, editTodo, editTodoModalToggle})(EditTodo);