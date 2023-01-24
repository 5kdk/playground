import getLastDateOfMonth from './03.getLastDateOfMonth';

describe('getLastDateOfMonth', () => {
  test('년도와 월을 나타내는 정수를 인수로 전달받아 해당 년월의 말일을 반환한다.', () => {
    // 2021년 1월의 마지막 날은 31일
    expect(getLastDateOfMonth(2021, 0)).toBe(31);
    // 2021년 2월의 마지막 날은 28일
    expect(getLastDateOfMonth(2021, 1)).toBe(28);
    // 2021년 12월의 마지막 날은 31일
    expect(getLastDateOfMonth(2021, 11)).toBe(31);
  });
});
