import diffDays from './06.diffDays';

describe('diffDays', () => {
  test('2개의 Date 객체를 인수로 전달받아 두 날짜 사이의 일수를 구해 반환한다.', () => {
    expect(diffDays(new Date('2022/01/01'), new Date('2022/12/31'))).toBe(364);
  });
});
