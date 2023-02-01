// get root
const $root = document.getElementById('root');

// state
let state = {
  todos: [],
  editingTodos: [],
  filterId: 'all',
  toggleAllDefault: true,
};

// render
const render = () => {
  console.log('[STATE]', state);

  const { todos, editingTodos, filterId, toggleAllDefault } = state;

  const _todos = todos.filter(({ completed }) =>
    filterId === 'completed' ? completed : filterId === 'active' ? !completed : true
  );

  // prettier-ignore
  $root.innerHTML = `
    <section class="todo-app">
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo" placeholder="What needs to be done?" autofocus />
      </header>
      <section class="main">
        <input type="checkbox" id="toggle-all" class="toggle-all ${todos.length ? '' : 'hidden'}" ${toggleAllDefault ? '' : 'checked'} />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
        ${
          _todos.map(({ id, content, completed }) => `
          <li data-id="${id}" class="${editingTodos.includes(id) ? 'editing' : ''}">
            <div class="view">
              <input type="checkbox" class="toggle" ${completed ? 'checked' : ''}/>
              <label ondblclick="editTodo()">${content}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="${content}" />
          </li>`).join('')
        }
        </ul>
      </section>
      <footer class="footer ${todos.length ? '' : 'hidden'}">
        <span class="todo-count">
        ${todos.filter(todo => todo.completed === false).length} item${todos.length > 1 ? 's' : ''} left
        </span>
        <ul class="filters">
        ${
          ['All', 'Active', 'Completed'].map(id => `
          <li>
            <a id="${id.toLowerCase()}" ${filterId === id.toLowerCase() ? 'class="selected"' : ''} href="#">${id}</a>
          </li>`).join('')
        }
        </ul>
        <button class="clear-completed ${todos.some(todo => todo.completed === true) ? '' : 'hidden'}">
          Clear completed
        </button>
      </footer>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
    </footer>`;
};

/* // focus target Element
const focusTargetElement = () => {
  if(state.editingTodos)
};
 */
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
const toggleTodos = id =>
  setState({ todos: state.todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo)) });

// toggle all todos
const toggleAllTodos = checked =>
  setState({
    todos: state.todos.map(todo => ({ ...todo, completed: checked })),
    toggleAllDefault: !checked,
  });

// filter todos
const filterTodos = id => setState({ filterId: id });

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

// renew todo
const renewTodo = (contents, id) => {
  setState({
    todos: state.todos.map(todo => (todo.id === +id && contents ? { ...todo, content: contents } : todo)),
    editingTodos: state.editingTodos.filter(_id => _id !== +id),
  });
};

window.addEventListener('DOMContentLoaded', getTodos);

$root.addEventListener('keydown', e => {
  if (!e.target.classList.contains('new-todo')) return;
  if (e.key !== 'Enter') return;

  const content = e.target.value.trim();
  if (content) addTodo(content);
  e.target.value = '';
});

$root.addEventListener('click', e => {
  if (!e.target.classList.contains('destroy')) return;
  removeTodo(e.target.closest('li').dataset.id);
});

$root.addEventListener('click', e => {
  if (!e.target.classList.contains('toggle')) return;
  toggleTodos(e.target.closest('li').dataset.id);
});

$root.addEventListener('change', e => {
  if (!e.target.classList.contains('toggle-all')) return;
  toggleAllTodos(state.toggleAllDefault);
});

$root.addEventListener('click', e => {
  if (!e.target.matches('.filters > li > a')) return;
  filterTodos(e.target.id);
});

$root.addEventListener('click', e => {
  if (!e.target.classList.contains('clear-completed')) return;
  clearCompletedTodos();
});

$root.addEventListener('dblclick', e => {
  if (!e.target.matches('.view > label')) return;
  editTodo(e.target.closest('li').dataset.id);
});

$root.addEventListener('keydown', e => {
  if (e.key !== 'Enter' || !e.target.classList.contains('edit')) return;
  renewTodo(e.target.value, e.target.closest('li').dataset.id);
});
