import React, { Component } from 'react';
import { Segment, Header, Icon, Button } from 'semantic-ui-react'
import {connect} from 'react-redux';
import moment from 'moment';
import EmptyList from '../EmptyList';
class DueToday extends Component {

  constructor(props){
    super(props);
    this.state = {
      categories: [],
      todayTasks: []
    }
  }

  componentDidMount(){
    const {todos} = this.props;
    const todayTasks = todos.filter(t => 
      moment(t.dueDate).format('MMM Do YYYY') === moment().format('MMM Do YYYY')
    );
    this.setState({todayTasks});
  }

  componentDidUpdate(props, state){
    if(props.todos !== this.props.todos){
      const {todos} = this.props;
      const todayTasks = todos.filter(t => 
        moment(t.dueDate).format('MMM Do YYYY') === moment().format('MMM Do YYYY')
      );
      this.setState({todayTasks});
    }
  }


  render() {
    const {categories, todayTasks} = this.state;
    return (
      <Segment color = 'orange'>
        <Header as = 'h5'>Due Today</Header>
        <Segment.Group size = 'mini' attached>
          {
            todayTasks.length === 0 ? <EmptyList /> : (
              todayTasks.map(c => 
                <Segment key = {c.id} style = {{textTransform: 'capitalize'}}>
                  {c.task}
                </Segment>
              )
            )
          }
        </Segment.Group>
      </Segment>
    )
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos
  }
}

export default connect(mapStateToProps, null)(DueToday);