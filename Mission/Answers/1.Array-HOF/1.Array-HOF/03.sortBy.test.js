import sortBy from './03.sortBy';

describe('sortBy', () => {
  test('todos 배열과 todos 배열의 요소인 todo 객체의 프로퍼티 키(id, content, completed)를 문자열로 전달하면 해당 프로퍼티 키로 todos 배열의 요소를 정렬해 todos 배열을 반환한다.', () => {
    const todos = [
      { id: 3, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'Javascript', completed: false },
    ];

    expect(sortBy(todos, 'id')).toEqual([
      { id: 1, content: 'Javascript', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 3, content: 'HTML', completed: false },
    ]);

    expect(sortBy(todos, 'id')).not.toBe(todos);

    expect(sortBy(todos, 'content')).toEqual([
      { id: 2, content: 'CSS', completed: true },
      { id: 3, content: 'HTML', completed: false },
      { id: 1, content: 'Javascript', completed: false },
    ]);

    expect(sortBy(todos, 'content')).not.toBe(todos);

    expect(sortBy(todos, 'completed')).toEqual([
      { id: 3, content: 'HTML', completed: false },
      { id: 1, content: 'Javascript', completed: false },
      { id: 2, content: 'CSS', completed: true },
    ]);

    expect(sortBy(todos, 'completed')).not.toBe(todos);
  });
});
