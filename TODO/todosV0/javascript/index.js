const get = query => document.querySelector(`${query}`);

const $form = get('.todo-form');
const $todoList = get('.todo-list');
const $todoInput = get('.todo-input');

$form.addEventListener('submit', e => {
  e.preventDefault();
  const value = $todoInput.value.trim();

  if (value === '') return;

  $todoInput.value = '';

  // prettier-ignore
  $todoList.innerHTML =
    `
    <li>
      <input type="checkbox" />
      <span>${value}</span>
      <button>X</button>
    </li>
    ` + $todoList.innerHTML;
});
