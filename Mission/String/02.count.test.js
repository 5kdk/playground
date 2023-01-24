import count from './02.count';

describe('count', () => {
  test(`한 개의 문자열과 특정 문자를 인수로 전달받아 문자열에 해당 특정 문자가 몇 개 존재하는지 구해 반환한다.`, () => {
    expect(count('COMPUTERPROGRAMMING', 'R')).toBe(3);
  });
});
