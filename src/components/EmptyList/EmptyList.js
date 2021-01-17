import React, { Component } from 'react'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'
import {connect} from 'react-redux';
import {addTodoModalToggle} from '../../actions';
class EmptyList extends Component {
  render() {
    return (
      <Segment placeholder>
        <Header icon>
          <Icon name='smile outline' />
          Looks like you've got everything planned
        </Header>
        <Segment.Inline>
          <Button primary onClick = {() => this.props.addTodoModalToggle(true)}>Add New Task</Button>
        </Segment.Inline>
      </Segment>
    )
  }
}

export default connect(null, {addTodoModalToggle})(EmptyList);