import getMaxId from './09.getMaxId';

describe('getMaxId', () => {
  test(`todos 배열의 id 프로퍼티 값 중에서 최대값을 구해 반환한다.`, () => {
    const todos = [
      { id: 3, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'Javascript', completed: false },
    ];

    expect(getMaxId(todos)).toBe(3);
    expect(getMaxId([])).toBe(0);
  });
});
