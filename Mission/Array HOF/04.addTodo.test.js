import addTodo from './04.addTodo';

describe('addTodo', () => {
  test(`todos 배열과 새로운 요소를 인수로 전달하면 todos 배열의 선두에 새로운 요소를 추가해 todos 배열을 반환한다.`, () => {
    const todos = [
      { id: 3, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'Javascript', completed: false },
    ];

    expect(addTodo(todos, { id: 4, content: 'Test', completed: false })).toEqual([
      { id: 4, content: 'Test', completed: false },
      { id: 3, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'Javascript', completed: false },
    ]);
  });
});
