const getDOM = selector => document.querySelector(`${selector}`);

const $form = getDOM('.todo-form');
const $todoList = getDOM('.todo-list');
const $todoInput = getDOM('.todo-input');

const inputChecker = $todoInput => $todoInput.value.trim().replace(/</g, '&lt').replace(/>/g, '&gt');

const addTodo = e => {
  e.preventDefault();
  const value = inputChecker($todoInput);
  if (!value) return;
  $todoInput.value = '';
  $todoInput.focus();
  $todoList.insertAdjacentHTML(
    'afterbegin',
    `
    <li>
      <input type="checkbox" />
      <span>${value}</span>
      <button>X</button>
    </li>
    `
  );
};

$form.addEventListener('submit', addTodo);
