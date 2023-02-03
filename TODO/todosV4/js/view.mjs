export const $root = document.getElementById('root')

const render = state => {
  // eslint-disable-next-line
  console.log('[state]', state);
  const { todos, editingTodos, filterId, isCheckedToggleAll, inputNewTodoValue } = state;
  const filterIds = ['All', 'Active', 'Completed'];

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

export default render