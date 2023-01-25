import replaceAtoSharp from './01.replaceAtoSharp';

describe('replaceAtoSharp', () => {
  test(`영문 대문자로 이루어진 문자열을 인수로 전달받아 문자열에 포함된 'A'를 모두 '#'으로 바꾸어 반환한다.`, () => {
    expect(replaceAtoSharp('BANANA')).toBe('B#N#N#');
  });
});
