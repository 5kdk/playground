const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false },
];

/*
const render = todos =>
  todos
    .map(
      todo =>
        `<li id=${todo.id}>
        <label><input type="checkbox" ${todo.completed ? 'checked' : ''}>${todo.content}</label>
      </li>`
    )
    .join('');
*/

// 가독성 최적화
// prettier-ignore
const render = todos =>
  todos.map(({ id, content, completed }) =>
      `<li id=${id}>
        <label><input type="checkbox" ${completed ? 'checked' : ''}>${content}</label>
      </li>`
    ).join('');

// forEach는 비 순수의 극치, 상위 스코프의 변수 선언을 강제한다
const render2 = todos => {
  let html = '';

  todos.forEach(todo => {
    html += `<li id=${todo.id}>
        <label><input type="checkbox" ${todo.completed ? 'checked' : ''}>${todo.content}</label>
      </li>`;
  });

  return html;
};

console.log(render(todos));
console.log(render2(todos));
/*
<li id="3">
  <label><input type="checkbox">HTML</label>
</li>
<li id="2">
  <label><input type="checkbox" checked>CSS</label>
</li>
<li id="1">
  <label><input type="checkbox">Javascript</label>
</li>
*/
