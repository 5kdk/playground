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
  editingTodos: [],
  filterId: 'all',
};

const renderToDos = () => {
  console.log('State', state);

  const { todos, editingTodos, filterId } = state;

  const _todos = todos.filter(({ completed }) =>
    filterId === 'completed' ? completed : filterId === 'active' ? !completed : true
  );

  // prettier-ignore
  $todoList.innerHTML = _todos.map(({ id, content, completed }) => `
    <li data-id="${id}" class="${editingTodos.includes(id) ? 'editing' : ''}">
      <div class="view">
        <input type="checkbox" class="toggle" ${completed ? 'checked' : ''}/>
        <label>${content}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${content}" />
    </li>`).join('');

  const todoNum = todos.filter(todo => !todo.completed).length;
  $todoCnt.textContent = `${todoNum} item${todoNum > 1 ? 's' : ''} left`;
  [$main, $footer].forEach($ele => $ele.classList.toggle('hidden', !todos.length));
  $clearBtn.classList.toggle('hidden', !todos.some(todo => todo.completed === true));
};

const setState = newState => {
  state = { ...state, ...newState };
  renderToDos();
};

const generateId = () => Math.max(...state.todos.map(({ id }) => id), 0) + 1;

const getTodos = () => {
  setState({
    todos: [
      { id: 3, content: 'Javascript', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'HTML', completed: false },
    ],
  });
};

// add todo
const addTodo = ({ target, key }) => {
  if (key !== 'Enter') return;

  const content = target.value.trim();
  target.focus();
  target.value = '';

  const newTodo = { id: generateId(), content, completed: false };

  if (content) setState({ todos: [newTodo, ...state.todos] });
};

// remove todo
const removeTodo = ({ target }) => {
  if (!target.classList.contains('destroy')) return;

  const { id } = target.closest('li').dataset;

  setState({ todos: state.todos.filter(todo => todo.id !== +id) });
};

// filter todo
const filterTodo = ({ target }) => {
  if (!target.matches('.filters > li > a')) return;

  getDOM('.selected').classList.remove('selected');
  target.classList.add('selected');

  setState({ filterId: target.id });
};

// toggle todo
const toggleTodo = ({ target }) => {
  if (!target.classList.contains('toggle')) return;

  const { id } = target.closest('li').dataset;

  setState({
    todos: state.todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo)),
  });
};

// toggle all todos
const toggleAllTodos = ({ target }) => {
  if (!target.classList.contains('toggle-all')) return;

  setState({ todos: state.todos.map(todo => ({ ...todo, completed: target.checked })) });
};

// edit todo
const editTodo = ({ target }) => {
  if (!target.closest('li')) return;

  const { id } = target.closest('li').dataset;

  if (state.editingTodos.includes(id)) return

  setState({ editingTodos: [...state.editingTodos, +id] });
};

// renew todo
const renewTodo = ({ target, key }) => {
  if (key !== 'Enter' || !target.classList.contains('edit')) return;

  const { id } = target.closest('li').dataset;

  const newContent = target.value.trim();

  setState({
    todos: state.todos.map(todo => (todo.id === +id && newContent ? { ...todo, content: target.value } : todo)),
    editingTodos: state.editingTodos.filter(_id => _id !== +id),
  });
};

const clearCompletedTodos = () => setState({ todos: state.todos.filter(todo => todo.completed === false) });

window.addEventListener('DOMContentLoaded', getTodos);
$newInput.addEventListener('keyup', addTodo);
$todoList.addEventListener('click', toggleTodo);
$todoList.addEventListener('click', removeTodo);
$filters.addEventListener('click', filterTodo);
$toggleAll.addEventListener('click', toggleAllTodos);
$todoList.addEventListener('dblclick', editTodo);
$todoList.addEventListener('keyup', renewTodo);
$clearBtn.addEventListener('click', clearCompletedTodos);
