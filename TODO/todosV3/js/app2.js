// get root
const $root = document.getElementById('root');

// state
let state = {
  todos: [],
  editingTodos: [],
  iputNewTodoValue: '',
  filterId: 'all',
  isCheckedToggleAll: true,
};

// render
const render = () => {
  console.log('[STATE]', state);

  const { todos, editingTodos, filterId, isCheckedToggleAll } = state;

  const cntActiveTodos = todos.filter(todo => !todo.completed).length;
  const isCompletedTodos = todos.some(todo => todo.completed).length;

  const filteredTodos = todos.filter(({ completed }) =>
    filterId === 'completed' ? completed : filterId === 'active' ? !completed : true
  );

  // prettier-ignore
  const domStr = `
    <section class="todo-app">
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo" placeholder="What needs to be done?" autofocus />
      </header>
      <section class="main" ${todos.length ? '' : 'hidden'}>
        <input type="checkbox" id="toggle-all" class="toggle-all" ${isCheckedToggleAll ? '' : 'checked'} />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
        ${filteredTodos.map(({ id, content, completed }) => `
          <li data-id="${id}" class="${editingTodos.includes(id) ? 'editing' : ''}">
            <div class="view">
              <input type="checkbox" class="toggle" ${completed ? 'checked' : ''}/>
              <label>${content}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="${content}" />
          </li>`).join('')}
        </ul>
      </section>
      <footer class="footer ${todos.length ? '' : 'hidden'}">
        <span class="todo-count">
        ${cntActiveTodos} item${cntActiveTodos > 1 ? 's' : ''} left
        </span>
        <ul class="filters">
        ${['All', 'Active', 'Completed'].map(id => `
          <li>
            <a id="${id.toLowerCase()}" ${filterId === id.toLowerCase() ? 'class="selected"' : ''} href="#">${id}</a>
          </li>`).join('')}
        </ul>
        <button class="clear-completed ${isCompletedTodos ? 'hidden' : ''}">
          Clear completed
        </button>
      </footer>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
    </footer>`;

  $root.innerHTML = domStr;
};

// set state
const setState = newState => {
  state = { ...state, ...newState };
  render();
};

// get todo
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
const generateId = () => Math.max(...state.todos.map(({ id }) => id), 0) + 1;

// add todo
const addTodo = content => {
  const newTodo = { id: generateId(), content, completed: false };
  if (content) setState({ todos: [newTodo, ...state.todos] });
};

// remove todo
const removeTodo = id => setState({ todos: state.todos.filter(todo => todo.id !== +id) });

// toggleTodos
const toggleTodos = id => {
  const todos = state.todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo));
  const [firstTodo] = todos;

  setState({
    todos,
    isChecked: todos.every(({ completed }) => completed === firstTodo.completed)
      ? firstTodo.completed
      : state.isCheckedToggleAll,
  });
};

// toggle all todos
const toggleAllTodos = isChecked =>
  setState({
    todos: state.todos.map(todo => ({ ...todo, completed: isChecked })),
    isCheckedToggleAll: !isChecked,
  });

// filter todos
const changeFilter = id => setState({ filterId: id });

// clear completed todos
const clearCompletedTodos = () =>
  setState({
    todos: state.todos.filter(todo => todo.completed === false),
    editingTodos: [],
  });

// edit todo
const editTodo = id => {
  setState({
    editingTodos: [...state.editingTodos, +id],
  });
};

// updateTodo todo
const updateTodo = (contents, id) => {
  setState({
    todos: state.todos.map(todo => (todo.id === +id && contents ? { ...todo, content: contents } : todo)),
    editingTodos: state.editingTodos.filter(_id => _id !== +id),
  });
};

// focus target Element
const focusTarget = $inputField => {
  const { length } = $inputField.value;
  $inputField.focus();
  $inputField.setSelectionRange(length, length);
};

// DOM load
window.addEventListener('DOMContentLoaded', getTodos);

// add todo
$root.addEventListener('keydown', e => {
  if (!e.target.classList.contains('new-todo')) return;
  if (e.key !== 'Enter') return;

  const content = e.target.value.trim();

  if (content) {
    addTodo(content);
    focusTarget(document.querySelector('.new-todo'));
  }
  e.target.value = '';
});

// remove todo
$root.addEventListener('click', e => {
  if (!e.target.classList.contains('destroy')) return;
  removeTodo(e.target.closest('li').dataset.id);
  focusTarget(document.querySelector('.new-todo'));
});

// toggle todo
$root.addEventListener('click', e => {
  if (!e.target.classList.contains('toggle')) return;
  toggleTodos(e.target.closest('li').dataset.id);
  focusTarget(document.querySelector('.new-todo'));
});

// toggle all todos
$root.addEventListener('change', e => {
  if (!e.target.classList.contains('toggle-all')) return;
  toggleAllTodos(state.isCheckedToggleAll);
  focusTarget(document.querySelector('.new-todo'));
});

// change filter
$root.addEventListener('click', e => {
  if (!e.target.matches('.filters > li > a')) return;
  changeFilter(e.target.id);
  focusTarget(document.querySelector('.new-todo'));
});

// clear completed todos
$root.addEventListener('click', e => {
  if (!e.target.classList.contains('clear-completed')) return;
  clearCompletedTodos();
  focusTarget(document.querySelector('.new-todo'));
});

// edit todo
$root.addEventListener('dblclick', e => {
  if (!e.target.matches('.view > label')) return;
  editTodo(e.target.closest('li').dataset.id);
  focusTarget(document.querySelector('.new-todo'));
});

// update todo
$root.addEventListener('keydown', e => {
  if (e.key !== 'Enter' || !e.target.classList.contains('edit')) return;
  updateTodo(e.target.value, e.target.closest('li').dataset.id);

  if (state.editingTodos.length === 0) {
    focusTarget(document.querySelector('.new-todo'));
  } else {
    const id = state.editingTodos.at(-1);
    focusTarget(document.querySelector(`.todo-list > li[data-id="${id}"] > .edit`));
  }
});
