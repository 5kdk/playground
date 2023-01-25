import countCompletedTodos from './08.countCompletedTodos';

describe('countCompletedTodos', () => {
  test(`todos 배열에서 완료(completed: true)한 할일의 갯수를 구해 반환한다.`, () => {
    const todos = [
      { id: 3, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'Javascript', completed: false },
    ];

    expect(countCompletedTodos(todos)).toBe(1);
  });
});
