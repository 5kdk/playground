// eslint-disable-next-line import/extensions
import render from './view.mjs';

// eslint-disable-next-line import/no-mutable-exports
let state = {
  todos: [],
  editingTodos: [],
  filterId: 'all',
  isCheckedToggleAll: false,
  inputNewTodoValue: '',
};

const setState = newState => {
  state = { ...state, ...newState };
  render(state);
};

// get todos (fetch)
const getTodos = () => {
  setState({
    todos: [
      { id: 3, content: 'Javascript', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'HTML', completed: false },
    ],
  });
};

// generate id
const generateId = () => Math.max(...state.todos.map(todo => todo.id), 0) + 1;

// add todo
const addTodo = content => {
  const newTodo = { id: generateId(), content, completed: false };
  setState({ todos: [newTodo, ...state.todos], inputNewTodoValue: '' });
};

// toggle todo
const toggleTodo = id => {
  const todos = state.todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo));
  const [firstTodo] = todos;

  setState({
    todos,
    isCheckedToggleAll: todos.every(({ completed }) => completed === firstTodo.completed)
      ? firstTodo.completed
      : state.isCheckedToggleAll,
  });
};

// remove todo
const removeTodo = id => {
  const todos = state.todos.filter(todo => todo.id !== +id);
  setState({ todos });
};

// filter todos
const filterTodos = id => {
  setState({ filterId: id });
};

// toggle all todos
const toggleAllTodos = () => {
  const isCheckedToggleAll = !state.isCheckedToggleAll;
  setState({
    todos: state.todos.map(todo => ({ ...todo, completed: isCheckedToggleAll })),
    isCheckedToggleAll,
  });
};

// edit todos
const editTodos = id => {
  setState({ editingTodos: [...state.editingTodos, +id] });
};

// update todos
const updateTodos = (content, id) => {
  setState({
    todos: state.todos.map(todo => (todo.id === +id ? { ...todo, content } : todo)),
    editingTodos: state.editingTodos.filter(_id => _id !== +id),
  });
};

// clear all completed todos
const clearCompletedTodos = () => {
  setState({
    todos: state.todos.filter(todo => todo.completed === false),
    editTodos: [],
  });
};

// change input new todo value
const changeInputNewTodoValue = value => {
  setState({ inputNewTodoValue: value });
};

// set focus
const setFocusTo = $inputField => {
  const { length } = $inputField.value;
  $inputField.focus();
  $inputField.setSelectionRange(length, length);
};

export {
  state,
  setState,
  getTodos,
  addTodo,
  toggleTodo,
  removeTodo,
  filterTodos,
  toggleAllTodos,
  editTodos,
  updateTodos,
  clearCompletedTodos,
  changeInputNewTodoValue,
  setFocusTo,
};
