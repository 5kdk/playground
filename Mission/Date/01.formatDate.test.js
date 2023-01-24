import formatDate from './01.formatDate';

describe('formatDate', () => {
  test(`Date 객체를 인수로 전달받아 'yyyy-mm-dd' 형식의 문자열로 변환해 반환한다.`, () => {
    expect(formatDate(new Date('2021/07/24'))).toBe('2021-07-24');
    expect(formatDate(new Date('1900/1/4'))).toBe('1900-01-04');
  });
});
