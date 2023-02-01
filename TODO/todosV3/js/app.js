/* 
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Todos v2</title>
    <link rel="stylesheet" href="css/style.css" />
    <script defer src="js/app.js"></script>
  </head>
  <body>
    <section class="todo-app">
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo" placeholder="What needs to be done?" autofocus />
      </header>
      <!-- todo의 갯수가 0이면 hidden 클래스를 추가해 .main 요소를 비표시한다. -->
      <section class="main">
        <!-- 체크박스가 on 상태가 되면 모든 todo를 checked 상태로 변경한다. -->
        <input type="checkbox" id="toggle-all" class="toggle-all" />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <!--
            todo list
            1. todo를 나타내는 li 요소는 HTML에 정적으로 존재하지 않는다. todos 배열을 기반으로 자바스크립트에 의해 동적으로 DOM에 추가되어야 한다.
            2. todo를 나타내는 li 요소를 더블 클릭하면 li 요소에 editing 클래스를 추가해 편집 모드로 변경한다.
            3. 편집 모드가 되면 CSS에 의해 div.view가 비표시되고 input.edit가 표시된다.
          -->
          <!--
          <li data-id="3" class="editing">
            <div class="view">
              <input type="checkbox" class="toggle" />
              <label>JavaScript</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="JavaScript" />
          </li>
          <li data-id="2">
            <div class="view">
              <input type="checkbox" class="toggle" checked />
              <label>CSS</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="CSS" />
          </li>
          <li data-id="1">
            <div class="view">
              <input type="checkbox" class="toggle" />
              <label>HTML</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="HTML" />
          </li> -->
        </ul>
      </section>
      <!-- todo의 갯수가 0이면 .footer 요소를 비표시한다. -->
      <footer class="footer">
        <!-- todo의 갯수가 0 또는 1개면 'n item left' todo의 갯수가 2개 이상이면 'n items left' -->
        <span class="todo-count">0 item left</span>
        <ul class="filters">
          <li>
            <a id="all" class="selected" href="javascript:void(0);">All</a>
          </li>
          <li>
            <a id="active" href="javascript:void(0);">Active</a>
          </li>
          <li>
            <a id="completed" href="javascript:void(0);">Completed</a>
          </li>
        </ul>
        <!-- completed 상태인 todo가 없으면 비표시한다. -->
        <button class="clear-completed">Clear completed</button>
      </footer>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
    </footer>
  </body>
</html>
*/

const $root = document.getElementById('root');

// state
let state = {
  todos: [],
  editingTodos: [],
  filterId: 'all',
};

const render = () => {
  // eslint-disable-next-line no-console
  console.log('[STATE]', state);

  const { todos, editingTodos, filterId } = state;

  const _todos = todos.filter(({ completed }) =>
    filterId === 'completed' ? completed : filterId === 'active' ? !completed : true
  );

  $root.innerHTML = `
    <section class="todo-app">
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo" onkeydown="addTodo()" placeholder="What needs to be done?" autofocus />
      </header>
      <section class="main">
        <input type="checkbox" id="toggle-all" class="toggle-all" onclick="toggleAllTodos()"/>
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          ${_todos
            .map(
              ({ id, content, completed }) => `
              <li data-id="${id}" class="${editingTodos.includes(id) ? 'editing' : ''}">
                <div class="view">
                  <input type="checkbox" class="toggle" onclick="toggleTodo()" ${completed ? 'checked' : ''}/>
                  <label ondblclick="editTodo()">${content}</label>
                  <button class="destroy" onclick="removeTodo()"></button>
                </div>
                <input class="edit" onkeydown ="renewTodo()" value="${content}" />
              </li>`
            )
            .join('')}
        </ul>
      </section>
      <footer class="footer ${todos.length ? '' : 'hidden'}">
        <span class="todo-count">${todos.length} item${todos.length > 1 ? 's' : ''} left</span>
        <ul class="filters">
          <li>
            <a id="all" ${filterId === 'all' ? 'class="selected"' : ''} onclick="filterTodo()" href="#">All</a>
          </li>
          <li>
            <a id="active" ${filterId === 'active' ? 'class="selected"' : ''} href="#">Active</a>
          </li>
          <li>
            <a id="completed" ${filterId === 'completed' ? 'class="selected"' : ''} href="#">Completed</a>
          </li>
        </ul>
        <button class="clear-completed ${
          todos.some(todo => todo.completed === true) ? '' : 'hidden'
        }" onclick="clearCompletedTodos()">Clear completed</button>
      </footer>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
    </footer>`;
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

const generateId = () => Math.max(...state.todos.map(({ id }) => id), 0) + 1;

// add todo
const addTodo = () => {
  const { key, target } = event;
  if (key !== 'Enter') return;

  const content = target.value.trim();
  target.focus();
  target.value = '';

  const newTodo = { id: generateId(), content, completed: false };

  if (content) setState({ todos: [newTodo, ...state.todos] });
  
};

// remove todo
const removeTodo = () => {
  const { id } = event.target.closest('li').dataset;
  setState({ todos: state.todos.filter(todo => todo.id !== +id) });
};

// filter todo
const filterTodo = () => {
  setState({ filterId: event.target.id });
};

// toggle todo
const toggleTodo = () => {
  const { id } = event.target.closest('li').dataset;

  setState({
    todos: state.todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo)),
  });
};

// toggle all todos
const toggleAllTodos = () =>
  setState({ todos: state.todos.map(todo => ({ ...todo, completed: event.target.checked })) });

// edit todo
const editTodo = () => {
  const { id } = event.target.closest('li').dataset;

  if (state.editingTodos.includes(id)) return;

  setState({
    editingTodos: [...state.editingTodos, +id],
  });
};

// renew todo
const renewTodo = () => {
  const { key, target } = event;
  if (key !== 'Enter') return;

  const { id } = target.closest('li').dataset;
  const contents = target.value;

  setState({
    todos: state.todos.map(todo => (todo.id === +id && contents ? { ...todo, content: contents } : todo)),
    editingTodos: state.editingTodos.filter(_id => _id !== +id),
  });
};

// clear completed todos
const clearCompletedTodos = () =>
  setState({
    todos: state.todos.filter(todo => todo.completed === false),
    editingTodos: [],
  });

window.addEventListener('DOMContentLoaded', getTodos);
