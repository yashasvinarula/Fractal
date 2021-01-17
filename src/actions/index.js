import * as types from './types';
import {uuid} from '../utils/uuid';

export const addCategory = category => dispatch => {
  const {categoryColor} = category;
  category.name = category.name.toLowerCase();
  category.id = uuid();
  dispatch({
    type: types.ADD_CATEGORY,
    payload: category
  });
  dispatch(addCategoryModalToggle(false));
  dispatch(removeColor(categoryColor));
}

export const addCategoryModalToggle = status => dispatch => {
  dispatch({
    type: types.ADD_CATEGORY_MODAL_TOGGLE,
    payload: status
  });
}

export const removeColor = color => dispatch => {
  dispatch({
    type: types.REMOVE_COLOR,
    payload: color
  });
}

export const addTodoModalToggle = status => dispatch => {
  dispatch({
    type: types.ADD_TODO_MODAL_TOGGLE,
    payload: status
  });
}

export const addTodo = todo => dispatch => {
  todo.id = uuid();
  dispatch({
    type: types.ADD_TODO,
    payload: todo
  });
  dispatch(addTodoModalToggle(false)); 
}

export const setActiveCategory = category => dispatch => {
  dispatch({
    type: types.SET_ACTIVE_CATEGORY,
    payload: category
  })
}

export const setActiveViewing = view => dispatch => {
  dispatch({
    type: types.SET_ACTIVE_VIEWING,
    payload: view
  })
}

export const changeFinishStatus = (todo) => dispatch => {
  dispatch({
    type: types.CHANGE_FINISH_STATUS,
    payload: todo
  })
}

export const deleteTodo = (todo) => dispatch => {
  dispatch({
    type: types.DELETE_TODO,
    payload: todo
  })
}

export const editTodo = todo => dispatch => {
  dispatch({
    type: types.EDIT_TODO,
    payload: todo
  });
  dispatch(editTodoModalToggle(false));
}

export const editTodoModalToggle = status => dispatch => {
  dispatch({
    type: types.EDIT_TODO_MODAL_TOGGLE,
    payload: status
  })
}