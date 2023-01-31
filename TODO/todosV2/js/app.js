const getDOM = selector => document.querySelector(`${selector}`);

const $main = getDOM('.main');
const $toggleAll = getDOM('.toggle-all');
const $newInput = getDOM('.new-todo');
const $todoList = getDOM('.todo-list');
const $todoCnt = getDOM('.todo-count');
const $filters = getDOM('.filters');
const $footer = getDOM('.footer');
const $clearBtn = getDOM('.clear-completed');

let state = {
  todos: [],
  filterId: 'all',
};

const getToDos = () => [
  { id: 3, content: 'Javascript', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'HTML', completed: false },
];

const renderToDos = () => {
  const { todos, filterId } = state;

  const _todos = todos.filter(todo =>
    filterId === 'completed' ? todo.completed : filterId === 'active' ? !todo.completed : todo
  );

  $todoList.innerHTML = _todos
    .map(
      ({ id, content, completed }) => `
        <li data-id="${id}"">
          <div class="view">
            <input type="checkbox" class="toggle" ${completed ? 'checked' : ''}/>
            <label>${content}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${content}" />
        </li>
      `
    )
    .join('');

  $main.classList.toggle('hidden', !todos.length);

  $footer.classList.toggle('hidden', !todos.length);

  $todoCnt.textContent = `${todos.filter(todo => todo.completed === false).length} item left`;

  $clearBtn.classList.toggle('hidden', !todos.some(todo => todo.completed === true));
};

const setState = newState => {
  state = { ...state, ...newState };
  console.log('state', state);
  renderToDos();
};

const generateId = () => Math.max(...state.todos.map(({ id }) => id), 0) + 1;

const addToDo = ({ target, key }) => {
  if (key !== 'Enter') return;

  const content = target.value.trim();
  target.value = '';
  if (!content) return;
  target.focus();

  setState({ todos: [{ id: generateId(), content, completed: false }, ...state.todos] });
};

const toggleToDo = ({ target }) => {
  if (!target.classList.contains('toggle')) return;

  const { id } = target.closest('li').dataset;

  setState({
    todos: state.todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo)),
  });
};

const removeToDo = ({ target }) => {
  if (!target.classList.contains('destroy')) return;

  const { id } = target.closest('li').dataset;

  setState({ todos: state.todos.filter(todo => todo.id !== +id) });
};

const filterToDo = ({ target }) => {
  if (!target.matches('a')) return;

  getDOM('.selected').classList.remove('selected');
  target.classList.add('selected');

  setState({ filterId: target.id });
};

const toggleAllToDo = ({ target }) => {
  if (!target.classList.contains('toggle-all')) return;

  const isChecked = target.checked;

  setState({ todos: state.todos.map(todo => ({ ...todo, completed: isChecked })) });
};

const editToDo = ({ target }) => {
  if (!target.closest('li')) return;

  target.closest('li').classList.toggle('editing');
};

const renewToDo = ({ target, key }) => {
  if (key !== 'Enter') return;

  const { id } = target.closest('li').dataset;

  const content = target.value.trim();

  setState({
    todos: state.todos.map(todo => (todo.id === +id && content ? { ...todo, content: target.value } : todo)),
  });
};

const clearTodo = () => setState({ todos: state.todos.filter(todo => todo.completed === false) });

window.addEventListener('DOMContentLoaded', () => setState({ todos: getToDos() }));
$newInput.addEventListener('keyup', addToDo);
$todoList.addEventListener('click', toggleToDo);
$todoList.addEventListener('click', removeToDo);
$filters.addEventListener('click', filterToDo);
$toggleAll.addEventListener('click', toggleAllToDo);
$todoList.addEventListener('dblclick', editToDo);
$todoList.addEventListener('keyup', renewToDo);
$clearBtn.addEventListener('click', clearTodo);
