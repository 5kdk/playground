import toggleCase from './06.toggleCase';

describe('toggleCase', () => {
  test(`대문자와 소문자가 같이 존재하는 문자열을 인수로 전달받아 대문자는 소문자로, 소문자는 대문자로 변환해 반환한다.`, () => {
    expect(toggleCase('StuDY')).toBe('sTUdy');
  });
});
