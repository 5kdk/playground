import render from './01.render';

describe('render', () => {
  test('todos 배열을 인수로 전달받아 html 문자열을 생성해 반환한다.', () => {
    const todos = [
      { id: 3, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'Javascript', completed: false },
    ];

    const html = render(todos);

    expect(html.replace(/\s/g, '')).toEqual(
      `<li id="3">
        <label><input type="checkbox">HTML</label>
      </li>
      <li id="2">
        <label><input type="checkbox" checked>CSS</label>
      </li>
      <li id="1">
        <label><input type="checkbox">Javascript</label>
      </li>`.replace(/\s/g, '')
    );
  });
});
