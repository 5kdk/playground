import isEqualDate from './07.isEqualDate';

describe('isEqualDate', () => {
  test(`2개의 Date 객체를 인수로 전달받아 두 날짜의 '년/월/일'이 동일한지 확인한다.`, () => {
    expect(isEqualDate(new Date('2021/07/24'), new Date('2021/07/24'))).toBe(true);
    expect(isEqualDate(new Date('2021/07/24/00:00:00'), new Date('2021/07/24/23:59:59'))).toBe(true);
    expect(isEqualDate(new Date('2021/07/24/23:59:59'), new Date('2021/07/25/00:00:00'))).toBe(false);
    expect(isEqualDate(new Date('2021/07/24'), new Date('2021/07/25'))).toBe(false);
    expect(isEqualDate(new Date('2021/07/24'), new Date('2022/07/2'))).toBe(false);
  });
});
