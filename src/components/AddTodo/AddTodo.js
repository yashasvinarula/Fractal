import React, { Component } from 'react';
import {connect} from 'react-redux';

import {Modal, Button, Input, Header, Dropdown} from 'semantic-ui-react';
import DatePicker from 'react-date-picker';
import {addTodoModalToggle, addCategoryModalToggle, addTodo} from '../../actions';

import moment from 'moment';
import '../../utils/capitalize';

class AddTodo extends Component {
  constructor(props){
    super(props);
    this.state = {
      category: this.props.categories[0].name,
      task: '',
      error: false,
      errorMsg: '',
      startDate: new Date()
    };
    this.handleModal = this.handleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setStartDate = this.setStartDate.bind(this);
    this.handleCreateCategory = this.handleCreateCategory.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  componentDidMount(){
    this.setState({error: false, errorMsg: ''});
  }

  handleModal = status => {
    this.props.addTodoModalToggle(status);
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
    console.log('adding date', date);
    this.setState({startDate: date})
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
      this.setState({task: '', error: false, errorMsg: '', startDate: new Date()});
      this.props.addTodo(todo);
    }
  }

  render() {
    const {task, error, errorMsg, startDate} = this.state;
    return (
      <Modal
          size='tiny'
          open={this.props.addTodoModalOpen}
          onClose={(status) => this.handleModal(false)}
        >
          <Modal.Header>Add New Todo</Modal.Header>
          <Modal.Content>
            <Input
              fluid
              icon='tasks'
              iconPosition='left'
              label={{ tag: true, content: 'Add Todo' }}
              labelPosition='right'
              placeholder='Enter tha task'
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
              defaultValue={this.props.categories[0].name}
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
            <Button positive onClick={this.addTodo}>
              Add Todo
            </Button>
          </Modal.Actions>
        </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    addTodoModalOpen: state.addTodoModalOpen
  }
}

export default connect(mapStateToProps, {addTodoModalToggle, addCategoryModalToggle, addTodo})(AddTodo);