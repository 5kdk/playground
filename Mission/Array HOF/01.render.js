const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false },
];

// 가독성 최적화
// prettier-ignore
const render = todos =>
  todos.map(({ id, content, completed }) =>
      `<li id="${id}">
        <label><input type="checkbox" ${completed ? 'checked' : ''}>${content}</label>
      </li>`
    ).join('');

// forEach는 비 순수의 극치, 상위 스코프의 변수 선언을 강제한다
/* const render2 = todos => {
  let html = '';

  todos.forEach(todo => {
    html += `<li id=${todo.id}>
        <label><input type="checkbox" ${todo.completed ? 'checked' : ''}>${todo.content}</label>
      </li>`;
  });

  return html;
}; */

console.log(render(todos));

export default render;
