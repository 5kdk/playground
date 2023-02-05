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
const getTodos = () => {};
promise
  .get(URL_PATH)
  .then(todos => {
    setState({ todos });
  })
  .catch(e => console.log(e));

// add todo ✔️
const addTodo = content => {
  const newTodo = { id: generateId(), content, completed: false };

  return promise
    .post(URL_PATH, newTodo)
    .then(todos => {
      setState({ todos, inputNewTodoValue: '' });
    })
    .catch(e => console.log(e));
};

// toggle todo ✔️
const toggleTodo = id => {
  const selectedTodo = state.todos.filter(todo => todo.id === +id);
  const [firstTodo] = selectedTodo;

  return promise.patch(`${URL_PATH}/${id}`, { completed: !firstTodo.completed }).then(todos => {
    setState({
      todos,
      isCheckedToggleAll: todos.every(({ completed }) => completed === !firstTodo.completed)
        ? !firstTodo.completed
        : state.isCheckedToggleAll,
    }).catch(e => console.log(e));
  });
};

// remove todo ✔️
const removeTodo = id =>
  promise
    .delete(`${URL_PATH}/${id}`)
    .then(todos => {
      setState({ todos });
    })
    .catch(e => console.log(e));

// filter todos ✔️
const filterTodos = id => {
  setState({ filterId: id });
};

// toggle all todos ✔️
const toggleAllTodos = () => {
  const isCheckedToggleAll = !state.isCheckedToggleAll;
  return promise
    .patch(`${URL_PATH}`, { completed: isCheckedToggleAll })
    .then(todos => {
      setState({
        todos,
        isCheckedToggleAll,
      });
    })
    .catch(e => console.log(e));
};

// edit todos ✔️
const editTodos = id => {
  setState({ editingTodos: [...state.editingTodos, +id] });
};

// update todos ✔️
const updateTodos = (content, id) =>
  promise
    .patch(`${URL_PATH}/${id}`, { content })
    .then(todos => {
      setState({
        todos,
        editingTodos: state.editingTodos.filter(_id => _id !== +id), // 편집 모드 => 일반 모드
      });
    })
    .catch(e => console.log(e));

// clear all completed todos ✔️
const clearCompletedTodos = () =>
  promise
    .delete(`${URL_PATH}?completed=true`)
    .then(todos => {
      setState({ todos });
    })
    .catch(e => console.log(e));

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
