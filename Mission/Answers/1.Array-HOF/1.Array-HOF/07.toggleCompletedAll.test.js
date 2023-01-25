import toggleCompletedAll from './07.toggleCompletedAll';

describe('toggleCompletedAll', () => {
  test(`todos 배열의 모든 요소의 completed 프로퍼티 값을 true로 설정해 todos 배열을 반환한다.`, () => {
    const todos = [
      { id: 3, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'Javascript', completed: false },
    ];

    expect(toggleCompletedAll(todos)).toEqual([
      { id: 3, content: 'HTML', completed: true },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'Javascript', completed: true },
    ]);
  });

  test(`todos 배열을 변경하지 않는다.`, () => {
    const todos = [
      { id: 3, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'Javascript', completed: false },
    ];

    toggleCompletedAll(todos, 2);

    expect(todos).toEqual([
      { id: 3, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'Javascript', completed: false },
    ]);
  });
});
