// eslint-disable-next-line import/extensions
import { state, setState } from './model.mjs';

const $root = document.getElementById('root');

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
// prettier-ignore
function generateId() {
  return Math.max(...state.todos.map(todo => todo.id), 0) + 1;
}

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

window.addEventListener('DOMContentLoaded', getTodos);

$root.addEventListener('change', e => {
  if (e.isComposing || e.keyCode === 229) return;
  if (e.key !== 'Enter' || !e.target.matches('.new-todo')) return;

  changeInputNewTodoValue(e.target.value);
  setFocusTo(document.querySelector('.new-todo'));
});

// add todo
$root.addEventListener('keydown', e => {
  if (e.isComposing || e.keyCode === 229) return;
  if (e.key !== 'Enter' || !e.target.matches('.new-todo')) return;

  const content = e.target.value.trim();

  if (content) {
    addTodo(content);
    setFocusTo(document.querySelector('.new-todo'));
  }
});

// toggle todo
$root.addEventListener('input', e => {
  if (!e.target.classList.contains('toggle')) return;

  toggleTodo(e.target.closest('li').dataset.id);
  setFocusTo(document.querySelector('.new-todo'));
});

// remove todo
$root.addEventListener('click', e => {
  if (!e.target.classList.contains('destroy')) return;

  removeTodo(e.target.closest('li').dataset.id);
  setFocusTo(document.querySelector('.new-todo'));
});

// filter todos
$root.addEventListener('click', e => {
  if (!e.target.matches('.filters > li > a')) return;

  filterTodos(e.target.id);
  setFocusTo(document.querySelector('.new-todo'));
});

// toggle all todos
$root.addEventListener('click', e => {
  if (!e.target.classList.contains('toggle-all')) return;

  toggleAllTodos();
  setFocusTo(document.querySelector('.new-todo'));
});

// edit mod
$root.addEventListener('dblclick', e => {
  if (!e.target.matches('.view > label')) return;

  const { id } = e.target.closest('li').dataset;

  editTodos(id);
  setFocusTo(document.querySelector(`.todo-list > li[data-id="${id}"] > .edit`));
});

$root.addEventListener('keydown', e => {
  if (e.isComposing || e.keyCode === 229) return;
  if (e.key !== 'Enter' || !e.target.classList.contains('edit')) return;

  updateTodos(e.target.value, e.target.closest('li').dataset.id);

  if (state.editingTodos.length === 0) {
    setFocusTo(document.querySelector('.new-todo'));
  } else {
    const id = state.editingTodos.at(-1);
    setFocusTo(document.querySelector(`.todo-list > li[data-id="${id}"] > .edit`));
  }
});

$root.addEventListener('click', e => {
  if (!e.target.classList.contains('clear-completed')) return;

  clearCompletedTodos();
  setFocusTo(document.querySelector('.new-todo'));
});

export default $root;
