import compress from './07.compress';

describe('compress', () => {
  test(`문자열을 인수로 전달받아 같은 문자가 연속으로 반복되는 문자 뒤에 반복 횟수를 표기하는 방법으로 문자열을 압축해 반환한다.`, () => {
    expect(compress('KKHSSSSSSSE')).toBe('K2HS7E');
    expect(compress('ABBCCCE')).toBe('AB2C3E');
  });
});
