import { editTodo } from '../actions';
import * as types from '../actions/types';

const initialState = {
  categories: [
    {name: 'primary', categoryColor: 'blue', id: 'abcdefghijkl'}
  ],
  maxCategories: 10,
  availableColors: ['yellow', 'olive', 'teal', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'],
  todos: [],
  activeCategory: '',
  activeViewing: '',
  dueToday: [],
  addCategoryModalOpen: false,
  addTodoModalOpen: false,
  editTodoModalOpen: false
}

export default (state = initialState, action) => {
  switch(action.type){
    case types.ADD_CATEGORY:
      return {...state, categories: [...state.categories, action.payload, ]}
    case types.ADD_CATEGORY_MODAL_TOGGLE:
      return {...state, addCategoryModalOpen: action.payload}
    case types.REMOVE_COLOR:
      const availableColors = state.availableColors.filter(i => i!==action.payload);
      return {...state, availableColors: availableColors}
    case types.ADD_TODO_MODAL_TOGGLE:
      return {...state, addTodoModalOpen: action.payload}
    case types.ADD_TODO:
      return {...state, todos: [action.payload, ...state.todos]}
    case types.SET_ACTIVE_CATEGORY:
      return {...state, activeCategory: action.payload}
    case types.SET_ACTIVE_VIEWING:
        return {...state, activeViewing: action.payload}
    case types.CHANGE_FINISH_STATUS: {
      const todos = state.todos.map(t => (
        action.payload.id === t.id ? action.payload : t
      ))
      return {...state, todos}
    }
    case types.DELETE_TODO: {
      const todos = state.todos.filter(t => action.payload.id !== t.id)
      return {...state, todos}
    }
    case types.EDIT_TODO_MODAL_TOGGLE: {
      return {...state, editTodoModalOpen: action.payload}
    }
    case types.EDIT_TODO: {
      const todos = state.todos.map(t => (
        action.payload.id === t.id ? action.payload : t
      ))
      return {...state, todos}
    }    
    default:
      return state
  }
}