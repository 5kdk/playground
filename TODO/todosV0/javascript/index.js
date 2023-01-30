const getDOM = selector => document.querySelector(`${selector}`);

const $form = getDOM('.todo-form');
const $todoList = getDOM('.todo-list');
const $todoInput = getDOM('.todo-input');

const addTodo = e => {
  e.preventDefault();
  const value = $todoInput.value.trim().replace(/</g, '&lt').replace(/>/g, '&gt');
  if (!value) return;
  $todoInput.value = '';

  $todoInput.focus();
  $todoList.insertAdjacentHTML(
    'afterbegin',
    `
    <li class="todo-item">
      <input type="checkbox" />
      <span>${value}</span>
      
      <button class="todo-delete-btn">❌</button>
    </li>
    `
  );
};

const removeTodo = ({ target }) => {
  if (target.matches('.todo-delete-btn')) return;
  target.parentNode.remove();
};

$form.addEventListener('submit', addTodo);
$todoList.addEventListener('click', removeTodo);
