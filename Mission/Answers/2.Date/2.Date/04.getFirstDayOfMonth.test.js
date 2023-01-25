import getFirstDayOfMonth from './04.getFirstDayOfMonth';

describe('getFirstDayOfMonth', () => {
  test('년도와 월을 나타내는 정수를 인수로 전달받아 해당 년월 1일의 요일을 나타내는 정수(0~6)를 반환한다.', () => {
    // 2022년 1월 1일은 토요일
    expect(getFirstDayOfMonth(2022, 0)).toBe(6);

    // 2022년 5월 1일은 일요일
    expect(getFirstDayOfMonth(2022, 4)).toBe(0);
  });
});
