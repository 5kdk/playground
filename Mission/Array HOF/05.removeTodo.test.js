import removeTodo from './05.removeTodo';

describe('removeTodo', () => {
  test(`todos 배열과 todos 배열에서 삭제할 요소의 id를 인수로 전달하면 해당 요소를 삭제해 todos 배열을 반환한다. `, () => {
    const todos = [
      { id: 3, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'Javascript', completed: false },
    ];

    expect(removeTodo(todos, 2)).toEqual([
      { id: 3, content: 'HTML', completed: false },
      { id: 1, content: 'Javascript', completed: false },
    ]);
  });
});
