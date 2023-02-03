// eslint-disable-next-line import/extensions
import xhr from './utils/xhr.js';

const $todoInput = document.querySelector('.todo-input');
const $todoList = document.querySelector('.todo-list');

// server state
let todos = [];

const render = todos => {
  // prettier-ignore
  $todoList.innerHTML = todos.map(({ id, content, completed }) => `
    <li id="${id}">
      <input type="checkbox" ${completed ? 'checked' : ''}>
      <span>${content}</span>
      <button class="todo-remove">X</button>
    </li>`).join('');
};

const gernerateNextId = () => Math.max(...todos.map(todo => todo.id), 0) + 1;

window.addEventListener('DOMContentLoaded', () => {
  xhr.get(
    '/api/todos',
    _todos => {
      todos = _todos;
      render(todos);
    },
    // eslint-disable-next-line no-console
    console.log
  );
});

$todoInput.addEventListener('keyup', e => {
  const content = e.target.value.trim();
  if (e.key !== 'Enter' || content === '') return;
  e.target.value = '';

  xhr.post(
    '/api/todos',
    { id: gernerateNextId(), content, completed: false },
    _todos => {
      todos = _todos;
      render(todos);
    },
    // eslint-disable-next-line no-console
    console.log
  );
});

$todoList.addEventListener('change', e => {
  // id
  const { id } = e.target.parentNode;
  const completed = e.target.checked;

  xhr.patch(
    `/api/todos/${id}`,
    { completed },
    _todos => {
      todos = _todos;
      render(todos);
    },
    // eslint-disable-next-line no-console
    console.log
  );
});

$todoList.addEventListener('click', e => {
  if (!e.target.matches('.todo-remove')) return;
  const { id } = e.target.parentNode;

  xhr.delete(
    `/api/todos/${id}`,
    _todos => {
      todos = _todos;
      render(todos);
    },
    // eslint-disable-next-line no-console
    console.log
  );
});
