/* eslint-disable import/extensions */
/* eslint-disable no-console */
import promise from './utils/promise.mjs';
import render from './render.mjs';

// eslint-disable-next-line import/no-mutable-exports
let state = {
  todos: [],
  editingTodos: [],
  filterId: 'all',
  isCheckedToggleAll: false,
  inputNewTodoValue: '',
};

const URL_PATH = '/api/todos';

const setState = newState => {
  state = { ...state, ...newState };
  render(state);
};

// generate id ✔️
const generateId = () => Math.max(...state.todos.map(todo => todo.id), 0) + 1;

// get todos (fetch) ✔️
const getTodos = async () => {
  try {
    const todos = await promise.get(URL_PATH);
    setState({ todos });
  } catch (e) {
    console.log(e);
  }
};

// add todo ✔️
const addTodo = async content => {
  const newTodo = { id: generateId(), content, completed: false };

  try {
    const todos = await promise.post(URL_PATH, newTodo);
    setState({ todos, inputNewTodoValue: '' });
  } catch (e) {
    console.log(e);
  }
};

// toggle todo ✔️
const toggleTodo = async id => {
  const selectedTodo = state.todos.filter(todo => todo.id === +id);
  const [firstTodo] = selectedTodo;

  const todos = await promise.patch(`${URL_PATH}/${id}`, { completed: !firstTodo.completed });
  setState({
    todos,
    isCheckedToggleAll: todos.every(({ completed }) => completed === !firstTodo.completed)
      ? !firstTodo.completed
      : state.isCheckedToggleAll,
  }).catch(e => console.log(e));
};

// remove todo ✔️
const removeTodo = async id => {
  try {
    const todos = await promise.delete(`${URL_PATH}/${id}`);
    setState({ todos });
  } catch (e) {
    console.log(e);
  }
};

// filter todos ✔️
const filterTodos = id => {
  setState({ filterId: id });
};

// toggle all todos ✔️
const toggleAllTodos = async () => {
  const isCheckedToggleAll = !state.isCheckedToggleAll;
  try {
    const todos = await promise.patch(`${URL_PATH}`, { completed: isCheckedToggleAll });
    setState({
      todos,
      isCheckedToggleAll,
    });
  } catch (e) {
    console.log(e);
  }
};

// edit todos ✔️
const editTodos = id => {
  setState({ editingTodos: [...state.editingTodos, +id] });
};

// update todos ✔️
const updateTodos = async (content, id) => {
  try {
    const todos = await promise.patch(`${URL_PATH}/${id}`, { content });
    setState({
      todos,
      editingTodos: state.editingTodos.filter(_id => _id !== +id), // 편집 모드 => 일반 모드
    });
  } catch (e) {
    console.log(e);
  }
};

// clear all completed todos ✔️
const clearCompletedTodos = async () => {
  try {
    const todos = await promise.delete(`${URL_PATH}?completed=true`);
    setState({ todos });
  } catch (e) {
    console.log(e);
  }
};

// change input new todo value ✔️
const changeInputNewTodoValue = value => {
  setState({ inputNewTodoValue: value });
};

export {
  state,
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
};
