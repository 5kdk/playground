// eslint-disable-next-line import/extensions
import * as model from './model.mjs';

const $root = document.getElementById('root');

window.addEventListener('DOMContentLoaded', model.getTodos);

$root.addEventListener('change', e => {
  if (e.isComposing || e.keyCode === 229) return;
  if (e.key !== 'Enter' || !e.target.matches('.new-todo')) return;

  model.changeInputNewTodoValue(e.target.value);
  model.setFocusTo(document.querySelector('.new-todo'));
});

// add todo
$root.addEventListener('keydown', e => {
  if (e.isComposing || e.keyCode === 229) return;
  if (e.key !== 'Enter' || !e.target.matches('.new-todo')) return;

  const content = e.target.value.trim();

  if (content) {
    model.addTodo(content);
    model.setFocusTo(document.querySelector('.new-todo'));
  }
});

// toggle todo
$root.addEventListener('input', e => {
  if (!e.target.classList.contains('toggle')) return;

  model.toggleTodo(e.target.closest('li').dataset.id);
  model.setFocusTo(document.querySelector('.new-todo'));
});

// remove todo
$root.addEventListener('click', e => {
  if (!e.target.classList.contains('destroy')) return;

  model.removeTodo(e.target.closest('li').dataset.id);
  model.setFocusTo(document.querySelector('.new-todo'));
});

// filter todos
$root.addEventListener('click', e => {
  if (!e.target.matches('.filters > li > a')) return;

  model.filterTodos(e.target.id);
  model.setFocusTo(document.querySelector('.new-todo'));
});

// toggle all todos
$root.addEventListener('click', e => {
  if (!e.target.classList.contains('toggle-all')) return;

  model.toggleAllTodos();
  model.setFocusTo(document.querySelector('.new-todo'));
});

// edit mod
$root.addEventListener('dblclick', e => {
  if (!e.target.matches('.view > label')) return;

  const { id } = e.target.closest('li').dataset;

  model.editTodos(id);
  model.setFocusTo(document.querySelector(`.todo-list > li[data-id="${id}"] > .edit`));
});

$root.addEventListener('keydown', e => {
  if (e.isComposing || e.keyCode === 229) return;
  if (e.key !== 'Enter' || !e.target.classList.contains('edit')) return;

  model.updateTodos(e.target.value, e.target.closest('li').dataset.id);

  if (model.model.state.editingTodos.length === 0) {
    model.setFocusTo(document.querySelector('.new-todo'));
  } else {
    const id = model.state.editingTodos.at(-1);
    model.setFocusTo(document.querySelector(`.todo-list > li[data-id="${id}"] > .edit`));
  }
});

$root.addEventListener('click', e => {
  if (!e.target.classList.contains('clear-completed')) return;

  model.clearCompletedTodos();
  model.setFocusTo(document.querySelector('.new-todo'));
});