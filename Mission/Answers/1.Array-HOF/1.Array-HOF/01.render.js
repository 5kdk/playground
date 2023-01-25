// prettier-ignore
const render = todos =>
  todos.map(todo => `
    <li id="${todo.id}">
      <label><input type="checkbox" ${todo.completed ? 'checked' : ''}>${todo.content}</label>
    </li>`
  ).join('');

export default render;
