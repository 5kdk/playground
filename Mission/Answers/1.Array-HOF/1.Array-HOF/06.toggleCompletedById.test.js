import toggleCompletedById from './06.toggleCompletedById';

describe('toggleCompletedById', () => {
  test(`todos 배열과 todos 배열의 특정 요소의 id를 인수로 전달하면 해당 요소의 completed 프로퍼티 값을 반전한 todos 배열을 반환한다.`, () => {
    const todos = [
      { id: 3, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'Javascript', completed: false },
    ];

    expect(toggleCompletedById(todos, 2)).toEqual([
      { id: 3, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: false },
      { id: 1, content: 'Javascript', completed: false },
    ]);
  });

  test(`todos 배열을 변경하지 않는다.`, () => {
    const todos = [
      { id: 3, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'Javascript', completed: false },
    ];

    toggleCompletedById(todos, 2);

    expect(todos).toEqual([
      { id: 3, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'Javascript', completed: false },
    ]);
  });
});
