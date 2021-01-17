import React, { Component } from 'react';
import { Segment, Header, Icon, Button, Modal, Input, Message } from 'semantic-ui-react'
import {connect} from 'react-redux';
import {addCategoryModalToggle, addCategory} from '../../actions';

class Categories extends Component {

  constructor(props){
    super(props);
    this.state = {
      categories: [],
      addCategoryModalOpen: false,
      categoryName: '',
      error: false,
      errorMsg: ''
    }
    this.handleModal = this.handleModal.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    const {categories, addCategoryModalOpen} = this.props;
    this.setState({categories});
    this.props.addCategoryModalToggle(false);
  }

  componentDidUpdate(props, state){
    if(props.categories !== state.categories){
      const {categories} = props;
      this.setState({categories});
    }
    if(props.addCategoryModalOpen !== state.addCategoryModalOpen){
      const {addCategoryModalOpen} = props;
      this.setState({addCategoryModalOpen});
    }
  }

  handleModal = status => {
    this.props.addCategoryModalToggle(status);
  }

  addCategory = () => {
    const {categoryName} = this.state;
    const {availableColors} = this.props;
    const n = availableColors.length;
    const color = availableColors[Math.floor(Math.random()*n)];
    const category = {
      name: categoryName.trim(),
      categoryColor: color
    };
    let flag = true;
    for(let c of this.props.categories){
      if(c.name === categoryName){
        flag = false;
        break;
      }
    }
    if(categoryName === ''){
      this.setState({error: true, errorMsg: 'Name cant be blank'});
    }else if(this.props.categories.length === this.props.maxCategories){
      this.setState({error: true, errorMsg: `Can't have more than 10 categories`});
    }else if(flag === false){
      this.setState({error: true, errorMsg: `Category already exists`});
    }else{
      this.setState({categoryName: '', error: false, errorMsg: ''});
      this.props.addCategory(category);
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const {categories, addCategoryModalOpen, categoryName, error, errorMsg} = this.state;
    return (
      <>
        <Modal
          size='tiny'
          open={this.props.addCategoryModalOpen}
          onClose={(status) => this.handleModal(false)}
        >
          <Modal.Header>Add New Category</Modal.Header>
          <Modal.Content>
            <Input
              fluid
              icon='tags'
              iconPosition='left'
              label={{ tag: true, content: 'Add Category' }}
              labelPosition='right'
              placeholder='Enter Name'
              name = 'categoryName'
              value = {categoryName}
              onChange = {this.handleChange}
            />
              {
                error && <Header as = 'h5' color = 'red'>{errorMsg}</Header>
              }
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={(status) => this.handleModal(false)}>
              Cancel
            </Button>
            <Button positive onClick={this.addCategory}>
              Add Category
            </Button>
          </Modal.Actions>
        </Modal>
        <Segment color = 'red'>
          <Header as = 'h5'>Categories</Header>
          <Segment.Group size = 'mini' attached>
            {
              this.props.categories.map(c => 
                <Segment key = {c.id} style = {{textTransform: 'capitalize', cursor: 'pointer'}}>
                  <Icon
                    size = 'large'
                    name = 'circle' 
                    // circular
                    // inverted
                    color = {c.categoryColor}
                  />
                  <span style = {{fontSize: '13px'}}>{c.name}</span>
                  <Icon name = 'ellipsis vertical' style = {{position: 'absolute', right: '10px'}} />
                </Segment>
              )
            }
            <Button 
              attached = 'bottom' 
              icon='plus' 
              content='Add Category' 
              color = 'green' 
              onClick = {(status) => this.handleModal(true)}
            />
          </Segment.Group>
        </Segment>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    maxCategories: state.maxCategories,
    categories: state.categories,
    availableColors: state.availableColors,
    addCategoryModalOpen: state.addCategoryModalOpen
  }
}

export default connect(mapStateToProps, {addCategoryModalToggle, addCategory})(Categories);