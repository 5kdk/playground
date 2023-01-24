import getLastDayOfMonth from './05.getLastDayOfMonth';

describe('getLastDayOfMonth', () => {
  test('년도와 월을 나타내는 정수를 인수로 전달받아 해당 년월 말일의 요일을 나타내는 정수(0~6)를 반환한다.', () => {
    // 2022년 4월 말일은 토요일
    expect(getLastDayOfMonth(2022, 3)).toBe(6);

    // 2022년 7월 말일은 일요일
    expect(getLastDayOfMonth(2022, 6)).toBe(0);
  });
});
