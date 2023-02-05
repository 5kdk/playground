/* eslint-disable import/extensions */
import {
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
} from './state.mjs';

const $root = document.getElementById('root');

// set focus
const setFocusTo = $inputField => {
  const { length } = $inputField.value;
  $inputField.focus();
  $inputField.setSelectionRange(length, length);
};

window.addEventListener('DOMContentLoaded', getTodos);

// add todo
$root.addEventListener('keydown', e => {
  if (e.isComposing || e.keyCode === 229) return;
  if (e.key !== 'Enter' || !e.target.matches('.new-todo')) return;

  const content = e.target.value.trim();

  if (content) {
    addTodo(content).then(() => setFocusTo(document.querySelector('.new-todo')));
  }
});

// toggle todo
$root.addEventListener('click', e => {
  if (!e.target.classList.contains('toggle')) return;

  toggleTodo(e.target.closest('li').dataset.id).then(() => setFocusTo(document.querySelector('.new-todo')));
});

// remove todo
$root.addEventListener('click', e => {
  if (!e.target.classList.contains('destroy')) return;

  removeTodo(e.target.closest('li').dataset.id).then(() => setFocusTo(document.querySelector('.new-todo')));
});

// filter todos
$root.addEventListener('click', e => {
  if (!e.target.matches('.filters > li > a')) return;

  filterTodos(e.target.id).then(() => setFocusTo(document.querySelector('.new-todo')));
});

// toggle all todos
$root.addEventListener('click', e => {
  if (!e.target.classList.contains('toggle-all')) return;

  toggleAllTodos().then(() => setFocusTo(document.querySelector('.new-todo')));
});

// edit todo
$root.addEventListener('dblclick', e => {
  if (!e.target.matches('.view > label')) return;

  const { id } = e.target.closest('li').dataset;

  editTodos(id).then(() => setFocusTo(document.querySelector(`.todo-list > li[data-id="${id}"] > .edit`)));
});

// set focus todo
$root.addEventListener('keydown', e => {
  if (e.isComposing || e.keyCode === 229) return;
  if (e.key !== 'Enter' || !e.target.classList.contains('edit')) return;

  updateTodos(e.target.value, e.target.closest('li').dataset.id).then(() => {
    if (state.editingTodos.length === 0) {
      setFocusTo(document.querySelector('.new-todo'));
    } else {
      const id = state.editingTodos.at(-1);
      setFocusTo(document.querySelector(`.todo-list > li[data-id="${id}"] > .edit`));
    }
  });
});

// clear completed todos
$root.addEventListener('click', e => {
  if (!e.target.classList.contains('clear-completed')) return;

  clearCompletedTodos().then(() => setFocusTo(document.querySelector('.new-todo')));
});

// change input new todo value
$root.addEventListener('change', e => {
  if (e.isComposing || e.keyCode === 229) return;
  if (e.key !== 'Enter' || !e.target.matches('.new-todo')) return;

  changeInputNewTodoValue(e.target.value).then(() => setFocusTo(document.querySelector('.new-todo')));
});
