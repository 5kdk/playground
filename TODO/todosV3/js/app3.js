let state = {
  todos: [],
  editingTodos: [],
  filterId: 'all',
  isCheckedToggleAll: false,
  inputNewTodoValue: '',
};

const $root = document.getElementById('root');
const filterIds = ['All', 'Active', 'Completed'];

const render = () => {
  const { todos, editingTodos, filterId, isCheckedToggleAll, inputNewTodoValue } = state;

  const cntActive = todos.filter(todo => !todo.completed).length;
  const cntCompleted = todos.filter(todo => todo.completed).length;
  const filteredTodos = todos.filter(({ completed }) =>
    filterId === 'completed' ? completed : filterId === 'active' ? !completed : true
  );

  // prettier-ignore
  const inner = `
    <section class="todo-app">
        <header class="header">
          <h1>todos</h1>
          <input class="new-todo" placeholder="What needs to be done?" value="${inputNewTodoValue}" autofocus />
        </header>
        ${todos.length ? `
        <section class="main">
          <input type="checkbox" id="toggle-all" class="toggle-all" ${isCheckedToggleAll ? 'checked' : ''} />
          <label for="toggle-all">Mark all as complete</label>
          <ul class="todo-list">
            ${filteredTodos.map(({id, content, completed}) => `
            <li data-id="${id}" class="${editingTodos.includes(id) ? 'editing' : ''}">
              <div class="view">
                <input type="checkbox" class="toggle" ${completed ? 'checked' : ''} />
                <label>${content}</label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value="${content}" />
            </li>`).join('')}
          </ul>
        </section>
        <footer class="footer">
          <span class="todo-count">${cntActive} item${cntActive > 1 ? 's' : ''} left</span>
          <ul class="filters">
            ${filterIds.map(id => `
            <li>
              <a id="${id.toLowerCase()}" class="${id === filterId ? 'selected' : ''}" href="#">${id}</a>
            </li>`).join('')}
          </ul>
          ${cntCompleted ? `
          <button class="clear-completed">Clear completed</button>` : '' }
        </footer>
      </section>` : ''}
      <footer class="info">
        <p>Double-click to edit a todo</p>
      </footer>`

  $root.innerHTML = inner;
};

// set state
const setState = newState => {
  state = { ...state, ...newState };
  render();
};

// get todos (fetch)
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
// prettier-ignore
const generateId = () => Math.max(...state.todos.map(todo => todo.id), 0) + 1;

// add todo
const addTodo = content => {
  const newTodo = { id: generateId(), content, completed: false };
  setState({ todos: [newTodo, ...state.todos], inputNewTodoValue: '' });
};

// toggle todo
const toggleTodo = id => {
  const todos = state.todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo));
  const [firstTodo] = todos;

  setState({
    todos,
    isCheckedToggleAll: todos.every(({ completed }) => completed === firstTodo.completed)
      ? firstTodo.completed
      : state.isCheckedToggleAll,
  });
};

// remove todo
const removeTodo = id => {
  const todos = state.todos.filter(todo => todo.id !== +id);
  setState({ todos });
};

// filter todos
const filterTodos = id => {
  setState({ filterId: id });
};

// toggle all todos
const toggleAllTodos = () => {
  const isCheckedToggleAll = !state.isCheckedToggleAll;
  setState({
    todos: state.todos.map(todo => ({ ...todo, completed: isCheckedToggleAll })),
    isCheckedToggleAll,
  });
};

// edit todos
const editTodos = id => {
  setState({ editingTodos: [...state.editingTodos, +id] });
};

// update todos
const updateTodos = (content, id) => {
  setState({
    todos: state.todos.map(todo => (todo.id === +id ? { ...todo, content } : todo)),
    editingTodos: state.editingTodos.filter(_id => _id !== +id),
  });
};

// clear all completed todos
const clearCompletedTodos = () => {
  setState({
    todos: state.todos.filter(todo => todo.completed === false),
    editTodos: [],
  });
};

// change input new todo value
const changeInputNewTodoValue = value => {
  setState({ inputNewTodoValue: value });
};

const setFocusTo = $inputField => {
  const { length } = $inputField.value;
  $inputField.focus();
  $inputField.setSelectionRange(length, length);
};

/* --------------- Event Listeners --------------- */

window.addEventListener('DOMContentLoaded', getTodos);

$root.addEventListener('change', e => {
  if (!e.target.matches('.new-todo')) return;

  changeInputNewTodoValue(e.target.value);
  setFocusTo(document.querySelector('.new-todo'));
});

// add todo
$root.addEventListener('keydown', e => {
  if (e.isComposing || e.keyCode === 229) return;
  if (e.key !== 'Enter' || !e.target.matches('.new-todo')) return;

  const content = e.target.value.trim();

  if (content) {
    addTodo(content);
    setFocusTo(document.querySelector('.new-todo'));
  }
});

// toggle todo
$root.addEventListener('change', e => {
  if (!e.target.classList.contains('toggle')) return;

  toggleTodo(e.target.closest('li').dataset.id);
  setFocusTo(document.querySelector('.new-todo'));
});

// remove todo
$root.addEventListener('click', e => {
  if (!e.target.classList.contains('destroy')) return;

  removeTodo(e.target.closest('li').dataset.id);
  setFocusTo(document.querySelector('.new-todo'));
});

// filter todos
$root.addEventListener('click', e => {
  if (!e.target.matches('.filters > li > a')) return;

  filterTodos(e.target.id);
  setFocusTo(document.querySelector('.new-todo'));
});

// toggle all todos
$root.addEventListener('click', e => {
  if (!e.target.classList.contains('toggle-all')) return;

  toggleAllTodos();
  setFocusTo(document.querySelector('.new-todo'));
});

// edit mod
$root.addEventListener('dblclick', e => {
  if (!e.target.matches('.view > label')) return;

  const { id } = e.target.closest('li').dataset;

  editTodos(id);
  setFocusTo(document.querySelector(`.todo-list > li[data-id="${id}"] > .edit`));
});

$root.addEventListener('keydown', e => {
  if (e.isComposing || e.keyCode === 229) return;
  if (e.key !== 'Enter' || !e.target.classList.contains('edit')) return;

  updateTodos(e.target.value, e.target.closest('li').dataset.id);

  if (state.editingTodos.length === 0) {
    setFocusTo(document.querySelector('.new-todo'));
  } else {
    const id = state.editingTodos.at(-1);
    setFocusTo(document.querySelector(`.todo-list > li[data-id="${id}"] > .edit`));
  }
});

$root.addEventListener('click', e => {
  if (!e.target.classList.contains('clear-completed')) return;
  
  clearCompletedTodos();
  setFocusTo(document.querySelector('.new-todo'));
});
