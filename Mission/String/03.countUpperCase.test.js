import countUpperCase from './03.countUpperCase';

describe('countUpperCase', () => {
  test(`한 개의 문자열을 인수로 전달받아 해당 문자열에 알파벳 대문자가 몇 개 있는지 구해 반환한다.`, () => {
    expect(countUpperCase('KoreaTimeGood')).toBe(3);
  });
});
