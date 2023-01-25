import getValues from './02.getValues';

describe('getValues', () => {
  test('todos 배열과 todos 배열의 요소인 todo 객체의 프로퍼티 키(id, content, completed)를 문자열로 전달하면 todos 배열의 요소 중에서 해당 프로퍼티 값만을 추출한 todos 배열을 반환한다.', () => {
    const todos = [
      { id: 3, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'Javascript', completed: false },
    ];

    expect(getValues(todos, 'id')).toEqual([3, 2, 1]);
    expect(getValues(todos, 'content')).toEqual(['HTML', 'CSS', 'Javascript']);
    expect(getValues(todos, 'completed')).toEqual([false, true, false]);
  });
});
