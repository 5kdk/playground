// eslint-disable-next-line import/no-unresolved, import/extensions
import xhr from './utils/xhr.mjs';
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

const URL_PATH = '/api/todos';

const setState = newState => {
  state = { ...state, ...newState };
  render(state);
};

// get todos (fetch) ✔️
const getTodos = () => {
  // eslint-disable-next-line no-console
  xhr.get(
    URL_PATH,
    todo => {
      setState({ todos: todo });
    },
    // eslint-disable-next-line no-console
    console.log
  );
};

// generate id ✔️
const generateId = () => Math.max(...state.todos.map(todo => todo.id), 0) + 1;

// add todo ✔️
const addTodo = content => {
  const newTodo = { id: generateId(), content, completed: false };

  xhr.post(
    URL_PATH,
    newTodo,
    todos => {
      setState({ todos, inputNewTodoValue: '' });
    },
    // eslint-disable-next-line no-console
    console.log
  );
};

// toggle todo ✔️
const toggleTodo = id => {
  const selectedTodo = state.todos.filter(todo => todo.id === +id);
  const [firstTodo] = selectedTodo;

  xhr.patch(
    `${URL_PATH}/${id}`,
    { completed: !firstTodo.completed },
    todos =>
      setState({
        todos,
        isCheckedToggleAll: todos.every(({ completed }) => completed === !firstTodo.completed)
          ? !firstTodo.completed
          : state.isCheckedToggleAll,
      }),
    // eslint-disable-next-line no-console
    console.log
  );
};

// remove todo ✔️
const removeTodo = id => {
  // eslint-disable-next-line no-console
  xhr.delete(`${URL_PATH}/${id}`, todos => setState({ todos }), console.log);
};

// filter todos ✔️
const filterTodos = id => {
  setState({ filterId: id });
};

// toggle all todos ✔️
const toggleAllTodos = () => {
  const isCheckedToggleAll = !state.isCheckedToggleAll;
  // eslint-disable-next-line no-console
  xhr.patch(
    URL_PATH,
    { completed: isCheckedToggleAll },
    todos => {
      setState({
        todos,
        isCheckedToggleAll,
      });
    },
    // eslint-disable-next-line no-console
    console.log
  );
};

// edit todos ✔️
const editTodos = id => {
  setState({ editingTodos: [...state.editingTodos, +id] });
};

// update todos ✔️
const updateTodos = (content, id) => {
  xhr.patch(
    `${URL_PATH}/${id}`,
    { content },
    todos => {
      setState({
        todos,
        editingTodos: state.editingTodos.filter(_id => _id !== +id),
      });
    },
    // eslint-disable-next-line no-console
    console.log
  );
};

// clear all completed todos ✔️
const clearCompletedTodos = () => {
  xhr.delete(
    `${URL_PATH}?completed=true`,
    todos => {
      setState({ todos });
    },
    // eslint-disable-next-line no-console
    console.log
  );
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
